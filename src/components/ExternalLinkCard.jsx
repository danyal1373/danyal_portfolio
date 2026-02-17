import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

export default function ExternalLinkCard({
  title = 'External Link',
  url = '#',
  openInNew = true,
}) {
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
      zIndex: 0,
    },
  };

  return (
    <Box
      component="a"
      href={url}
      target={openInNew ? '_blank' : undefined}
      rel={openInNew ? 'noreferrer noopener' : undefined}
      sx={{
        ...glassmorphism.base,
        ...glassmorphism.withHighlights,
        ...glassmorphism.hover,
        ...noisyBackgroundStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        p: { xs: 2.5, md: 3.5 },
        borderRadius: theme.shape.borderRadius * 2,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.body1.fontWeight,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {title}
      </Typography>
      <ArrowOutwardIcon
        sx={{
          color: theme.palette.error.main,
          fontSize: 46,
          position: 'relative',
          zIndex: 1,
        }}
      />
    </Box>
  );
}

