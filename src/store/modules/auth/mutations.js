import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from "../../../router";

Vue.use(Vuex)

export default{

  inLogin(state){
    state.loading = true
  },
  setToken(state, token){
    state.token = token
  },
  loggedIn(state){
    state.loading = false,
    state.failed = false,
    state.status = true
 },
 failed(state){
   state.failed = true,
   state.loading = false
 },
 // setUser (state, payload) {
 //        state.name = payload.name
 //        state.usernam = payload.username
 //        // state.privileges = payload.privileges.toString()
 //        localStorage.setItem('name', payload.name)
 //        localStorage.setItem('username', payload.username)
 //        localStorage.setItem('privileges', payload.privileges)
 //    }
 loggedOut (state) {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('name')
        localStorage.removeItem('privileges')
        state.status = false
        state.name = null
        state.username = null
        state.privileges = null
        state.token = null
    }
}
