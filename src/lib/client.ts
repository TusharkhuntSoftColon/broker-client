import axios from 'axios';

import { BASE_URL } from '../utils/environments';


const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': [
    'Origin',
    'Accept',
    'X-Requested-With',
    'Content-Type',
    'Authorization',
  ],
};

const client = axios.create({
  baseURL: BASE_URL,
  headers,
});

export default client;
