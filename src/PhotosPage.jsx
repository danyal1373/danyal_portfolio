import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Card, Link, useTheme } from '@mui/material';
import PhotoCategoryCard from './components/PhotoCategoryCard';
import InstagramFeed from './components/InstagramFeed';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useGlassmorphism } from './hooks/useGlassmorphism';
import AnimatedCircle from './components/AnimatedCircle';
import SEO from './components/SEO';

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
    category: 'astrophotography',
    image: '/images/integration_ABE.jpg',
  },
  {
    title: 'Landscape',
    category: 'landscape',
    image: '/images/Lorestan Landscape.jpg',
  },
  {
    title: 'Industrial Photography',
    category: 'industrial',
    image: '/images/IMG_2322.JPG',
  },
];

function PhotosPage() {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  const noisyBackgroundStyle = {
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=\\"0 0 512 512\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.8\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E')`,
      opacity: theme.palette.mode === 'dark' ? 0.05 : 0.1,
      pointerEvents: 'none',
      zIndex: 0,
    },
  };

  return (
    <>
      <SEO 
        title="Photography Portfolio - Danyal Ghanbari"
        description="Explore my photography portfolio featuring astrophotography, landscape photography, and industrial photography. Award-winning night sky photography and professional product photography."
        keywords="photography, astrophotography, landscape photography, industrial photography, night sky photography, product photography, Danyal Ghanbari"
        url="/photos"
      />
      <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
        {/* --- FIXED BACKGROUND --- */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}>
        <AnimatedCircle color="#D11B28" size={800} frequency={0.22} phase={0} style={{ top: '50%', left: '55%' }} />
        <AnimatedCircle color="#ECB145" size={800} frequency={0.25} phase={1.2} style={{ top: '50%', left: '60%' }} />
        <AnimatedCircle color="#21A6C0" size={800} frequency={0.21} phase={2.1} style={{ top: '50%', left: '50%' }} />
      </Box>
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 4 }}>
      <Typography 
              variant="h1"
              sx={{ 
                color: theme.palette.text.primary, 
                mb: 4, 
                mt: 2, 
                fontWeight: theme.typography.h1.fontWeight,
                fontSize: { xs: '2.5rem', md: '5rem' },
                textAlign: 'right'
              }}
            >
              Photos
            </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          Along my professional journey, I had the pleasure of being able to explore the world and capture the beauty of the nature, mostly at night, and using some extensive data techniques, unveil the heavens above with patience and perseverance. Besides that passion of mine in nature and astrophotography, which I was lucky to win awards for, I've done some product photography for my clients and some of my own projects.
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          alignItems: 'stretch',
          mb: 6,
        }}>
          {categories.map(cat => (
            <PhotoCategoryCard key={cat.title} title={cat.title} image={cat.image} category={cat.category} />
          ))}
        </Box>

        {/* Instagram Section */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, mb: 3, fontWeight: theme.typography.body1.fontWeight }}>
            Instagram Feed
          </Typography>
          <Card sx={{
            ...glassmorphism.base,
            ...glassmorphism.withHighlights,
            ...glassmorphism.hover,
            ...noisyBackgroundStyle,
            borderRadius: theme.shape.borderRadius,
            boxShadow: 0,
            border: `1px solid ${theme.palette.divider}`,
            p: theme.spacing(3),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'transform 0.2s ease-in-out',
            mb: theme.spacing(4),
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <InstagramIcon sx={{ fontSize: 32, color: theme.palette.text.secondary }} />
              <Box>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: theme.typography.h6.fontWeight }}>
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
          </Card>

          {/* Instagram Feed Grid */}
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default PhotosPage; 
