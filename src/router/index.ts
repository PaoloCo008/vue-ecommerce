import AddressForm from '@/components/profile/ProfileAddressForm.vue'
import CartPage from '@/views/CartPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import ProfileAddress from '@/views/AddressPage.vue'
import ProfileCards from '@/components/profile/ProfileCards.vue'
import ProfileEdit from '@/components/profile/ProfileEditForm.vue'
import ProfileManage from '@/components/profile/ProfileManage.vue'
import ProfileMy from '@/components/profile/ProfileMy.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TheMainView from '@/views/TheMainView.vue'
import TheProfileView from '@/views/TheProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/views/AuthPage.vue'
import ProfileOrders from '@/components/profile/ProfileOrders.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import OrderDetailsPage from '@/views/OrderDetailsPage.vue'
import ProfileEditForm from '@/components/profile/ProfileEditForm.vue'
import ChangeDefaultAddressPage from '@/views/ChangeDefaultAddressPage.vue'
import ProfilePasswordResetForm from '@/components/profile/ProfilePasswordResetForm.vue'

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
        { path: '/login-signup', name: 'login', component: AuthPage, meta: { operation: 'login' } },
        {
          path: '/login-signup',
          name: 'signup',
          component: AuthPage,
          meta: { operation: 'signup' },
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: CheckoutPage,
          meta: { operation: 'create' },
        },
        {
          path: '',
          component: TheProfileView,
          children: [
            {
              path: '/user/profile',
              children: [
                { path: '', name: 'profile', component: ProfileManage },
                { path: 'edit', name: 'editprofile', component: ProfileEditForm },
                { path: 'my', name: 'myprofile', component: ProfileMy },
                {
                  path: 'payment-options',
                  name: 'paymentoptions',
                  component: ProfileCards,
                },
                {
                  path: 'orders',
                  name: 'orders',
                  component: ProfileOrders,
                },
                {
                  path: 'orders/:orderId',
                  name: 'orderdetails',
                  component: OrderDetailsPage,
                },
                {
                  path: 'passwordReset',
                  name: 'passwordReset',
                  component: ProfilePasswordResetForm,
                },
              ],
            },
            {
              path: '/address',
              children: [
                { path: 'book', name: 'address', component: ProfileAddress },
                {
                  path: 'book/edit/:type',
                  name: 'addresstypeedit',
                  component: ChangeDefaultAddressPage,
                },
                {
                  path: 'create',
                  name: 'addresscreate',
                  component: AddressForm,
                  meta: { operation: 'create' },
                },
                {
                  path: 'edit/:id',
                  name: 'addressedit',
                  component: AddressForm,
                  meta: { operation: 'edit' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})

export default router
