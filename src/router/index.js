import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
//又传不上去了
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'name',
      component: () => import(/* webpackChunkName: "index" */'@/components/page/home.vue')
    },
    {
      path:'/checkListPage',
      name:'checkListPage',
      component: () => import(/* webapckChunkName: 'checkListPage'*/'@/components/page/checkListPage.vue')
    },
    {
      path:'/cloudListPage',
      name:'cloudListPage',
      component: ()=> import(/* webpackChunkName: 'cloudListPage' */'@/components/page/cloudListPage.vue')
    },
    {
      path:'/clinic',
      name:'clinic',
      component: ()=> import(/* webpackChunkName: 'clinic' */'@/components/page/clinic.vue')
    },
    {
      path:'/personal',
      name:'/personal',
      component: ()=> import(/* webpackChunkName: '/personal' */'@/components/page/personal.vue')
    }
  ]
})
