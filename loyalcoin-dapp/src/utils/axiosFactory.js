import Axios from "axios"

export default (basePath, headers = {}) => Axios.create({
  baseURL: `${basePath}/api`,
  headers
});