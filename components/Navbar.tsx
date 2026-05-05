'use client';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const logout = useStore(state => state.logout);
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutConfirm = async () => {
    setOpen(false);
    logout(); // Clear Zustand
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ px: { xs: 0 } }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', cursor: 'pointer' }}
            >
              <Link href="/dashboard/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                ADMIN DASHBOARD
              </Link>
            </Typography>
            
            {session && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button 
                  component={Link} 
                  href="/dashboard/users" 
                  color={pathname.includes('/users') ? 'primary' : 'inherit'} 
                  sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: pathname.includes('/users') ? 'bold' : 'normal' }}
                >
                  Users
                </Button>
                <Button 
                  component={Link} 
                  href="/dashboard/products" 
                  color={pathname.includes('/products') ? 'primary' : 'inherit'} 
                  sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: pathname.includes('/products') ? 'bold' : 'normal' }}
                >
                  Products
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={handleLogoutClick}
                  size="small"
                  sx={{ 
                    borderRadius: 2,
                    fontWeight: 'bold',
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 }
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        slotProps={{
          paper: {
            sx: { borderRadius: 3, p: 1, borderTop: '4px solid #d32f2f' }
          }
        }}
      >
        <DialogTitle id="logout-dialog-title" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {"Confirm Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out of the Admin Dashboard?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleClose} color="inherit" variant="text">
            Cancel
          </Button>
          <Button 
            onClick={handleLogoutConfirm} 
            color="error" 
            variant="outlined" 
            autoFocus 
            sx={{ 
              borderRadius: 2,
              px: 3,
              fontWeight: 'bold',
              borderWidth: 2,
              '&:hover': { borderWidth: 2 }
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
