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
  Rating, 
  Divider,
  Paper,
  Chip,
  IconButton,
  CardMedia
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getProductByIdApi } from '@/lib/api';
import { DetailSkeleton } from '@/components/LoadingSkeleton';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByIdApi(id as string);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const nextImage = () => {
    if (product && product.images) {
      setActiveImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) return <DetailSkeleton />;
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Box>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => router.back()} 
        sx={{ mb: 4 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper elevation={3} sx={{ position: 'relative', overflow: 'hidden', borderRadius: 4, bgcolor: '#f9f9f9' }}>
            <Box sx={{ position: 'relative', height: 450, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
              <CardMedia
                component="img"
                image={product.images?.[activeImage]}
                alt={product.title}
                sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
              />
              
              {product.images?.length > 1 && (
                <>
                  <IconButton 
                    onClick={prevImage}
                    sx={{ position: 'absolute', left: 10, bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'white' } }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>
                  <IconButton 
                    onClick={nextImage}
                    sx={{ position: 'absolute', right: 10, bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'white' } }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </>
              )}
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, p: 2, bgcolor: 'white' }}>
              {product.images?.map((_: any, index: number) => (
                <Box 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    bgcolor: index === activeImage ? 'primary.main' : 'grey.300',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {product.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Rating value={product.rating} precision={0.1} readOnly size="large" />
              <Typography variant="h6" color="text.secondary">
                {product.rating} ({product.reviews?.length || 0} reviews)
              </Typography>
            </Box>

            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold', mb: 4 }}>
              ${product.price}
            </Typography>

            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: 'text.secondary', fontSize: '1.1rem' }}>
              {product.description}
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="caption" color="text.secondary">Brand</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{product.brand || 'N/A'}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="caption" color="text.secondary">Stock Status</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: product.stock > 0 ? 'success.main' : 'error.main' }}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Typography variant="caption" color="text.secondary">Category</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{product.category}</Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {product.tags?.map((tag: string) => (
                <Chip key={tag} label={tag} variant="outlined" sx={{ textTransform: 'capitalize' }} />
              ))}
            </Box>

            <Divider sx={{ my: 4 }} />

            <Button variant="contained" size="large" sx={{ px: 8, py: 1.5, borderRadius: 2 }}>
              Edit Product
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
