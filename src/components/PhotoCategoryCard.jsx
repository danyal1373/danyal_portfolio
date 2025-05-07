import React, { useState } from 'react';
import { Card, Box, Typography } from '@mui/material';

export default function PhotoCategoryCard({ title, image }) {
  const [hover, setHover] = useState(false);
  return (
    <Box
      sx={{
        width: 240,
        height: 320,
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 1,
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: 4 },
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
          width: '100%',
          height: '100%',
          bgcolor: 'divider',
          display: 'flex',
          alignItems: 'flex-end',
          boxShadow: 'none',
          borderRadius: 2,
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