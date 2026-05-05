'use client';
import { 
  Box, 
  Skeleton, 
  TableRow, 
  TableCell, 
  Grid, 
  Card, 
  CardContent,
  Table,
  TableBody,
  TableContainer,
  Paper
} from '@mui/material';

export function TableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableBody>
          {[...Array(rows)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton variant="text" /></TableCell>
              <TableCell><Skeleton variant="text" /></TableCell>
              <TableCell><Skeleton variant="text" /></TableCell>
              <TableCell><Skeleton variant="text" /></TableCell>
              <TableCell><Skeleton variant="text" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function GridSkeleton({ items = 8 }: { items?: number }) {
  return (
    <Grid container spacing={3}>
      {[...Array(items)].map((_, i) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={32} width="80%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export function DetailSkeleton() {
  return (
    <Box sx={{ p: 2 }}>
      <Skeleton variant="rectangular" height={40} width={150} sx={{ mb: 4 }} />
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Skeleton variant="text" height={60} width="60%" />
          <Skeleton variant="text" height={30} width="30%" />
          <Skeleton variant="rectangular" height={200} sx={{ mt: 4 }} />
        </Grid>
      </Grid>
    </Box>
  );
}
