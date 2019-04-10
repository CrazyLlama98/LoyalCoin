import Vue from 'vue'
import Vuex from 'vuex'
import web3 from './web3Module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    web3
  }
});