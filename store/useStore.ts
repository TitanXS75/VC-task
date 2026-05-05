import { create } from 'zustand';
import { 
  getUsersApi, 
  searchUsersApi, 
  getProductsApi, 
  searchProductsApi, 
  getProductsByCategoryApi, 
  getCategoriesApi 
} from '@/lib/api';

interface AuthState {
  token: string | null;
  user: any | null;
  setAuth: (token: string | null, user: any | null) => void;
  logout: () => void;
}

interface UsersState {
  users: any[];
  totalUsers: number;
  usersPage: number;
  usersSearch: string;
  loadingUsers: boolean;
  cachedUsers: Record<string, { users: any[], total: number }>;
  fetchUsers: (page: number, search: string) => Promise<void>;
}

interface ProductsState {
  products: any[];
  totalProducts: number;
  productsPage: number;
  productsSearch: string;
  productsCategory: string;
  categories: any[];
  loadingProducts: boolean;
  cachedProducts: Record<string, { products: any[], total: number }>;
  fetchProducts: (page: number, search: string, category: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const useStore = create<AuthState & UsersState & ProductsState>((set, get) => ({
  // Auth Slice
  token: null,
  user: null,
  setAuth: (token, user) => {
    set({ token, user });
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  },
  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem('token');
  },

  // Users Slice
  users: [],
  totalUsers: 0,
  usersPage: 1,
  usersSearch: '',
  loadingUsers: false,
  cachedUsers: {},
  fetchUsers: async (page, search) => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const cacheKey = `${page}-${search}`;

    // Caching Strategy: Check if data for this page/search combo exists in cache.
    // This reduces redundant API calls and improves performance for back-and-forth navigation.
    const cache = get().cachedUsers[cacheKey];
    if (cache) {
      set({ users: cache.users, totalUsers: cache.total, usersPage: page, usersSearch: search });
      return;
    }

    set({ loadingUsers: true });
    try {
      let response;
      if (search) {
        response = await searchUsersApi(search);
      } else {
        response = await getUsersApi(limit, skip);
      }

      const { users, total } = response;
      set((state) => ({
        users,
        totalUsers: total,
        usersPage: page,
        usersSearch: search,
        loadingUsers: false,
        cachedUsers: { ...state.cachedUsers, [cacheKey]: { users, total } }
      }));
    } catch (error) {
      console.error('Failed to fetch users:', error);
      set({ loadingUsers: false });
    }
  },

  // Products Slice
  products: [],
  totalProducts: 0,
  productsPage: 1,
  productsSearch: '',
  productsCategory: '',
  categories: [],
  loadingProducts: false,
  cachedProducts: {},
  fetchCategories: async () => {
    try {
      const categories = await getCategoriesApi();
      set({ categories });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },
  fetchProducts: async (page, search, category) => {
    const limit = 12;
    const skip = (page - 1) * limit;
    const cacheKey = `${page}-${search}-${category}`;

    // Caching Strategy: Check cache to avoid refetching data for the same filters/page.
    const cache = get().cachedProducts[cacheKey];
    if (cache) {
      set({ 
        products: cache.products, 
        totalProducts: cache.total, 
        productsPage: page, 
        productsSearch: search, 
        productsCategory: category 
      });
      return;
    }

    set({ loadingProducts: true });
    try {
      let response;
      if (category) {
        response = await getProductsByCategoryApi(category);
      } else if (search) {
        response = await searchProductsApi(search);
      } else {
        response = await getProductsApi(limit, skip);
      }

      const { products, total } = response;
      set((state) => ({
        products,
        totalProducts: total,
        productsPage: page,
        productsSearch: search,
        productsCategory: category,
        loadingProducts: false,
        cachedProducts: { ...state.cachedProducts, [cacheKey]: { products, total } }
      }));
    } catch (error) {
      console.error('Failed to fetch products:', error);
      set({ loadingProducts: false });
    }
  },
}));
