import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import GlassSection from './GlassSection';

export default function ImageCollageThree({
  image1,
  image2,
  image3,
  alt1 = '',
  alt2 = '',
  alt3 = '',
  caption = '',
}) {
  const theme = useTheme();

  if (!image1 || !image2 || !image3) {
    return null;
  }

  return (
    <GlassSection sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: { xs: 'auto auto', md: '1fr 1fr' },
            gap: 1.5,
            gridColumn: { xs: '1 / -1', md: '1 / 2' },
          }}
        >
          <Box
            component="img"
            src={image1}
            alt={alt1}
            sx={{
              width: '100%',
              height: { xs: 220, md: '100%' },
              aspectRatio: { xs: 'auto', md: '16 / 9' },
              objectFit: 'cover',
              borderRadius: theme.shape.borderRadius,
            }}
          />
          <Box
            component="img"
            src={image2}
            alt={alt2}
            sx={{
              width: '100%',
              height: { xs: 220, md: '100%' },
              aspectRatio: { xs: 'auto', md: '16 / 9' },
              objectFit: 'cover',
              borderRadius: theme.shape.borderRadius,
            }}
          />
        </Box>
        <Box
          sx={{
            gridColumn: { xs: '1 / -1', md: '2 / 3' },
            display: 'flex',
            minHeight: 0,
          }}
        >
          <Box
            component="img"
            src={image3}
            alt={alt3}
            sx={{
              width: '100%',
              height: { xs: 320, md: '100%' },
              objectFit: 'cover',
              borderRadius: theme.shape.borderRadius,
            }}
          />
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

