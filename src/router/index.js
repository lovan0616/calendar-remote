import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CalendarMonth',
    component: () => import('../views/CalendarMonth.vue')
  },
  {
    path: '/calendarday/:date',
    name: 'calendar-day',
    component:() => import('../views/CalendarDay.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
