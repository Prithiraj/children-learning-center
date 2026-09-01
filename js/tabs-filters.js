export function initGalleryFilters() {
  const filterBar = document.querySelector('[data-gallery-filters]');
  const gallery = document.querySelector('[data-gallery]');
  if (!filterBar || !gallery) return;

  const buttons = [...filterBar.querySelectorAll('[data-filter]')];
  const items = [...gallery.querySelectorAll('[data-category]')];

  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;

    const filter = button.dataset.filter;
    buttons.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle('is-active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });

    items.forEach((item) => {
      item.hidden = filter !== 'all' && item.dataset.category !== filter;
    });
  });
}
