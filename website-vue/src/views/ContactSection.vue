<script setup lang="ts">
import { email } from '@/data/site';
</script>

<template>
  <section
    id="contact"
    class="container-section mb-[100px] max-w-[600px] scroll-mt-28 text-center max-md:mb-[50px]"
  >
    <h2
      class="section-heading mb-5 justify-center font-mono text-[16px] font-normal text-mint after:hidden"
    >
      What's Next?
    </h2>
    <h2 class="text-[clamp(40px,5vw,60px)] font-semibold text-slate-lighter">Get In Touch</h2>
    <p class="mx-auto mt-5 max-w-xl">
      My inbox is always open. Whether you have a question or just want to say hi, I'll try my best
      to get back to you.
    </p>
    <a :href="`mailto:${email}`" class="button-link mt-10">Say Hello</a>
  </section>
</template>
