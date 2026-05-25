<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next';
import { onBeforeUnmount, onMounted, ref } from 'vue';

import { navLinks } from '@/data/site';
import SiteLogo from './SiteLogo.vue';

const isOpen = ref(false);
const isScrolled = ref(false);

const onScroll = () => {
  isScrolled.value = window.scrollY > 24;
};

const close = () => {
  isOpen.value = false;
};

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
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
          class="p-[10px] text-[13px] text-slate-lighter transition hover:text-mint focus:text-mint focus:outline-none"
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
        class="-mr-[15px] inline-flex p-[15px] text-mint transition focus:outline-none md:hidden"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="mobile-navigation"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">Toggle navigation</span>
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
      <div
        v-if="isOpen"
        id="mobile-navigation"
        class="fixed bottom-0 right-0 top-0 z-30 flex h-screen w-[min(75vw,400px)] items-center justify-center bg-navy-light px-[10px] py-[50px] shadow-[-10px_0_30px_-15px_var(--navy-shadow)] md:hidden"
      >
        <div
          class="flex w-full flex-col items-center gap-5 text-center font-mono text-slate-lighter"
        >
          <RouterLink
            v-for="link in navLinks"
            :key="link.url"
            :to="link.url"
            class="block w-full px-5 pb-5 pt-[3px] text-[clamp(14px,4vw,18px)]"
            @click="close"
          >
            {{ link.name }}
          </RouterLink>
          <a
            href="/resume.pdf"
            class="button-link mt-[10%] w-max px-[50px] py-[18px]"
            target="_blank"
            rel="noopener noreferrer"
            @click="close"
          >
            Resume
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
