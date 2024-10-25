import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CategoryView from '../views/CategoryView.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:id',
    name: 'CategoryView',
    component: CategoryView,
    props: true,
    beforeEnter: async (to, from, next) => {
      try {
        // Verify the category exists before navigating
        const response = await fetch(`http://localhost:9000/api/categories`)
        const categories = await response.json()
        const categoryExists = categories.some(cat => cat.id === to.params.id)
        
        if (categoryExists) {
          next()
        } else {
          next({ name: 'NotFound' })
        }
      } catch (error) {
        console.error('Error checking category:', error)
        next({ name: 'NotFound' })
      }
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',  // Changed from process.env.BASE_URL
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// Global navigation guard
// router.beforeEach((to, from, next) => {
//   // Add any global checks here if needed
//   next()
// })

export default router