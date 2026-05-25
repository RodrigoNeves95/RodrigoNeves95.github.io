<script setup lang="ts">
import { email } from '@/data/site';
</script>

<template>
  <aside
    class="fixed bottom-0 right-10 z-20 hidden w-10 flex-col items-center text-slate-light max-[1080px]:right-5 md:flex"
  >
    <a
      :href="`mailto:${email}`"
      class="mx-auto my-5 p-[10px] font-mono text-[12px] tracking-[0.1em] transition [writing-mode:vertical-rl] hover:-translate-y-[3px] hover:text-mint focus:-translate-y-[3px] focus:text-mint focus:outline-none"
    >
      {{ email }}
    </a>
    <span class="h-[90px] w-px bg-slate-light" aria-hidden="true" />
  </aside>
</template>
