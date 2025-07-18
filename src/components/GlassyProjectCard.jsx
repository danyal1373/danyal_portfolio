import React, { useState } from 'react';
import { Box, Typography, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useGlassmorphism } from '../hooks/useGlassmorphism';
import { motion, AnimatePresence } from 'framer-motion';

const GlassyProjectCard = ({ title, color = 'primary', icon, onClick }) => {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  const [hovered, setHovered] = useState(false);

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
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    p: { xs: 2, sm: 3 },
    width: { xs: '100%', sm: 260, md: 320 },
    aspectRatio: '1 / 2.54',
    maxWidth: 258,
    minWidth: 180,
    minHeight: 320,
    cursor: 'pointer',
    textAlign: 'left',
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: (theme) => theme.shape.borderRadius * 2,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    margin: '0 auto',
  };

  const clonedIcon = React.cloneElement(icon, {
    sx: {
      fontSize: 56,
      color: theme.palette[color]?.main || theme.palette.primary.main,
      transition: 'all 0.3s ease',
      opacity: hovered ? 1 : 0,
      transform: hovered ? 'scale(1)' : 'scale(0.7)',
      filter: hovered ? 'drop-shadow(0 4px 16px rgba(0,0,0,0.10))' : 'none',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transformOrigin: 'center',
      zIndex: 3,
      pointerEvents: 'none',
      translate: '-50% -50%',
    },
  });

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Go to ${title} section`}
    >
      <Card sx={cardStyle} variant="elevation" elevation={0}>
        {/* Centered Icon (only visible on hover) */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            >
              {clonedIcon}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Title pinned to bottom, using theme typography */}
        <Box sx={{ width: '100%', mt: 'auto', mb: 2, zIndex: 4 }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: theme.typography.h6.fontWeight }}>
            {title}
          </Typography>
        </Box>
      </Card>
    </motion.div>
  );
};

export default GlassyProjectCard;
