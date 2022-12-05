import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from "../../../router"

Vue.use(Vuex)

export default {
    isLoggedIn: (state) => {
        return state.status
    },
        isPending: (state) => {
        return state.pending
    },
        getToken: state => {
        return state.token
    },
        getName: state => {
        return state.name
    },
        getUserName: state => {
        return state.username
    },
        getUserPrivileges: state => {
        if (state.privileges) {
            return state.privileges.split(',')
        } else {
            return null
        }
    },
        isFailed: state => {
        return state.failed
    }
}
