import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default{
  login({commit, dispatch, getters}, credentials) {
        return new Promise(resolve => {
            commit('inLogin')
            dispatch('loginRequest', credentials)
                .then(response => {
                    commit('setToken', response.data.data.token)
                    commit('loggedIn')
                        .then(() => {
                            resolve()
                        })
                }).catch(error => {
                commit('failed')
                // commit('failed')
                // dispatch('handleError', {method: 'login', response: error.response})
                resolve()
            })
        })
    },
    logout({commit, dispatch, getters}) {
        if (!getters.isLoggedIn) {
            return
        }
        // dispatch('logoutRequest')
            // .then((response) => {
                commit('loggedOut')
                // router.push({name: 'Login'})
            // })
            // .catch(error => {
                // commit('loggedOut')
                // dispatch('handleError', error)
            // })
    }
}
