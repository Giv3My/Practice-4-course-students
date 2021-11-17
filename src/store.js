import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            paths: ['theme', 'user']
        })
    ],
    state: {
        count: 0,
        theme: '',
        user: null,
    },

    mutations: {
        setCount: (state, count) => state.count = count,

        setTheme: (state, theme) => state.theme = theme,

        setUser: (state, user) => state.user = user,
    },

    getters: {
        getCount: (state) => {
            return state.count
        },

        getTheme: (state) => {
            return state.theme
        },

        getUser: (state) => {
            return state.user
        },
    }
})

export default store;