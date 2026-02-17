import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import GlassSection from './GlassSection';

export default function ImageCarouselTwo({
  image1,
  image2,
  alt1 = '',
  alt2 = '',
  caption = '',
  seconds = 6,
  aspectRatio = '16 / 9',
}) {
  const theme = useTheme();

  if (!image1 || !image2) {
    return null;
  }

  const duration = Number.isFinite(Number(seconds)) ? Math.max(2, Number(seconds)) : 6;

  return (
    <GlassSection sx={{ p: 2 }}>
      <Box
        sx={{
          overflow: 'hidden',
          borderRadius: theme.shape.borderRadius,
          position: 'relative',
          width: '100%',
          aspectRatio,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '300%',
            animation: `carousel2-slide ${duration}s ease-in-out infinite`,
            '@keyframes carousel2-slide': {
              '0%, 38%': { transform: 'translateX(0%)' },
              '50%, 88%': { transform: 'translateX(-33.3333%)' },
              '100%': { transform: 'translateX(-66.6667%)' },
            },
          }}
        >
          <Box
            sx={{
              width: '33.3333%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            }}
          >
            <Box
              component="img"
              src={image1}
              alt={alt1}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Box>
          <Box
            sx={{
              width: '33.3333%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            }}
          >
            <Box
              component="img"
              src={image2}
              alt={alt2}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Box>
          <Box
            sx={{
              width: '33.3333%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            }}
          >
            <Box
              component="img"
              src={image1}
              alt={alt1}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Box>
        </Box>
      </Box>
      {caption ? (
        <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: theme.palette.text.secondary }}>
          {caption}
        </Typography>
      ) : null}
    </GlassSection>
  );
}

