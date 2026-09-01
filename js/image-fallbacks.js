export function initImageFallbacks() {
  document.querySelectorAll('img[data-fallback]').forEach((image) => {
    image.addEventListener('error', () => {
      const fallback = image.dataset.fallback;
      if (!fallback || image.dataset.fallbackApplied === 'true') return;
      image.dataset.fallbackApplied = 'true';
      image.src = fallback;
      image.alt = 'Image unavailable. Owner-approved photography is required before production launch.';
    });
  });
}
