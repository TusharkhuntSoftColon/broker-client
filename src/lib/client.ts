import axios from 'axios';
import { BASE_URL } from '../utils/environments';

const static_accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiZTRiMjdjMjEzYjE0N2VmY2FlODAiLCJhY2Nlc3NUb2tlbklkIjoiYTg2MWE4NjQ0M2RkYWM5NzQzNjQ4NDkyMTVjZjQyNzkiLCJpYXQiOjE2OTc0NTcxNjgsImV4cCI6MTY5NzQ1ODk2OH0.YJgAzVk_dMTMZyicUUWguPn_DjvmawcvwVVDfzHz_Ko';

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
  Authorization: `Bearer ${static_accessToken}`,
};

const client = axios.create({
  baseURL: BASE_URL,
  headers,
});

export default client;
