<template>
  <SimpleNav />
  <main id="content" class="page-shell">
    <slot />
  </main>
</template>

<script setup lang="ts">
import SimpleNav from '@/components/SimpleNav.vue';
</script>
