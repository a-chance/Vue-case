import Vue from 'vue'
import Router from 'vue-router'
import Video from '@/pages/Video'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Video',
      component: Video
    }
  ]
})
