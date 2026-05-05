'use client';
import { useEffect, useState, useCallback } from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  Pagination, 
  InputAdornment, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useStore } from '@/store/useStore';
import ProductGrid from '@/components/ProductGrid';
import { GridSkeleton } from '@/components/LoadingSkeleton';
import debounce from 'lodash.debounce';

export default function ProductsPage() {
  const { 
    products, 
    totalProducts, 
    productsPage, 
    productsSearch, 
    productsCategory,
    categories,
    loadingProducts, 
    fetchProducts,
    fetchCategories
  } = useStore();

  const [searchTerm, setSearchTerm] = useState(productsSearch);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchProducts(1, query, productsCategory);
    }, 400),
    [fetchProducts, productsCategory]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleCategoryChange = useCallback((event: SelectChangeEvent) => {
    const category = event.target.value;
    fetchProducts(1, productsSearch, category === 'all' ? '' : category);
  }, [fetchProducts, productsSearch]);

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    fetchProducts(value, productsSearch, productsCategory);
  }, [fetchProducts, productsSearch, productsCategory]);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(1, '', '');
    }
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchProducts, fetchCategories, products.length, categories.length]);

  const totalPages = Math.ceil(totalProducts / 10);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Products
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search products..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 300 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl size="small" sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={productsCategory || 'all'}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((cat: any) => (
                <MenuItem key={cat.slug || cat} value={cat.slug || cat}>
                  {cat.name || cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {loadingProducts ? (
        <GridSkeleton />
      ) : products.length > 0 ? (
        <>
          <ProductGrid products={products} />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination 
              count={totalPages} 
              page={productsPage} 
              onChange={handlePageChange} 
              color="primary" 
              variant="outlined"
              shape="rounded"
              size="large"
            />
          </Box>
        </>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 8 }}>
          No products found.
        </Typography>
      )}
    </Box>
  );
}
