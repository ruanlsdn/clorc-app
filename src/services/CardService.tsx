import axios from 'axios';

const axiosCardService = axios.create({
  baseURL: 'http://10.0.2.2:3000/api/v1/card',
});

export default axiosCardService;
