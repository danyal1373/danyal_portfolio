import React from 'react';
import { Box, Typography } from '@mui/material';
import GlassSection from './GlassSection';

export default function HtmlEmbedSection({
  src,
  title = 'Interactive Content',
  aspectRatio = '16 / 9',
  height,
  caption,
  noGlass = false,
}) {
  if (!src) return null;

  const frame = (
    <Box
      sx={{
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        component="iframe"
        src={src}
        title={title}
        loading="lazy"
        sx={{
          width: '100%',
          border: 0,
          display: 'block',
          ...(height ? { height } : { aspectRatio }),
        }}
      />
      {caption ? (
        <Typography variant="caption" sx={{ display: 'block', mt: 1.5, opacity: 0.8 }}>
          {caption}
        </Typography>
      ) : null}
    </Box>
  );

  if (noGlass) return frame;

  return <GlassSection sx={{ p: 2 }}>{frame}</GlassSection>;
}

