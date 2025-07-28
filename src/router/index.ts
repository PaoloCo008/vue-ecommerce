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
import CheckoutPage from '@/components/payment/CheckoutPage.vue'
import OrderDetailsPage from '@/views/OrderDetailsPage.vue'
import ProfileEditForm from '@/components/profile/ProfileEditForm.vue'
import ChangeDefaultAddressPage from '@/views/ChangeDefaultAddressPage.vue'
import ProfilePasswordResetForm from '@/components/profile/ProfilePasswordResetForm.vue'
import UserVerification from '@/views/UserVerification.vue'
import ProfileEmailOrPhoneChangeForm from '@/components/profile/ProfileEmailOrPhoneChangeForm.vue'
import AuthVerificationMethods from '@/components/auth/AuthVerificationMethods.vue'
import AuthVerificationForm from '@/components/auth/AuthVerificationForm.vue'
import { useAuthStore } from '@/stores/AuthStore'

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
          meta: { requiresAuth: true },
        },
        {
          path: '/login-signup',
          name: 'login',
          component: AuthPage,
          meta: { operation: 'login' },
        },
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
          meta: { operation: 'create', requiresAuth: true },
        },
        {
          path: '/user',
          meta: { requiresAuth: true }, // This will protect all nested routes
          children: [
            {
              path: '/verification',
              component: UserVerification,
              children: [
                {
                  path: '',
                  name: 'verification-methods',
                  component: AuthVerificationMethods,
                },
                {
                  path: '',
                  name: 'verification-form',
                  component: AuthVerificationForm,
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
                    { path: 'edit', name: 'edit-profile', component: ProfileEditForm },
                    { path: 'my', name: 'my-profile', component: ProfileMy },
                    {
                      path: 'payment-options',
                      name: 'payment-options',
                      component: ProfileCards,
                    },
                    {
                      path: 'orders',
                      name: 'orders',
                      component: ProfileOrders,
                    },
                    {
                      path: 'orders/:orderId',
                      name: 'order-details',
                      component: OrderDetailsPage,
                    },
                    {
                      path: 'password-reset',
                      name: 'password-reset',
                      component: ProfilePasswordResetForm,
                    },
                    {
                      path: 'password-reset',
                      name: 'password-reset-from-otp',
                      component: ProfilePasswordResetForm,
                    },
                    {
                      path: ':method/change',
                      name: 'change',
                      component: ProfileEmailOrPhoneChangeForm,
                    },
                  ],
                },
                {
                  path: '/address',
                  children: [
                    { path: 'book', name: 'address', component: ProfileAddress },
                    {
                      path: 'book/edit/:type',
                      name: 'address-type-edit',
                      component: ChangeDefaultAddressPage,
                    },
                    {
                      path: 'create',
                      name: 'address-create',
                      component: AddressForm,
                      meta: { operation: 'create' },
                    },
                    {
                      path: 'edit/:id',
                      name: 'address-edit',
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (to.name === 'password-reset-from-otp') {
    next()
  }

  if (requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    })
  } else {
    next()
  }
})

export default router
