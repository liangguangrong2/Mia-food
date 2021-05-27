import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: Main,
    children: [{
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },

      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),

      },
      {
        path: '/shopbag',
        name: 'Shopbag',
        component: () => import('../views/Shopbag.vue'),

      },
      {
        path: '/mall',
        name: 'Mall',
        component: () => import('../views/Mall.vue'),
        // // 独享路由守卫
        beforeEnter: (to, from, next) => {
          // let login = store.state.login || window.localStorage.getItem("login");
          let loginlist = store.state.loginlist;
          // 判断登录情况
          if (!loginlist) {
            next("/loginlist");
            return;
          } else {
            next();
          }

        }
      },
      {

        path: '/moon',
        name: 'Moon',
        component: () => import('../views/Moon.vue')
      },


    ]

  },
  {
    path: '/hot',
    name: 'Hot',
    component: () => import('../components/Hot.vue'),
  },
  {
    path: '/cookstep',
    name: 'Cookstep',
    component: () => import('../components/Cookstep.vue'),
  },
  {
    path: '/faatur',
    name: 'Faatur',
    component: () => import('../components/Faatur.vue'),
  },
  {
    path: '/menulist',
    name: 'Menulist',
    component: () => import('../components/Menulist.vue'),
  },
  {
    path: '/searchmen',
    name: 'Searchmen',
    component: () => import('../components/Searchmen.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/homelist',
    name: 'Hoemlist',
    component: () => import('../components/Homelist.vue'),
  },
  // {
  //   path: '/loginlist',
  //   name: 'Loginlist',
  //   component: () => import('../components/Loginlist.vue'),

  // },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import('../components/Sign.vue'),
  },
  {
    path: '/itemlist',
    name: 'Itemlist',
    component: () => import('../components/Itemlist.vue'),
  },
  {
    path: '/ partic',
    name: 'Partic',
    component: () => import('../components/Partic.vue'),
  },
  {
    path: '/ shopping',
    name: 'Shopping',
    component: () => import('../components/Shopping.vue'),
  },
  {
    path: '/loginlist',
    name: 'Loginlist',
    component: () => import('../components/Loginlist.vue'),
  },

  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../components/Payment.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../components/Cart.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../components/Order.vue'),
  },
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  },


]

const router = new VueRouter({
  // base: process.env.BASE_URL,
  routes

})
router.beforeEach((to, from, next) => {

  let loginlist = store.state.loginlist || window.localStorage.getItem("loginlist");
  // 登录界面验证

  // 判断登录情况
  if (to.path == "/loginlist") {
    next();
    return;
  } else {
    if (!loginlist) {
      next("/loginlist")
      return;
    } else {
      next()
      return
    }


  }

})


export default router