import axios from 'axios';

const axiosAuthService = axios.create({
  baseURL: 'https://budget-api-divine-firefly-417.fly.dev/api/v1/auth',
});

export default axiosAuthService;
