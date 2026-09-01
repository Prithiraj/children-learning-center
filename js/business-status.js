const DATA_URL = 'assets/data/business.json';

function minutesSinceMidnight(time) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

function getZonedParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date);

  return Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
}

function formatTime(time) {
  const [hourString, minute] = time.split(':');
  const hour = Number(hourString);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const normalized = hour % 12 || 12;
  return `${normalized}:${minute} ${suffix}`;
}

export async function initBusinessStatus() {
  const statusNode = document.querySelector('[data-business-status]');
  const pill = document.querySelector('[data-business-pill]');
  if (!statusNode && !pill) return;

  try {
    const response = await fetch(DATA_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Business data request failed: ${response.status}`);
    const business = await response.json();
    const parts = getZonedParts(new Date(), business.hours.timeZone);
    const key = parts.weekday.toLowerCase();
    const range = business.hours[key];
    const currentMinutes = Number(parts.hour) * 60 + Number(parts.minute);
    const isOpen = Boolean(range) && currentMinutes >= minutesSinceMidnight(range[0]) && currentMinutes < minutesSinceMidnight(range[1]);

    if (statusNode) {
      const parent = statusNode.closest('.status-line');
      if (range) {
        statusNode.textContent = isOpen
          ? `Open now · until ${formatTime(range[1])}`
          : `Closed now · today ${formatTime(range[0])}–${formatTime(range[1])}`;
      } else {
        statusNode.textContent = 'Closed today · Mon–Fri 6:30 AM–6:30 PM';
      }
      parent?.setAttribute('data-state', isOpen ? 'open' : 'closed');
    }

    if (pill) {
      pill.textContent = isOpen ? 'Open now' : 'Closed now';
      pill.setAttribute('data-state', isOpen ? 'open' : 'closed');
    }
  } catch (error) {
    console.warn('Business status fallback in use.', error);
  }
}
