'use client';
import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Rating, 
  Box, 
  Chip,
  CardActionArea
} from '@mui/material';
import Link from 'next/link';

interface ProductGridProps {
  products: any[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)', boxShadow: 6 }
            }}
          >
            <CardActionArea component={Link} href={`/dashboard/products/${product.id}`}>
              <CardMedia
                component="img"
                height="200"
                image={product.thumbnail}
                alt={product.title}
                sx={{ objectFit: 'contain', bgcolor: '#f9f9f9', p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1" component="h2" noWrap sx={{ fontWeight: 'bold', maxWidth: '70%' }}>
                    {product.title}
                  </Typography>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                    ${product.price}
                  </Typography>
                </Box>
                
                <Chip 
                  label={product.category} 
                  size="small" 
                  color="secondary" 
                  variant="outlined" 
                  sx={{ mb: 2, textTransform: 'capitalize' }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={product.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ({product.rating})
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(ProductGrid);
