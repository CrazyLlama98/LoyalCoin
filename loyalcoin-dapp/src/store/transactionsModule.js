import { transactions } from './types';
import TransactionService from '../services/transactionService';

const transactionService = new TransactionService();

const state = {
  balance: 0
};

const getters = {
  getBalance() {
    return state.balance;
  }
};

const mutations = {
  setBalance(state, balance) {
    state.balance = balance;
  }
};

const actions = {
  fetchBalance({ commit }, publicKey) {
    return new Promise((resolve, reject) => {
      transactionService.getBalance(publicKey)
        .then(balance => {
          commit(transactions.mutations.SET_BALANCE, balance);
          resolve(balance);
        })
        .catch(reject);
    });
  },
  sendAward(_, { userKey, retailerKey, amount, awardId }) {
    return new Promise((resolve, reject) => {
      var date = Date.now();
      transactionService.sendAward(userKey, retailerKey, amount, awardId, date)
        .then(() => {
          resolve();
        })
        .catch(reject);
    });
  },
  transferAmount(_, { toKey, fromKey, amount }) {
    return new Promise((resolve, reject) => {
      transactionService.transfer(fromKey, toKey, amount)
        .then(resolve)
        .catch(reject);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}