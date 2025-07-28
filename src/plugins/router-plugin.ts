import type { PiniaPluginContext } from 'pinia'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $router: Router
    $route: RouteLocationNormalizedLoaded
  }
}

export function routerPlugin(context: PiniaPluginContext) {
  const { app } = context

  const router = app.config.globalProperties.$router as Router
  const route = app.config.globalProperties.$route as RouteLocationNormalizedLoaded

  context.store.$router = router
  context.store.$route = route
}
