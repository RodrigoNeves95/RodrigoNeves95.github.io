import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import { afterEach, describe, expect, it } from 'vitest';

import SiteNav from './SiteNav.vue';

const mountNav = async () => {
  document.body.innerHTML =
    '<main id="content"><button>Background</button></main><footer></footer>';
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/snake', component: { template: '<div />' } },
    ],
  });
  await router.push('/');
  await router.isReady();
  const wrapper = mount(SiteNav, {
    attachTo: document.body,
    global: { plugins: [router] },
  });
  return { router, wrapper };
};

afterEach(() => {
  document.body.style.overflow = '';
});

describe('SiteNav mobile dialog', () => {
  it('makes the background inert and restores focus after Escape', async () => {
    const { wrapper } = await mountNav();
    const trigger = wrapper.get('button[aria-controls="mobile-navigation"]');
    await trigger.trigger('click');
    await flushPromises();

    expect(wrapper.get('[role="dialog"]').attributes('aria-modal')).toBe('true');
    expect(document.querySelector<HTMLElement>('#content')?.inert).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.activeElement?.textContent).toContain('About');

    await wrapper.get('[role="dialog"]').trigger('keydown', { key: 'Escape' });
    await flushPromises();

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
    expect(document.querySelector<HTMLElement>('#content')?.inert).toBe(false);
    expect(document.body.style.overflow).toBe('');
    expect(document.activeElement).toBe(trigger.element);
  });

  it('wraps focus in both directions', async () => {
    const { wrapper } = await mountNav();
    await wrapper.get('button[aria-controls="mobile-navigation"]').trigger('click');
    await flushPromises();

    const dialog = wrapper.get('[role="dialog"]');
    const links = dialog.findAll('a');
    links[links.length - 1]?.element.focus();
    await dialog.trigger('keydown', { key: 'Tab' });
    expect(document.activeElement).toBe(links[0].element);

    links[0].element.focus();
    await dialog.trigger('keydown', { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(links[links.length - 1]?.element);
  });

  it('closes on backdrop activation and route navigation', async () => {
    const { router, wrapper } = await mountNav();
    const trigger = wrapper.get('button[aria-controls="mobile-navigation"]');
    await trigger.trigger('click');
    await wrapper.get('button[aria-label="Close navigation"]').trigger('click');
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);

    await trigger.trigger('click');
    await router.push('/snake');
    await flushPromises();
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });
});
