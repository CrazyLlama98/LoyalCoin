import axiosFactory from '../utils/axiosFactory'
import jwtService from './jwtService'

export default class ProductService {
  constructor() {
    this.httpClient = axiosFactory(process.env.VUE_APP_BACKEND_API);
  }

  getByRetailer = (retailerId) =>
    this.httpClient.get(`/retailers/${retailerId}/products`, {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });
    
  add = (retailerId, product) =>
    this.httpClient.post(`/retailers/${retailerId}/products`, product, {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });

  delete = (retailerId, productId) =>
    this.httpClient.delete(`retailers/${retailerId}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });
}