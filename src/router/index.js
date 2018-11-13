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
          path: 'clinicCheckOrderPage/confirmedOrderDetail/:orderSeqno/addNewProject',
          name: 'confirmedOrderAddNewProject',
          component: () => import(/* webpackChunkName: 'confirmedOrderDetail' */'@/components/page/checkorder/confirmedOrderDetailPaging/addNewProject.vue'),
          props: true
        },
        {
          path: 'clinicCheckOrderPage/confirmedOrderDetail/:orderSeqno/editBarCode',
          name: 'confirmedOrderEditBarCode',
          component: () => import(/* webpackChunkName: 'confirmedOrderDetail' */'@/components/page/checkorder/confirmedOrderDetailPaging/editBarCode.vue'),
          props: true
        },
        {
          path:'newOrderPage',
          name:'newOrderPage',
          component: () => import(/* webpackChunkName: 'newOrderPage' */'@/components/page/checkorder/newOrderPage.vue'),
        },
        {
          path:'newOrderPage/addNewProject',
          name:'addNewProject',
          component: () => import(/* webpackChunkName: 'newOrderPage' */'@/components/page/checkorder/newOrderPaging/addNewProject.vue'),
        },
        {
          path:'newOrderPage/editBarCode',
          name:'editBarCode',
          component: () => import(/* webpackChunkName: 'newOrderPage' */'@/components/page/checkorder/newOrderPaging/editBarCode.vue'),
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
          component: () => import(/* webpackChunkName: 'waitPayPage' */'@/components/page/cloudorder/waitPayPage.vue'),
          props:true
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
          path:'clinicDetail/:clinicId',
          name:'clinicDetail',
          component: () => import(/* webpackChunkName: 'clinicDetail' */'@/components/page/clinic/clinicDetail.vue'),
          props:true
        }
      ]
    },
    {
      path: '/personal',
      component: () => import(/* webpackChunkName: 'personal' */'@/components/page/person/person.vue'),
      children:[
        {
          path: '',
          name: 'personal',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/person/personal.vue')
        },
        {
          path: 'changeInfor',
          name: 'changeInfor',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/person/changeInfor.vue')
        },
        {
          path:'changePhone',
          name:'changePhone',
          component: ()=> import(/* webpackChunkName: 'personal' */'@/components/page/person/changePhone.vue')
        },
        {
          path:'myAchievement',
          name:'myAchievement',
          component: ()=> import(/* webpackChunkName: 'myAchievement' */'@/components/page/person/myAchievement.vue')
        },
        {
          path:'myTeam',
          name:'myTeam',
          component: ()=> import(/* webpackChunkName: 'myTeam' */'@/components/page/person/myTeam.vue')
        },
        {
          path:'teamAchievement',
          name:'teamAchievement',
          component: ()=> import(/* webpackChunkName: 'teamAchievement' */'@/components/page/person/teamAchievement.vue')
        }
      ]
    },
    {
      path: '/test',
      name: '/test',
      component: () => import(/* webpackChunkName: '/personal' */'@/components/common/moduleTest.vue')
    }
  ]
})
