<script setup lang="ts">
import { socialLinks } from '@/data/site';
</script>

<template>
  <footer class="flex min-h-[70px] flex-col items-center justify-center p-[15px] text-center">
    <ul
      class="mx-auto mb-[10px] hidden w-full max-w-[270px] justify-between text-slate-light max-md:flex"
    >
      <li v-for="link in socialLinks" :key="link.url">
        <a
          :href="link.url"
          :aria-label="link.name"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex p-[10px] transition hover:text-mint"
        >
          <component :is="link.icon" :size="20" aria-hidden="true" />
        </a>
      </li>
    </ul>
    <p class="font-mono text-[12px] leading-none text-slate-light">
      Designed and built by Rodrigo Neves.
    </p>
  </footer>
</template>
