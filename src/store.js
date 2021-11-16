import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            paths: ['theme']
        })
    ],
    state: {
        count: 0,
        theme: ''
    },
    mutations: {
        setCount: (state, count) => state.count = count,

        setTheme: (state, theme) => state.theme = theme,
    },
    getters: {
        getCount: (state) => {
            return state.count
        },

        getTheme: (state) => {
            return state.theme
        }
    }
})

export default store;