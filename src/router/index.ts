import CartPage from '@/components/cart/CartPage.vue'
import ProductPage from '@/components/product/ProductPage.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TheMainView from '@/views/TheMainView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'homepage',
          component: TheMainView,
        },
        {
          path: 'products/:slug',
          name: 'product',
          component: ProductPage,
        },
        {
          path: 'cart',
          name: 'cart',
          component: CartPage,
        },
      ],
    },
  ],
})

export default router
