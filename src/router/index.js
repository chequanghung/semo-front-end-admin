import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/fruit',
    component: () => import('../views/fruit/FruitDashboard'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/product',
    component: () => import('../views/product/ProductDashboard'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/product/:id',
    name: 'ProductReview',
    props: true,
    component: () => import('../views/product/review/ProductReview'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/auction',
    component: () => import('../views/auction/AuctionDashboard'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/auction/:id',
    name: 'AuctionView',
    props: true,
    component: () => import('../views/auction/view/AuctionView'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/affair',
    component: () => import('../views/affair/AffairDashboard'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/affair/:id',
    name: 'AffairView',
    props: true,
    component: () => import('../views/affair/view/AffairView'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/contract/:id',
    name: 'ContractView',
    props: true,
    component: () => import('@/views/affair/view/AffairContractView'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/deposit',
    component: () => import('../views/deposit/DepositDashboard'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/user',
    component: () => import('../views/user/UserDashboard'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/identity',
    component: () => import('../views/identity/IdentityDashboard'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminDashboard'),
    meta: {
      requiresAuth: true
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('admin_token') === null) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
