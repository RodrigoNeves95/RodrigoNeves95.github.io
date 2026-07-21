<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { navLinks } from '@/data/site';
import SiteLogo from './SiteLogo.vue';

const route = useRoute();
const isOpen = ref(false);
const isScrolled = ref(false);
const menuButton = ref<HTMLButtonElement>();
const panel = ref<HTMLElement>();
const backgroundElements: HTMLElement[] = [];
let previousBodyOverflow = '';

const onScroll = () => {
  isScrolled.value = window.scrollY > 24;
};

const focusableElements = () =>
  Array.from(
    panel.value?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) ?? [],
  );

const onPanelKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    close();
    return;
  }

  if (event.key !== 'Tab') return;
  const focusable = focusableElements();
  if (focusable.length === 0) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
};

const setBackgroundInert = (inert: boolean) => {
  if (inert) {
    backgroundElements.push(
      ...Array.from(document.querySelectorAll<HTMLElement>('#content, footer, aside')),
    );
  }

  for (const element of backgroundElements) {
    element.inert = inert;
  }

  if (!inert) backgroundElements.splice(0);
};

const close = (restoreFocus = true) => {
  if (!isOpen.value) return;
  isOpen.value = false;
  if (restoreFocus) nextTick(() => menuButton.value?.focus());
};

const open = () => {
  isOpen.value = true;
};

watch(isOpen, async (openState) => {
  if (openState) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setBackgroundInert(true);
    await nextTick();
    focusableElements()[0]?.focus();
  } else {
    document.body.style.overflow = previousBodyOverflow;
    setBackgroundInert(false);
  }
});

watch(
  () => route.fullPath,
  () => close(),
);

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  document.body.style.overflow = previousBodyOverflow;
  setBackgroundInert(false);
});
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 bg-navy transition"
    :class="isScrolled ? 'shadow-nav' : ''"
  >
    <nav
      class="flex h-[100px] w-full items-center justify-between px-[50px] font-mono text-slate-lighter max-[1080px]:px-10 max-md:px-[25px]"
      aria-label="Primary navigation"
    >
      <SiteLogo />

      <div class="hidden items-center gap-6 md:flex">
        <RouterLink
          v-for="link in navLinks"
          :key="link.url"
          :to="link.url"
          class="p-[10px] text-[13px] text-slate-lighter transition hover:text-mint focus:text-mint"
        >
          <span class="mr-[5px] text-[12px] text-mint">•</span>{{ link.name }}
        </RouterLink>
        <a
          href="/resume.pdf"
          class="small-button-link ml-[15px]"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
      </div>

      <button
        ref="menuButton"
        class="-mr-[15px] inline-flex p-[15px] text-mint transition md:hidden"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="mobile-navigation"
        :aria-label="isOpen ? 'Close navigation' : 'Open navigation'"
        @click="isOpen ? close() : open()"
      >
        <X v-if="isOpen" :size="30" aria-hidden="true" />
        <Menu v-else :size="30" aria-hidden="true" />
      </button>
    </nav>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <button
        v-if="isOpen"
        class="fixed inset-0 z-20 cursor-default bg-navy/70 md:hidden"
        type="button"
        aria-label="Close navigation"
        @click="close()"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="translate-x-full opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="isOpen"
        id="mobile-navigation"
        ref="panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        class="fixed bottom-0 right-0 top-0 z-30 flex h-screen w-[min(75vw,400px)] items-center justify-center bg-navy-light px-[10px] py-[50px] shadow-[-10px_0_30px_-15px_var(--navy-shadow)] md:hidden"
        @keydown="onPanelKeydown"
      >
        <div
          class="flex w-full flex-col items-center gap-5 text-center font-mono text-slate-lighter"
        >
          <RouterLink
            v-for="link in navLinks"
            :key="link.url"
            :to="link.url"
            class="block w-full px-5 pb-5 pt-[3px] text-[clamp(14px,4vw,18px)]"
            @click="close()"
          >
            {{ link.name }}
          </RouterLink>
          <a
            href="/resume.pdf"
            class="button-link mt-[10%] w-max px-[50px] py-[18px]"
            target="_blank"
            rel="noopener noreferrer"
            @click="close()"
          >
            Resume
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
