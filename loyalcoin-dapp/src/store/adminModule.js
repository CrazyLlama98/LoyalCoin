import RetailerService from '../services/retailerService'
import {
  admin
} from './types'

const retailerService = new RetailerService();

const state = {
  retailers: []
};

const getters = {
  getRetailers() {
    return state.retailers;
  }
};

const mutations = {
  setRetailers(state, retailers) {
    state.retailers = retailers;
  },
  addRetailer(state, retailer) {
    state.retailers = [...state.retailers, retailer];
  }
};

const actions = {
  fetchAllRetailers(context) {
    return new Promise((resolve, reject) => {
      retailerService.getRetailers()
        .then(({
          data
        }) => {
          context.commit(admin.mutations.SET_RETAILERS, data);
          resolve(data);
        })
        .catch(reject);
    });
  },
  addNewRetailer(context, newRetailer) {
    return new Promise((resolve, reject) => {
      retailerService.addRetailer(newRetailer)
        .then(({
          data
        }) => {
          context.commit(admin.mutations.ADD_RETAILER, data);
          resolve(data);
        })
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