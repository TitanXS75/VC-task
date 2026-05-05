'use client';
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Avatar, 
  Box, 
  Typography,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

interface UserTableProps {
  users: any[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead sx={{ bgcolor: 'primary.main' }}>
          <TableRow>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={user.image} sx={{ width: 32, height: 32 }} />
                  <Typography variant="body2">{`${user.firstName} ${user.lastName}`}</Typography>
                </Box>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }}>{user.gender}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.company?.name}</TableCell>
              <TableCell align="right">
                <IconButton 
                  component={Link} 
                  href={`/dashboard/users/${user.id}`} 
                  color="primary" 
                  size="small"
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(UserTable);
