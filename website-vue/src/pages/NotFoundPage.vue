<template>
  <DefaultLayout>
    <section
      class="container-section flex min-h-screen flex-col items-center justify-center text-center"
    >
      <h1 class="font-mono text-8xl font-semibold text-mint sm:text-9xl">404</h1>
      <p class="mt-4 text-3xl text-slate-lighter">Page Not Found</p>
      <RouterLink to="/" class="button-link mt-10">Go Home</RouterLink>
    </section>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>
