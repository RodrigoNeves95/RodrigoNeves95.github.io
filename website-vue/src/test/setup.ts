import { afterEach, vi } from 'vitest';

window.scrollTo = vi.fn();

afterEach(() => {
  document.body.innerHTML = '';
});
