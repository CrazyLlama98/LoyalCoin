import axiosFactory from '../utils/axiosFactory'
import jwtService from './jwtService';

export default class RetailerService {
  constructor() {
    this.httpClient = axiosFactory(process.env.VUE_APP_BACKEND_API);
  }

  getRetailers = () =>
    this.httpClient.get('/users/retailers', {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });

  addRetailer = (newRetailer) =>
    this.httpClient.post('/users/retailers', newRetailer, {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });
}