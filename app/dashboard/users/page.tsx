'use client';
import { useEffect, useState, useCallback } from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  Pagination, 
  InputAdornment 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useStore } from '@/store/useStore';
import UserTable from '@/components/UserTable';
import { TableSkeleton } from '@/components/LoadingSkeleton';
import debounce from 'lodash.debounce';

export default function UsersPage() {
  const { 
    users, 
    totalUsers, 
    usersPage, 
    usersSearch, 
    loadingUsers, 
    fetchUsers 
  } = useStore();

  const [searchTerm, setSearchTerm] = useState(usersSearch);

  // Debounced search handler
  // Using useCallback to ensure the debounced function is stable across renders
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchUsers(1, query);
    }, 400),
    [fetchUsers]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    fetchUsers(value, usersSearch);
  }, [fetchUsers, usersSearch]);

  useEffect(() => {
    // Initial fetch if empty
    if (users.length === 0) {
      fetchUsers(1, '');
    }
  }, [fetchUsers, users.length]);

  const totalPages = Math.ceil(totalUsers / 10);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Users
        </Typography>
        
        <TextField
          placeholder="Search users..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: { xs: '100%', sm: 300 } }}
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
      </Box>

      {loadingUsers ? (
        <TableSkeleton />
      ) : users.length > 0 ? (
        <>
          <UserTable users={users} />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={totalPages} 
              page={usersPage} 
              onChange={handlePageChange} 
              color="primary" 
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 8 }}>
          No users found.
        </Typography>
      )}
    </Box>
  );
}
