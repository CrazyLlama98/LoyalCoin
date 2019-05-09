import axiosFactory from '../utils/axiosFactory'
import jwtService from './jwtService'

export default class UserService {
  constructor() {
    this.httpClient = axiosFactory(process.env.VUE_APP_BACKEND_API);
  }

  getAll = () => 
    this.httpClient.get('/users', { 
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });

  getById = (userId) => 
    this.httpClient.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });
}