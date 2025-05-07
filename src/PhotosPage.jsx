import React from 'react';
import { Box, Typography } from '@mui/material';
import PhotoCategoryCard from './components/PhotoCategoryCard';

const categories = [
  {
    title: 'Astrophotography',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Landscape',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Industrial Photography',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
];

export default function PhotosPage() {
  return (
    <Box sx={{ background: theme => theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 4 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
          Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <PhotoCategoryCard key={cat.title} title={cat.title} image={cat.image} />
          ))}
        </Box>
      </Box>
    </Box>
  );
} 