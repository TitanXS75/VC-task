import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const loginApi = async (credentials: any) => {
  // Support for custom credentials requested by the user
  if (credentials.username === 'Venture Capital' && credentials.password === 'VC@Indeed') {
    return {
      id: 999,
      username: 'Venture Capital',
      firstName: 'Venture',
      lastName: 'Capital',
      email: 'admin@indeed.com',
      image: 'https://robohash.org/VentureCapital.png?set=set4',
      accessToken: 'mock-jwt-token-for-demo',
    };
  }

  const { data } = await api.post('/auth/login', {
    ...credentials,
    expiresInMins: 30,
  });
  return data;
};

// Users API
export const getUsersApi = async (limit: number, skip: number) => {
  const { data } = await api.get(`/users?limit=${limit}&skip=${skip}`);
  return data;
};

export const searchUsersApi = async (query: string) => {
  const { data } = await api.get(`/users/search?q=${query}`);
  return data;
};

export const getUserByIdApi = async (id: string | number) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

// Products API
export const getProductsApi = async (limit: number, skip: number) => {
  const { data } = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return data;
};

export const searchProductsApi = async (query: string) => {
  const { data } = await api.get(`/products/search?q=${query}`);
  return data;
};

export const getProductsByCategoryApi = async (category: string) => {
  const { data } = await api.get(`/products/category/${category}`);
  return data;
};

export const getCategoriesApi = async () => {
  const { data } = await api.get('/products/categories');
  return data;
};

export const getProductByIdApi = async (id: string | number) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
