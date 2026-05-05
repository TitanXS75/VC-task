'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Avatar, 
  Divider,
  Paper,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getUserByIdApi } from '@/lib/api';
import { DetailSkeleton } from '@/components/LoadingSkeleton';

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserByIdApi(id as string);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <DetailSkeleton />;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Box>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => router.back()} 
        sx={{ mb: 4 }}
      >
        Back to Users
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={3} sx={{ textAlign: 'center', p: 3, borderRadius: 2 }}>
            <Avatar 
              src={user.image} 
              sx={{ width: 150, height: 150, mx: 'auto', mb: 2, border: '4px solid #1976d2' }} 
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              @{user.username}
            </Typography>
            <Chip 
              label={user.role || 'User'} 
              color="primary" 
              sx={{ mt: 1, textTransform: 'uppercase', fontWeight: 'bold' }} 
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary">Email</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{user.email}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary">Phone</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{user.phone}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary">Gender</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium', textTransform: 'capitalize' }}>{user.gender}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary">Age</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{user.age}</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold', mt: 5 }}>
              Professional Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary">Company</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{user.company?.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary">Department</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{user.company?.department}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="text.secondary">Title</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{user.company?.title}</Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold', mt: 5 }}>
              Address
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {user.address?.address}, {user.address?.city}, {user.address?.state} {user.address?.postalCode}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
