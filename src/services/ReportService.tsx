import axios from 'axios';

const axiosReportService = axios.create({
  baseURL: 'https://budget-api-divine-firefly-417.fly.dev/api/v1/report',
});

export default axiosReportService;
