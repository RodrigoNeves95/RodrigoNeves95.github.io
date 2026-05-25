<script setup lang="ts">
import { email } from '@/data/site';
</script>

<template>
  <section class="container-section flex min-h-screen flex-col items-start justify-center py-0">
    <h1
      class="mb-[30px] ml-1 font-mono text-[clamp(14px,5vw,16px)] font-normal text-mint max-sm:mb-5 max-sm:ml-0.5"
    >
      Hello fellow stranger, welcome
    </h1>
    <h2 class="big-heading">I love building.</h2>
    <h3 class="big-heading mt-[10px] leading-[0.9] text-slate">Staff Product Engineer.</h3>
    <div class="mt-5 max-w-[800px]">
      <p>
        I like taking ideas from messy first principles to useful, reliable products. My background
        spans startups, full-stack product engineering, machine learning, and data systems. Based in
        Lisbon, Portugal.
      </p>
      <p>
        <i>"Only a few know how much one must know to know how little one knows"</i>
        - Werner Heisenberg
      </p>
    </div>
    <a :href="`mailto:${email}`" class="button-link mt-[50px]">Get In Touch</a>
  </section>
</template>
