import web3Provider from '../utils/web3Provider';
import {
  web3
} from './types';

const state = {
  web3: null
}

const getters = {
  getWeb3() {
    return state.web3;
  }
}

const mutations = {
  setWeb3(state, newWeb3) {
    state.web3 = newWeb3;
  }
}

const actions = {
  registerWeb3({
    commit
  }) {
    web3Provider.getWeb3().then(result => {
      commit(web3.mutations.SET_WEB3, result)
    }).catch(() => {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}