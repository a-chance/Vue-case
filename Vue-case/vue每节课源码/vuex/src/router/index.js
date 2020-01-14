import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import UserList from '@/components/UserList'
import OldUser from '@/components/OldUser'
import NewUser from '@/components/NewUser'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginlink',
      component: Login
    },
    {
      path:'/admin',
      name:'adminlink',
      component:Admin,
      children:[
        {path:'/userlist',component:UserList},
        {path:'/olduser',component:OldUser},
        {path:'/newuser',component:NewUser}
      ]
    }
  ]
})
