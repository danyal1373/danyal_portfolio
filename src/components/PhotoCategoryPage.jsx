import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, useTheme, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlassmorphism } from '../hooks/useGlassmorphism';
import AnimatedCircle from './AnimatedCircle';
import SEO from './SEO';

export default function PhotoCategoryPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { category } = useParams();
  const glassmorphism = useGlassmorphism();
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadPhotoData = async () => {
      try {
        const response = await fetch(`/content/photos/${category}.json`);
        if (response.ok) {
          const data = await response.json();
          setPhotoData(data);
        } else {
          console.error('Failed to load photo data');
        }
      } catch (error) {
        console.error('Error loading photo data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotoData();
  }, [category]);

  if (loading) {
    return (
      <Box sx={{ 
        background: theme.palette.background.default, 
        minHeight: '100vh', 
        py: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!photoData) {
    return (
      <Box sx={{ 
        background: theme.palette.background.default, 
        minHeight: '100vh', 
        py: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
          Category not found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <SEO 
        title={`${photoData?.title || 'Photography'} - Danyal Ghanbari`}
        description={photoData?.description || "Explore my photography portfolio featuring stunning images and professional photography work."}
        keywords={`photography, ${photoData?.title?.toLowerCase() || 'portfolio'}, Danyal Ghanbari, professional photography`}
        url={`/photos/${category}`}
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

      <Box sx={{ maxWidth: 1100, mx: 'auto', position: 'relative', zIndex: 1 }}>
        {/* Header with back button */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={() => navigate('/photos')}
            sx={{ 
              mr: 2,
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.primary.main,
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography 
            variant="h1"
            sx={{ 
              color: theme.palette.text.primary, 
              fontWeight: theme.typography.h1.fontWeight,
              fontSize: { xs: '2.5rem', md: '5rem' },
              textAlign: 'right',
              flex: 1
            }}
          >
            {photoData.title}
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 6 }}>
          {photoData.description}
        </Typography>

        {/* Photo Grid */}
        <Grid container spacing={3}>
          {photoData.images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <PhotoCard image={image} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </>
  );
}

function PhotoCard({ image }) {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  const [hover, setHover] = useState(false);

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
    <Card
      sx={{
        ...glassmorphism.base,
        ...glassmorphism.withHighlights,
        ...glassmorphism.hover,
        ...noisyBackgroundStyle,
        borderRadius: theme.shape.borderRadius,
        boxShadow: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          ...glassmorphism.hover['&:hover'],
          transform: 'translateY(-4px)',
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '4/3',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={image.src}
          alt={image.alt}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        
        {/* Hover overlay with info */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            color: 'white',
            p: 2,
            transform: hover ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {image.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
            {image.description}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {image.location} • {image.date}
          </Typography>
        </Box>
      </Box>

      {/* Card content */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 1 }}>
          {image.title}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
          {image.description}
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          {image.location} • {image.date}
        </Typography>
      </Box>
    </Card>
  );
} 