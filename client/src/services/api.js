import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Cart API
export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Checkout API
export const processCheckout = async (items, customerInfo) => {
  try {
    const response = await api.post('/checkout', { items, customerInfo });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
