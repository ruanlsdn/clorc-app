import axios from "axios";

const axiosProductService =  axios.create({
  baseURL: "http://10.0.2.2:3000/api/v1/product",
});


export default axiosProductService;