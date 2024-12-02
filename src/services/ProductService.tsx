import axios from "axios";

const axiosProductService =  axios.create({
  baseURL: "https://budget-api-divine-firefly-417.fly.dev/api/v1/product",
});


export default axiosProductService;