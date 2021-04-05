import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeLayout from '../components/layout/HomeLayout.vue'
import Home from '../views/home/Index.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound')
  }
]

const router = new VueRouter({
  routes,
})

export default router
