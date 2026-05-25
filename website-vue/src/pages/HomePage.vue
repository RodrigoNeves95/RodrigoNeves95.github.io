<template>
  <DefaultLayout>
    <HeroSection />
    <AboutSection />
    <JobsSection />
    <ContactSection />
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AboutSection from '@/views/AboutSection.vue';
import ContactSection from '@/views/ContactSection.vue';
import HeroSection from '@/views/HeroSection.vue';
import JobsSection from '@/views/JobsSection.vue';
</script>
