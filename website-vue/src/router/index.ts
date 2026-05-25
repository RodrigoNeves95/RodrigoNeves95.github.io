import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/snake',
      name: 'snake',
      component: () => import('@/pages/SnakePage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 96,
      };
    }

    return { top: 0 };
  },
});

router.afterEach((to) => {
  const title =
    to.name === 'not-found'
      ? 'Page Not Found | Rodrigo Neves'
      : to.name === 'snake'
        ? 'Snake | Rodrigo Neves'
        : 'Rodrigo Neves | Product Engineer & ML Engineer';
  document.title = title;
});

export default router;
