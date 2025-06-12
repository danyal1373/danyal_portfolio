import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Card, Link, useTheme } from '@mui/material';
import PhotoCategoryCard from './components/PhotoCategoryCard';
import InstagramFeed from './components/InstagramFeed';
import InstagramIcon from '@mui/icons-material/Instagram';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 0,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'transform 0.2s ease-in-out',
  marginBottom: theme.spacing(4),
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

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

function PhotosPage() {
  const theme = useTheme();

  return (
    <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 4 }}>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap', mb: 6 }}>
          {categories.map(cat => (
            <PhotoCategoryCard key={cat.title} title={cat.title} image={cat.image} />
          ))}
        </Box>

        {/* Instagram Section */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, mb: 3, fontWeight: 400 }}>
            Instagram Feed
          </Typography>
          <StyledCard>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <InstagramIcon sx={{ fontSize: 32, color: theme.palette.text.secondary }} />
              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                  @danyal1373
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Follow my photography journey on Instagram
                </Typography>
              </Box>
            </Box>
            <StyledLink 
              href="https://instagram.com/danyal1373" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Profile
            </StyledLink>
          </StyledCard>

          {/* Instagram Feed Grid */}
          <InstagramFeed />
        </Box>
      </Box>
    </Box>
  );
}

export default PhotosPage; 