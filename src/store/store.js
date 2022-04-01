import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules,

    strict: false,
})
export const namespaced = true
export default store