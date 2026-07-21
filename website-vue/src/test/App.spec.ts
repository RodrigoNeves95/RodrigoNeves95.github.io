import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import App from '@/App.vue';
import router from '@/router';

describe('App', () => {
  it('mounts the home route and exposes the resume', async () => {
    await router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      attachTo: document.body,
      global: { plugins: [router] },
    });
    await flushPromises();

    expect(wrapper.find('main#content').exists()).toBe(true);
    expect(wrapper.get('a[href="/resume.pdf"]').text()).toContain('Resume');
  });
});
