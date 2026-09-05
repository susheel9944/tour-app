// services/api/axios.ts
/// <reference types="node" />

import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000,
});
