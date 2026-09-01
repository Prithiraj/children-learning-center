#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urlparse

from bs4 import BeautifulSoup
import tinycss2

ROOT = Path(__file__).resolve().parents[1]
errors: list[str] = []
notes: list[str] = []


def check(condition: bool, message: str) -> None:
    if not condition:
        errors.append(message)


def validate_html(path: Path) -> None:
    text = path.read_text(encoding='utf-8')
    soup = BeautifulSoup(text, 'html.parser')
    check(bool(soup.find('html')), f'{path.name}: missing html element')
    check(bool(soup.find('head')), f'{path.name}: missing head element')
    check(bool(soup.find('body')), f'{path.name}: missing body element')
    check(bool(soup.find('main')), f'{path.name}: missing main landmark')
    check(bool(soup.find('title')), f'{path.name}: missing title')
    check(bool(soup.find('meta', attrs={'name': 'description'})), f'{path.name}: missing meta description')

    ids = [node.get('id') for node in soup.find_all(attrs={'id': True})]
    duplicates = sorted({item for item in ids if ids.count(item) > 1})
    check(not duplicates, f'{path.name}: duplicate IDs: {duplicates}')

    id_set = set(ids)
    for anchor in soup.find_all('a', href=True):
        href = anchor['href']
        if href.startswith('#') and len(href) > 1:
            check(href[1:] in id_set, f'{path.name}: broken internal anchor {href}')

    for image in soup.find_all('img'):
        check(image.has_attr('alt'), f'{path.name}: image missing alt: {image.get("src")}')

    for button in soup.find_all('button'):
        check(bool(button.get_text(strip=True) or button.get('aria-label') or button.find(class_='sr-only')), f'{path.name}: button missing accessible name')

    for field in soup.find_all(['input', 'textarea', 'select']):
        field_id = field.get('id')
        wrapped = field.find_parent('label') is not None
        labelled = bool(field_id and soup.find('label', attrs={'for': field_id}))
        check(wrapped or labelled or field.get('aria-label'), f'{path.name}: form field missing label: {field.get("name")}')

    if path.name == 'index.html':
        check(len(soup.find_all('h1')) == 1, 'index.html: expected exactly one h1')
        check(bool(soup.find('script', attrs={'type': 'application/ld+json'})), 'index.html: missing JSON-LD')
        check(bool(soup.find('meta', attrs={'property': 'og:title'})), 'index.html: missing Open Graph title')
        check(bool(soup.find(attrs={'data-business-status': True})), 'index.html: missing business-status fallback node')


def validate_css(path: Path) -> None:
    rules = tinycss2.parse_stylesheet(path.read_text(encoding='utf-8'), skip_comments=False, skip_whitespace=False)
    parse_errors = [rule for rule in rules if rule.type == 'error']
    check(not parse_errors, f'{path.name}: CSS parse errors: {[e.message for e in parse_errors]}')
    text = path.read_text(encoding='utf-8')
    check(':root' in text and '--forest:' in text, f'{path.name}: reusable CSS tokens missing')
    check('@media (prefers-reduced-motion: reduce)' in text, f'{path.name}: reduced-motion rule missing')
    check(':focus-visible' in text, f'{path.name}: focus-visible styling missing')


def validate_assets() -> None:
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    for tag in soup.find_all(['img', 'script', 'link']):
        attr = 'src' if tag.name in {'img', 'script'} else 'href'
        value = tag.get(attr)
        if not value or value.startswith(('http:', 'https:', 'mailto:', 'tel:', '#', '/')):
            continue
        path = ROOT / value
        check(path.exists(), f'index.html: missing local asset {value}')


def validate_business_data() -> None:
    data = json.loads((ROOT / 'assets/data/business.json').read_text(encoding='utf-8'))
    check(data['license']['number'] == 'CCC127523', 'business.json: license changed')
    check(data['address']['street'] == '316 Claremont Avenue', 'business.json: address changed')
    check(data['phoneDisplay'] == '973-462-9118', 'business.json: phone changed')
    check(data['licensedAges'] == '2½–6 years', 'business.json: licensed age range changed')
    check(data['licensedCapacity'] == 19, 'business.json: capacity changed')


def validate_demo_rights() -> None:
    check((ROOT / 'docs/RIGHTS.md').exists(), 'rights notes missing')
    check((ROOT / 'assets/demo/README.md').exists(), 'demo imagery provenance missing')
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    check('data-demo-asset' in html, 'demo imagery is not clearly marked in markup')


for html_path in [ROOT / 'index.html', ROOT / 'privacy.html']:
    validate_html(html_path)
validate_css(ROOT / 'css/site.css')
validate_assets()
validate_business_data()
validate_demo_rights()

if errors:
    print('VALIDATION FAILED')
    for error in errors:
        print(f'- {error}')
    raise SystemExit(1)

print('VALIDATION PASSED')
print('- HTML structure: pass')
print('- Internal anchors: pass')
print('- Duplicate IDs: pass')
print('- Form/image accessibility basics: pass')
print('- CSS parsing: pass')
print('- CSS tokens/focus/reduced-motion rules: pass')
print('- Local assets and image fallbacks: pass')
print('- Verified business facts guard: pass')
print('- Demo imagery provenance markers: pass')
