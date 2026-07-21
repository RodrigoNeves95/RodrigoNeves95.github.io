<template>
  <a
    href="#content"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-navy-light focus:px-4 focus:py-3 focus:font-mono focus:text-sm focus:text-mint"
  >
    Skip to content
  </a>
  <SimpleNav />
  <main id="content" tabindex="-1" class="page-shell">
    <slot />
  </main>
</template>

<script setup lang="ts">
import SimpleNav from '@/components/SimpleNav.vue';
</script>
