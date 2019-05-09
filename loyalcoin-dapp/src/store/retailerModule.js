import AwardService from '../services/awardService'
import UserService from '../services/userService'
import ProductService from '../services/productService'
import {
  retailer
} from './types'

const awardService = new AwardService();
const userService = new UserService();
const productService = new ProductService();

const state = {
  awards: [],
  users: [],
  products: [],
  selected: null
}

const getters = {
  getAwards() {
    return state.awards;
  },
  getUsers() {
    return state.users;
  },
  getProducts() {
    return state.products;
  },
  getSelectedRetailer() {
    return state.selected;
  }
}

const mutations = {
  setAwards(state, awards) {
    state.awards = awards;
  },
  addAward(state, award) {
    state.awards = [...state.awards, award];
  },
  removeAward(state, awardId) {
    state.awards = state.awards.filter(award => award.id !== awardId);
  },
  setUsers(state, users) {
    state.users = users;
  },
  setProducts(state, products) {
    state.products = products;
  },
  addProduct(state, product) {
    state.products = [...state.products, product];
  },
  deleteProduct(state, productId) {
    state.products = state.products.filter(product => product.id !== productId);
  },
  setSelectedRetailer(state, selectedRetailer) {
    state.selected = selectedRetailer;
  }
}

const actions = {
  fetchRetailerAwards({ commit }, retailerId) {
    return new Promise((resolve, reject) => {
      awardService.getByRetailer(retailerId)
        .then(({ data }) => {
          commit(retailer.mutations.SET_AWARDS, data);
          resolve(data);
        })
        .catch(reject);
    });
  },
  addRetailerAward({ commit }, { retailerId, award }) {
    return new Promise((resolve, reject) => {
      awardService.addAward(retailerId, award)
        .then(({ data }) => {
          commit(retailer.mutations.ADD_AWARD, data);
          resolve(data);
        })
        .catch(reject);
    });
  },
  removeRetailerAward({ commit }, { retailerId, awardId }) {
    return new Promise((resolve, reject) => {
      awardService.removeAward(retailerId, awardId)
        .then(() => {
          commit(retailer.mutations.REMOVE_AWARD, awardId);
          resolve();
        })
        .catch(reject);
    })
  },
  fetchUsers({ commit }) {
    return new Promise((resolve, reject) => {
      userService.getAll()
        .then(({ data }) => {
          commit(retailer.mutations.SET_USERS, data);
          resolve();
        })
        .catch(reject);
    });
  },
  fetchProducts({ commit }, retailerId) {
    return new Promise((resolve, reject) => {
      productService.getByRetailer(retailerId)
        .then(({ data }) => {
          commit(retailer.mutations.SET_PRODUCTS, data);
          resolve(data);
        })
        .catch(reject);
    })
  },
  addNewProduct({ commit }, { retailerId, product }) {
    return new Promise((resolve, reject) => {
      productService.add(retailerId, product)
        .then(({ data }) => {
          commit(retailer.mutations.ADD_PRODUCT, data);
          resolve(data);
        })
        .catch(reject);
    });
  },
  removeProduct({ commit }, { retailerId, productId }) {
    return new Promise((resolve, reject) => {
      productService.delete(retailerId, productId)
        .then(() => {
          commit(retailer.mutations.DELETE_PRODUCT, productId);
          resolve();
        })
        .catch(reject);
    });
  },
  fetchRetailer({ commit }, retailerId) {
    return new Promise((resolve, reject) => {
      userService.getById(retailerId)
        .then(({ data }) => {
          commit(retailer.mutations.SET_SELECTED_RETAILER, data);
          resolve();
        })
        .catch(reject);
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}