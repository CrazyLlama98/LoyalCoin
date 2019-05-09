export const web3 = {
  namespace: "web3",
  mutations: {
    SET_WEB3: "setWeb3"
  },
  actions: {
    REGISTER_WEB3: "registerWeb3"
  },
  getters: {
    GET_WEB3: "getWeb3"
  }
}

export const authentication = {
  namespace: 'authentication',
  getters: {
    GET_CURRENT_USER: 'currentUser',
    IS_LOGGED_IN: 'isAuthenticated',
    GET_TOKEN: 'token',
    GET_ERROR: 'error'
  },
  mutations: {
    SET_USER: 'setUser',
    REMOVE_USER: 'removeUser',
    SET_TOKEN: 'setToken',
    REMOVE_TOKEN: 'removeToken',
    SET_ERROR: 'setError',
    REMOVE_ERROR: 'removeError'
  },
  actions: {
    REGISTER: 'register',
    LOG_IN: 'login',
    LOG_OUT: 'logout',
    FETCH_CURRENT_USER: 'fetchCurrentUser',
    UPDATE_ACCOUNT: 'updateAccount'
  }
}

export const admin = {
  namespace: 'admin',
  getters: {
    GET_RETAILERS: 'getRetailers'
  },
  mutations: {
    SET_RETAILERS: 'setRetailers',
    ADD_RETAILER: 'addRetailer'
  },
  actions: {
    FETCH_ALL_RETAILERS: 'fetchAllRetailers',
    ADD_NEW_RETAILER: 'addNewRetailer'
  }
}

export const retailer = {
  namespace: 'retailer',
  getters: {
    GET_AWARDS: 'getAwards',
    GET_USERS: 'getUsers',
    GET_PRODUCTS: 'getProducts',
    GET_SELECTED_RETAILER: 'getSelectedRetailer'
  },
  mutations: {
    SET_AWARDS: 'setAwards',
    ADD_AWARD: 'addAward',
    REMOVE_AWARD: 'removeAward',
    SET_USERS: 'setUsers',
    SET_PRODUCTS: 'setProducts',
    ADD_PRODUCT: 'addProduct',
    DELETE_PRODUCT: 'deleteProduct',
    SET_SELECTED_RETAILER: 'setSelectedRetailer'
  },
  actions: {
    FECTH_RETAILER_AWARDS: 'fetchRetailerAwards',
    ADD_RETAILER_AWARD: 'addRetailerAward',
    REMOVE_RETAILER_AWARD: 'removeRetailerAward',
    FETCH_USERS: 'fetchUsers',
    FETCH_PRODUCTS: 'fetchProducts',
    ADD_NEW_PRODUCT: 'addNewProduct',
    REMOVE_PRODUCT: 'removeProduct',
    FECTH_RETAILER: 'fetchRetailer'
  }
}

export const transactions = {
  namespace: 'transactions',
  getters: {
    GET_BALANCE: 'getBalance'
  },
  mutations: {
    SET_BALANCE: 'setBalance'
  },
  actions: {
    FETCH_BALANCE: 'fetchBalance',
    SEND_AWARD: 'sendAward',
    TRANSFER_COINS: 'transferAmount'
  }
}

export const basket = {
  namespace: 'basket',
  getters: {
    GET_BASKET: 'getBasket',
    GET_NR_PRODUCTS: 'getNrProducts'
  },
  mutations: {
    ADD_TO_BASKET: 'addToBasket',
    REMOVE_FROM_BASKET: 'removeFromBasket',
    RESET_BASKET_FOR_RETAILER: 'resetBasketRetailer'
  }
}