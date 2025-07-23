import AddressForm from '@/components/profile/ProfileAddressForm.vue'
import CartPage from '@/views/CartPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import ProfileAddress from '@/views/AddressPage.vue'
import ProfileCards from '@/components/profile/ProfileCards.vue'
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
import UserVerification from '@/views/UserVerification.vue'
import VerificationForm from '@/components/VerificationForm.vue'
import VerificationMethods from '@/components/VerificationMethods.vue'

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
          path: '/checkout/:pendingOrderId',
          name: 'checkout',
          component: CheckoutPage,
          meta: { operation: 'create' },
        },
        {
          path: '/user',
          children: [
            {
              path: '/verification',
              component: UserVerification,
              children: [
                {
                  path: '',
                  name: 'user-verification',
                  component: VerificationMethods,
                },
                {
                  path: '',
                  name: 'phone-verification',
                  component: VerificationForm,
                  meta: { formFor: 'phone' },
                },
                {
                  path: '',
                  name: 'email-verification',
                  component: VerificationForm,
                  meta: { formFor: 'email' },
                },
              ],
            },
            {
              path: '',
              component: TheProfileView,
              children: [
                {
                  path: 'profile',
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
                      path: 'password-reset',
                      name: 'password-reset',
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
    },
  ],
})

export default router
