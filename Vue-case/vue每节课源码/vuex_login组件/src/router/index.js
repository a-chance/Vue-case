import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ()=>import('@/components/Login.vue')
    },
    {
      path:'/admin',
      component:()=>import('@/components/Admin.vue'),
      children:[
        {
          path:'/',
          component:()=>import('@/components/Home.vue'),
        },
        {
          path:'/userlist',
          component:()=>import('@/components/UserList.vue'),
        },
        {
          path:'/olduser',
          component:()=>import('@/components/OldUser.vue'),
        },
        {
          path:'/newuser',
          component:()=>import('@/components/NewUser.vue'),
        }
      ]
    },
  ]
})
