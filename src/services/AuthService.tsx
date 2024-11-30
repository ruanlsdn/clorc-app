import axios from 'axios';

const axiosAuthService = axios.create({
  baseURL: 'http://10.0.2.2:3000/api/v1/auth',
});

export default axiosAuthService;
