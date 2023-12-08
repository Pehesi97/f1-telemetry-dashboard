import { createRouter, createWebHistory } from 'vue-router'
// import LiveTelemetryView from '../views/LiveTelemetryView.vue'
// import ViewTelemetryView from '../views/ViewTelemetryView.vue'
import RaceTelemetryView from '../views/RaceTelemetryView.vue'
import SessionDataView from '../views/SessionDataView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/live',
    //   name: 'live',
    //   component: LiveTelemetryView
    // },
    // {
    //   path: '/view',
    //   name: 'view',
    //   component: ViewTelemetryView
    // },
    {
      path: '/race',
      name: 'race',
      component: RaceTelemetryView
    },
    {
      path: '/session',
      name: 'session',
      component: SessionDataView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
