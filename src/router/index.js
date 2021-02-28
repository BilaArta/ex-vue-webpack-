import Vue from 'vue'
import VueRouter from 'vue-router'
import { postUsers } from "@Plugins/api.js";


Vue.use(VueRouter)
const routes = [
  {
    path: `/`,
    component: () => import('@/Container/Container'),
    children: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login')
        },
        {
          path: '/sign-in',
          name: 'Signin',
          component: () => import('@/Register')
        },
        {
          path: '/:id',
          name: 'Home',
          component: () => import('../views/Home'),
          beforeEnter: (to, from, next) => {
              postUsers.getOneUser(to.params.id).then(
                result => {
                  console.log(result);
                  if (!result) {
                    next(false)
                  }
                  next()
                }
              ).catch(() => next(false));
          }
        },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router