import Vue from 'vue'
import Router from 'vue-router'
import jwtService from './services/jwtService'
import store from './store'
import { authentication } from './store/types'

Vue.use(Router)

var router = new Router({
  routes: [{
      path: '/',
      name: 'layout',
      component: () => import('@/views/Layout'),
      meta: {
        requiresAuth: true
      },
      redirect: 'home',
      children: [{
        name: 'home',
        path: '/home',
        component: () => import('@/components/HelloWorld.vue')
      }, {
        name: 'retailers',
        path: '/retailers',
        component: () => import('@/views/Retailers.vue'),
        meta: {
          roles: [ 'Admin' ]
        }
      }, {
        name: 'awards',
        path: '/awards',
        component: () => import('@/views/Awards.vue'),
        meta: {
          roles: [ 'Retailer' ]
        }
      }, {
        name: 'products',
        path: '/products',
        component: () => import('@/views/Products.vue'),
        meta: {
          roles: [ 'Retailer' ]
        }
      }, {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@/views/CustomerDashboard.vue'),
        meta: {
          roles: [ 'Customer' ]
        }
      }, {
        name: 'retailerStore',
        path: '/retailers/:retailerId/store',
        props: true,
        component: () => import('@/views/RetailerStore.vue'),
        meta: {
          roles: [ 'Customer' ]
        }
      }, {
        name: 'shopping-trips',
        path: '/shopping-trips',
        props: true,
        component: () => import('@/views/Basket.vue'),
        meta: {
          roles: [ 'Customer' ]
        }
      }]
    },
    {
      name: 'auth',
      path: '/auth',
      meta: {
        guest: true
      },
      component: () => import('@/views/Authenticate'),
      children: [{
        name: 'login',
        path: 'login',
        component: () => import('@/views/Login'),
      }, {
        name: 'register',
        path: 'register',
        component: () => import('@/views/Register'),
      }]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(routeRecord => routeRecord.meta.requiresAuth)) {
    if (jwtService.getToken()) {
      if (to.meta.roles) {
        getCurrentUser()
          .then((user) => {
            if (user.roles && user.roles.some(userRole => to.meta.roles.includes(userRole))) {
              next();
            } else {
              next('/');
            }
          })
          .catch(() => {
            next({
              path: '/auth/login',
              query: {
                nextUrl: to.fullPath
              }
            });
          });
      }
      return next();
    } else {
      next({
        path: '/auth/login',
        query: {
          nextUrl: to.fullPath
        }
      });
    }
  } else if (to.matched.some(routeRecord => routeRecord.meta.guest)) {
    if (jwtService.getToken()) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

function getCurrentUser() {
  return store.dispatch(`${authentication.namespace}/${authentication.actions.FETCH_CURRENT_USER}`);
}

export default router;