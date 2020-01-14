import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

//注册vuex
Vue.use(Vuex)

const state = {
   loginUser: JSON.parse(localStorage.getItem('loginUser')) || {},
   userList: []
}

const getters = {
   oldUsers:state=>state.userList.filter(user=>user.age>=30),
   newUsers:state=>state.userList.filter(user=>user.age<30),
}

//同步处理state中的数据
const mutations = {
   saveuser(state, userInfo) {
      //更改state数据
      state.loginUser = userInfo;
      //把数据存储在本地
      localStorage.setItem('loginUser', JSON.stringify(userInfo))
   },
   getUsers(state, users) {
      state.userList = users
   }
}

//异步处理state中的数据
const actions = {
   getUsers({ commit }) {
      return new Promise((resolve, reject) => {
         axios.get('/api/userlist').then(res => {
            commit('getUsers', res.data);
            resolve()
         })
      })
   }
}

export default new Vuex.Store({
   state,
   getters,
   mutations,
   actions,
})
