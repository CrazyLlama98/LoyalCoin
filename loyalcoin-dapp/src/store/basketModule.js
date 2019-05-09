const state = {
  basket: {},
  totalProducts: 0
};

const getters = {
  getBasket() {
    return state.basket;
  },
  getNrProducts() {
    return state.totalProducts;
  }
};

const mutations = {
  addToBasket(state, product) {
    var retailerId = product.retailerId;
    if (state.basket[retailerId] && state.basket[retailerId].length) {
      state.basket[retailerId] = [...state.basket[retailerId], product];
    } else {
      state.basket[retailerId] = [product];
    }
    ++state.totalProducts;
  },
  removeFromBasket(state, {
    retailerId,
    productIndex
  }) {
    if (state.basket[retailerId]) {
      state.basket = {
        ...state.basket,
        [retailerId]: state.basket[retailerId].filter((_, index) => index !== productIndex)
      };
      --state.totalProducts;
      if (!state.basket[retailerId].length) {
        delete state.basket[retailerId];
      }
    }
  },
  resetBasketRetailer(state, retailerId) {
    if (state.basket[retailerId]) {
      state.basket = {
        ...state.basket,
        [retailerId]: undefined
      }
      delete state.basket[retailerId];
      state.totalProducts = 0;
    }
  }
};

const actions = {

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}