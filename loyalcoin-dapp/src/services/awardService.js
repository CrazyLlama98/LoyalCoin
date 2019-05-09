import axiosFactory from '../utils/axiosFactory'
import jwtService from './jwtService';

export default class AwardService {
  constructor() {
    this.httpClient = axiosFactory(process.env.VUE_APP_BACKEND_API);
  }

  getByRetailer = (retailerId) =>
    this.httpClient.get(`/retailers/${retailerId}/awards`, {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });

  addAward = (retailerId, newAward) =>
    this.httpClient.post(`/retailers/${retailerId}/awards`, newAward, {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });

  removeAward = (retailerId, awardId) =>
    this.httpClient.delete(`/retailers/${retailerId}/awards/${awardId}`, {
      headers: {
        Authorization: `Bearer ${jwtService.getToken()}`
      }
    });
}