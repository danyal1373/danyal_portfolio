import React, { useState } from 'react';
import { Card, Box, Typography } from '@mui/material';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

export default function PhotoCategoryCard({ title, image }) {
  const [hover, setHover] = useState(false);
  const glassmorphism = useGlassmorphism();
  const noisyBackgroundStyle = {
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=\\"0 0 512 512\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.8\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E')`,
      opacity: 0.08,
      pointerEvents: 'none',
      zIndex: 0,
    },
  };
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '1 / 2.4',
        position: 'relative',
        borderRadius: (theme) => theme.shape.borderRadius,
        overflow: 'hidden',
        boxShadow: 1,
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: 4 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Background image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          transition: 'opacity 0.4s',
          opacity: hover ? 1 : 0,
        }}
      />
      {/* Foreground card */}
      <Card
        sx={{
          ...glassmorphism.base,
          ...glassmorphism.withHighlights,
          ...glassmorphism.hover,
          ...noisyBackgroundStyle,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          boxShadow: 'none',
          borderRadius: (theme) => theme.shape.borderRadius,
          position: 'relative',
          zIndex: 1,
          transition: 'opacity 0.4s',
          opacity: hover ? 0 : 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', p: 2 }}>
          {title}
        </Typography>
      </Card>
    </Box>
  );
} 
