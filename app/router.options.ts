import type { RouterOptions } from '@nuxt/schema';

export default <RouterOptions>{
  routes: (_routes) => [
    {
      path: '/',
      component: () => import('~/pages/index.vue'),
    },
    {
      path: '/danh-muc/:id',
      component: () => import('~/pages/tin-tuc.vue'),
    },
    {
      path: '/tin-tuc',
      component: () => import('~/pages/tin-tuc.vue'),
    },
    {
      path: '/tim-kiem/:id',
      component: () => import('~/pages/tin-tuc.vue'),
    },
    {
      path: '/tien-dien-tu',
      component: () => import('~/pages/tien-dien-tu.vue'),
    },
    {
      path: '/gia-vang',
      component: () => import('~/pages/gia-vang.vue'), 
    },
    {
      path: '/chung-khoan',
      component: () => import('~/pages/chung-khoan.vue'),
    },
    {
      path: '/ngoai-te',
      component: () => import('~/pages/ngoai-te.vue'),
    },
    {
      path: '/:id',
      component: () => import('~/pages/detail.vue'),
    },
    {
      path: '/p2p',
      component: () => import('~/pages/p2p.vue'),
    },
  ],
};