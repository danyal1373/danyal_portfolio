import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

export default function GlassSection({ children, sx = {} }) {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();

  const noisyBackgroundStyle = {
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`,
      opacity: theme.palette.mode === 'dark' ? 0.05 : 0.1,
      pointerEvents: 'none',
    },
  };

  return (
    <Box
      sx={{
        ...glassmorphism.base,
        ...glassmorphism.withHighlights,
        ...glassmorphism.hover,
        ...noisyBackgroundStyle,
        p: 4,
        borderRadius: theme.shape.borderRadius * 2,
        position: 'relative',
        zIndex: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

