import axios from 'axios';

const API_KEY = '872f42588bb7761fae2ee02e794f42d2'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export default axiosInstance;
