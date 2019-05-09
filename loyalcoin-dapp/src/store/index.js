import Vue from 'vue'
import Vuex from 'vuex'
import web3 from './web3Module'
import authentication from './authModule'
import admin from './adminModule'
import retailer from './retailerModule'
import transactions from './transactionsModule'
import basket from './basketModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    web3,
    authentication,
    admin,
    retailer,
    transactions,
    basket
  }
});