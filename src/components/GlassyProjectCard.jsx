import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useGlassmorphism } from '../hooks/useGlassmorphism';
import { motion } from 'framer-motion';

const GlassyProjectCard = ({ title, color = 'primary', icon }) => {
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

  const cardStyle = {
    ...glassmorphism.base,
    ...glassmorphism.withHighlights,
    ...glassmorphism.hover,
    ...noisyBackgroundStyle,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    p: 3,
    width: { xs: '100%', sm: 240 },
    height: 280,
    cursor: 'pointer',
    textAlign: 'left',
  };

  const clonedIcon = React.cloneElement(icon, {
    sx: {
      fontSize: 40,
      color: theme.palette[color]?.main || theme.palette.primary.main,
      transition: 'all 0.3s ease',
    },
  });

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: '1000px' }}
    >
      <Card sx={cardStyle} variant="elevation" elevation={0}>
        <Box>
          {clonedIcon}
        </Box>
        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600, mt: 2 }}>
          {title}
        </Typography>
      </Card>
    </motion.div>
  );
};

export default GlassyProjectCard;