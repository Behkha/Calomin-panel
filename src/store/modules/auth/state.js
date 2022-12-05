import Vue from 'vue'
import Vuex from 'vuex'
import router from "../../../router";

Vue.use(Vuex)

export default {
    status: localStorage.hasOwnProperty('token'), // true : logged in , false : failed , 'activation' : not activated
    // status: false,
    loading: false,
    failed: false,
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    privileges: localStorage.getItem('privileges'),
    token: localStorage.getItem('token')
}
