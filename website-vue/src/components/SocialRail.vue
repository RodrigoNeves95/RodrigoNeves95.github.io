<script setup lang="ts">
import { socialLinks } from '@/data/site';
</script>

<template>
  <aside
    class="fixed bottom-0 left-10 z-20 hidden w-10 flex-col items-center text-slate-light max-[1080px]:left-5 md:flex"
    aria-label="Social links"
  >
    <a
      v-for="link in socialLinks"
      :key="link.url"
      :href="link.url"
      :aria-label="link.name"
      target="_blank"
      rel="noopener noreferrer"
      class="p-[10px] transition hover:-translate-y-[3px] hover:text-mint focus:-translate-y-[3px] focus:text-mint focus:outline-none"
    >
      <component :is="link.icon" :size="20" aria-hidden="true" />
    </a>
    <span class="mt-5 h-[90px] w-px bg-slate-light" aria-hidden="true" />
  </aside>
</template>
