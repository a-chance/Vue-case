import Vue from 'vue'
import Router from 'vue-router'

import SingleFilm from '@/components/SingleFilm'
import HomeContent from '@/components/HomeContent'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:HomeContent},
    {path:'/film/:id',name:'filmlink',component:SingleFilm}
  ]
})
