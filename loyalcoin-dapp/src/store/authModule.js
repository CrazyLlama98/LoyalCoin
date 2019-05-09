import AuthService from '../services/authService'
import jwtService from '../services/jwtService'
import { authentication } from './types'

var authService = new AuthService();

const state = {
  token: jwtService.getToken(),
  user: {},
  error: null
}

const getters = {
  currentUser() {
    return state.user;
  },
  isAuthenticated() {
    return !!state.token;
  },
  token() {
    return state.token;
  },
  error() {
    return state.error;
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    jwtService.saveToken(token);
    state.token = token;
  },
  setError(state, error) {
    state.error = error
  },
  removeUser(state) {
    state.user = {}
  },
  removeToken(state) {
    jwtService.removeToken();
    state.token = null;
  },
  removeError(state) {
    state.error = null;
  }
};

const actions = {
  login(context, credentials) {
    return new Promise((resolve, reject) => {
      authService.login(credentials.username, credentials.password)
        .then(({ data }) => {
          context.commit(authentication.mutations.SET_TOKEN, data.token);
          resolve(data);
        })
        .catch(err => {
          context.commit(authentication.mutations.SET_ERROR, err.response.data.error);
          reject(err.respose);
        });
    });
  },
  register(context, userDetails) {
    return new Promise((resolve, reject) => {
      authService.register(userDetails)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(err => {
          context.commit(authentication.mutations.SET_ERROR, err.response.data.error);
          reject(err.response);
        });
    });
  },
  fetchCurrentUser(context) {
    return new Promise((resolve, reject) => {
      authService.getCurrentUser()
        .then(({ data }) => {
          context.commit(authentication.mutations.SET_USER, data);
          resolve(data);
        })
        .catch(err => {
          context.commit(authentication.mutations.REMOVE_TOKEN);
          context.commit(authentication.mutations.REMOVE_USER);
          reject(err);
        });
    })
  },
  logout(context) {
    context.commit(authentication.mutations.REMOVE_TOKEN);
    context.commit(authentication.mutations.REMOVE_USER);
    context.commit(authentication.mutations.REMOVE_ERROR);
  },
  updateAccount(context, { userId, accountDetails }) {
    var updatedUser = {
      ...context.getters.currentUser,
      ...accountDetails
    };

    return new Promise((resolve, reject) => {
      authService.updateAccount(userId, updatedUser)
        .then(() => {
          context.commit(authentication.mutations.SET_USER, updatedUser);
          resolve();
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