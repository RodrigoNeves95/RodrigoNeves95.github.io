<script setup lang="ts">
import SiteLogo from './SiteLogo.vue';
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 bg-navy transition">
    <nav
      class="flex h-[100px] w-full items-center justify-between px-[50px] font-mono text-slate-lighter max-[1080px]:px-10 max-md:px-[25px]"
      aria-label="Page navigation"
    >
      <SiteLogo />
      <RouterLink to="/" class="small-button-link ml-[15px] text-[13px]">Go Home</RouterLink>
    </nav>
  </header>
</template>
