import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import SnakeGame from './SnakeGame.vue';

describe('SnakeGame', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('waits for an explicit start and accepts touch controls', async () => {
    const wrapper = mount(SnakeGame, { attachTo: document.body });

    expect(wrapper.get('button').text()).toBe('Start Game');
    expect(wrapper.get('button[aria-label="Move up"]').attributes('disabled')).toBeDefined();

    await wrapper.get('button').trigger('click');
    await wrapper.get('button[aria-label="Move up"]').trigger('click');
    await vi.advanceTimersByTimeAsync(70);

    expect(wrapper.get('[role="img"]').attributes('aria-label')).toContain('Score 0');
    expect(wrapper.get('button[aria-label="Move up"]').attributes('disabled')).toBeUndefined();
  });

  it('starts with Space and removes its timer when unmounted', async () => {
    const clearInterval = vi.spyOn(window, 'clearInterval');
    const wrapper = mount(SnakeGame);

    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    await vi.advanceTimersByTimeAsync(70);
    wrapper.unmount();

    expect(clearInterval).toHaveBeenCalled();
  });

  it('survives unavailable local storage', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage blocked');
    });

    expect(() => mount(SnakeGame)).not.toThrow();
    getItem.mockRestore();
  });
});
