import CartPage from '@/components/cart/CartPage.vue'
import ProductPage from '@/components/product/ProductPage.vue'
import ProfileAddress from '@/components/profile/ProfileAddress.vue'
import ProfileEdit from '@/components/profile/ProfileEdit.vue'
import ProfileManage from '@/components/profile/ProfileManage.vue'
import ProfileMy from '@/components/profile/ProfileMy.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TheMainView from '@/views/TheMainView.vue'
import TheProfileView from '@/views/TheProfileView.vue'
import { id } from 'element-plus/es/locales.mjs'
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
          path: '/products/:slug',
          name: 'product',
          component: ProductPage,
        },
        {
          path: '/cart',
          name: 'cart',
          component: CartPage,
        },
        {
          path: '',
          component: TheProfileView,
          children: [
            {
              path: '/user',
              redirect: { name: 'profile', params: { id: 1 } },
              children: [
                {
                  path: 'profile',
                  redirect: { name: 'profile', params: { id: 1 } },
                  children: [
                    { path: ':id', name: 'profile', component: ProfileManage },
                    { path: ':id/edit', name: 'editprofile', component: ProfileEdit },
                    { path: ':id/my', name: 'myprofile', component: ProfileMy },
                  ],
                },
              ],
            },
            {
              path: '/address',
              redirect: { name: 'address', query: { id: 1 } },
              children: [{ path: ':id/book', name: 'address', component: ProfileAddress }],
            },
          ],
        },
      ],
    },
  ],
})

export default router
