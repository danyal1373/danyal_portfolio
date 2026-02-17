import React from 'react';
import { Box, Typography } from '@mui/material';
import GlassSection from './GlassSection';

export default function VideoSection({
  src,
  poster,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  aspectRatio = '16 / 9',
  caption,
}) {
  if (!src) {
    return null;
  }

  return (
    <GlassSection sx={{ p: 2 }}>
      <Box
        sx={{
          width: '100%',
          aspectRatio,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          component="video"
          src={src}
          poster={poster}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          controls={controls}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>
      {caption && (
        <Typography variant="caption" sx={{ display: 'block', mt: 1.5, opacity: 0.8 }}>
          {caption}
        </Typography>
      )}
    </GlassSection>
  );
}

