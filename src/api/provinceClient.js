import axios from "axios";
import queryString from "query-string";

const provinceClient=axios.create({
    baseURL:'https://provinces.open-api.vn/api',
    headers:{
        'Content-Type':'application/json'
    },
    paramsSerializer: params=>queryString.stringify({...params})
})

provinceClient.interceptors.request.use(async (config) => config);

provinceClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default provinceClient;
