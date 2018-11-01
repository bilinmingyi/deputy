import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({

  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'name',
      component: () => import(/* webpackChunkName: "index" */'@/components/page/home.vue'),

    },
    {
      path: '/checkListPage',
      component: () => import(/* webpackChunkName: 'checkListPage'*/'@/components/page/checkorder/checkListPage.vue'),
      children: [
        {
          path: '',
          name: 'checkListPage',
          component: () => import(/* webpackChunkName: 'checkListPage' */'@/components/page/checkorder/checkList.vue')
        },
        {
          path: 'clinicCheckOrderPage/:clinicId',
          name: 'clinicCheckOrderPage',
          component: () => import(/* webpackChunkName: 'checkListPage' */ '@/components/page/checkorder/clinicCheckOrderPage.vue'),
          props: true
        },
        {
          path: 'clinicCheckOrderPage/confirmedOrderDetail/:orderSeqno',
          name: 'confirmedOrderDetail',
          component: () => import(/* webpackChunkName: 'confirmedOrderDetail' */'@/components/page/checkorder/confirmedOrderDetail.vue'),
          props: true
        },
        {
          path:'clinicCheckOrderPage/newOrderPage',
          name:'newOrderPage',
          component: () => import(/* webpackChunkName: 'newOrderPage' */'@/components/page/checkorder/newOrderPage.vue'),
        },
        {
          path:'clinicCheckOrderPage/newOrderPage/addNewProject',
          name:'addNewProject',
          component: () => import(/* webpackChunkName: 'newOrderPage' */'@/components/page/checkorder/addNewProject.vue'),
        },
        {
          path:'clinicCheckOrderPage/newOrderPage/editBarCode',
          name:'editBarCode',
          component: () => import(/* webpackChunkName: 'newOrderPage' */'@/components/page/checkorder/editBarCode.vue'),
        }
      ]
    },
    {
      path: '/cloudListPage',
      component: () => import(/* webpackChunkName: 'cloudListPage' */'@/components/page/cloudorder/cloudListPage.vue'),
      children: [
        {
          path: '',
          name:'cloudListPage',
          component: () => import(/* webpackChunkName:'cloudListPage' */'@/components/page/cloudorder/cloudList.vue')
        },
        {
          path:'clinicCloudOrderPage/:clinicId',
          name:'clinicCloudOrderPage',
          component: ()=> import(/* webpackChunkName: 'cloudListPage' */'@/components/page/cloudorder/clinicCloudOrderPage.vue'),
          props:true
        },
        {
          path:'clinicCloudOrderPage/waitPayPage/:orderSeqno',
          name:'waitPayPage',
          component: () => import(/* webpackChunkName: 'waitPayPage' */'@/components/page/cloudorder/waitPayPage.vue')
        }
      ]
    },
    {
      path: '/clinic',
      component: () => import(/* webpackChunkName: 'clinic' */'@/components/page/clinic/clinic.vue'),
      children:[
        {
          path: '',
          name:'clinic',
          component: () => import(/* webpackChunkName: 'clinic' */'@/components/page/clinic/clinicList.vue')
        },
        {
          path:'/clinicDetail/:clinicId',
          name:'clinicDetail',
          component: () => import(/* webpackChunkName: 'clinicDetail' */'@/components/page/clinic/clinicDetail.vue')
        }
      ]
    },
    {
      path: '/personal',
      name: '/personal',
      component: () => import(/* webpackChunkName: '/personal' */'@/components/page/personal.vue')
    },
    {
      path: '/test',
      name: '/test',
      component: () => import(/* webpackChunkName: '/personal' */'@/components/common/moduleTest.vue')
    }
  ]
})
