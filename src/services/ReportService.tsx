import axios from 'axios';

const axiosReportService = axios.create({
  baseURL: 'http://10.0.2.2:3000/api/v1/report',
});

export default axiosReportService;
