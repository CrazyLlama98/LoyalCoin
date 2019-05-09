import axiosFactory from '../utils/axiosFactory'
import jwtService from './jwtService'

export default class AuthService {
  constructor() {
    this.httpClient = axiosFactory(process.env.VUE_APP_BACKEND_API);
  }

  login = (username, password) =>
    this.httpClient.post('/users/login', {
      username,
      password
    });

  register = (newUser) =>
    this.httpClient.post('/users/register', newUser);

  getCurrentUser = () =>
    this.httpClient.get('/users/authenticated/current', {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });

  updateAccount = (userId, data) =>
    this.httpClient.patch(`/users/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });
}