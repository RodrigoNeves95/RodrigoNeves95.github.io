<template>
  <a
    href="#content"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-navy-light focus:px-4 focus:py-3 focus:font-mono focus:text-sm focus:text-mint"
  >
    Skip to content
  </a>
  <SiteNav />
  <SocialRail />
  <EmailRail />
  <main id="content" class="page-shell">
    <slot />
  </main>
  <SiteFooter />
</template>

<script setup lang="ts">
import EmailRail from '@/components/EmailRail.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import SiteNav from '@/components/SiteNav.vue';
import SocialRail from '@/components/SocialRail.vue';
</script>
