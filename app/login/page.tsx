'use client';
import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/dashboard/users');
    }
  }, [session, router]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Use Venture Builders / VB@VentureBuilders');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* LEFT SIDE: Hero Section (Hidden on mobile) */}
      <Box
        sx={{
          flex: 1.2,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          p: 8,
          textAlign: 'center'
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3, letterSpacing: -1 }}>
          VB <br /> Admin Login
        </Typography>
        <Divider sx={{ width: 100, bgcolor: 'primary.main', height: 4, mb: 4, borderRadius: 2 }} />
        <Typography variant="h5" sx={{ maxWidth: 500, fontWeight: 300, lineHeight: 1.6, opacity: 0.9 }}>
          The complete production-quality management dashboard for Venture Builders.
        </Typography>

        <Stack direction="row" spacing={4} sx={{ mt: 8 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>10k+</Typography>
            <Typography variant="caption">Active Users</Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>500+</Typography>
            <Typography variant="caption">Products</Typography>
          </Box>
        </Stack>
      </Box>

      {/* RIGHT SIDE: Login Form Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 3, sm: 6, lg: 10 },
          bgcolor: 'white'
        }}
      >
        <Paper elevation={0} sx={{ maxWidth: 450, width: '100%' }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
              Welcome back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Login to your account to continue.
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.8,
                borderRadius: 2,
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login to Dashboard'}
            </Button>
          </form>

          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Use: <Typography component="span" variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Venture Builders / VB@VentureBuilders</Typography>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

