import axios from 'axios';

const axio = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 9999999,//100000,
});

export default axio;