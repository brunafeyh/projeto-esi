export const apiBaseUrl = 'http://localhost:3000'
export const API_BASE_URL = 'https://projeto-esi.rj.r.appspot.com';

import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../utils/constants/values';


const token = localStorage.getItem(ACCESS_TOKEN_KEY);

const apiInstance = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    Authorization: `Bearer ${token ? JSON.parse(token) : ''}`,  
  },
});

export default apiInstance;
