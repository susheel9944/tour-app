// services/api/axios.ts
/// <reference types="node" />

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.31.132:5001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
