import axios from 'axios';
const ProductAPI = axios.create({
  baseURL: 'https://rocketseat-node.herokuapp.com/api'
});

export default ProductAPI;