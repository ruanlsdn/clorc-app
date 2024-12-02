import axios from 'axios';

const axiosCardService = axios.create({
  baseURL: 'https://budget-api-divine-firefly-417.fly.dev/api/v1/card',
});

export default axiosCardService;
