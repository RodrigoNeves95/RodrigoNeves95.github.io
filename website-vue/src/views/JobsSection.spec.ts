import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { jobs } from '@/data/site';
import JobsSection from './JobsSection.vue';

describe('JobsSection tabs', () => {
  it('uses valid tab-list children and matching ownership', () => {
    const wrapper = mount(JobsSection, { attachTo: document.body });
    const tabList = wrapper.get('[role="tablist"]');
    expect(Array.from(tabList.element.children).every((child) => child.tagName === 'LI')).toBe(
      true,
    );

    const tabs = wrapper.findAll('[role="tab"]');
    expect(tabs).toHaveLength(jobs.length);
    for (const [index, tab] of tabs.entries()) {
      expect(tab.attributes('id')).toBe(`job-tab-${index}`);
      expect(tab.attributes('aria-controls')).toBe(`job-panel-${index}`);
      expect(tab.attributes('tabindex')).toBe(index === 0 ? '0' : '-1');
    }
    expect(wrapper.get('[role="tabpanel"]').attributes('aria-labelledby')).toBe('job-tab-0');
  });

  it('supports Arrow, Home, and End keys with roving focus', async () => {
    const wrapper = mount(JobsSection, { attachTo: document.body });
    const tabList = wrapper.get('[role="tablist"]');

    await tabList.trigger('keydown', { key: 'End' });
    let tabs = wrapper.findAll('[role="tab"]');
    expect(tabs[jobs.length - 1].attributes('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(tabs[jobs.length - 1].element);

    await tabList.trigger('keydown', { key: 'ArrowRight' });
    tabs = wrapper.findAll('[role="tab"]');
    expect(tabs[0].attributes('aria-selected')).toBe('true');

    await tabList.trigger('keydown', { key: 'Home' });
    expect(wrapper.findAll('[role="tab"]')[0].attributes('tabindex')).toBe('0');
  });
});
