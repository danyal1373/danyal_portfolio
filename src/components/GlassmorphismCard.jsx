import React from 'react';
import { Box } from '@mui/material';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

const GlassmorphismCard = ({ 
  children, 
  sx = {}, 
  withHighlights = true, 
  withHover = true,
  colored = null,
  ...props 
}) => {
  const glassmorphism = useGlassmorphism();
  
  const baseStyles = {
    ...glassmorphism.base,
    ...(withHighlights && glassmorphism.withHighlights),
    ...(withHover && glassmorphism.hover),
    ...(colored && glassmorphism.colored(colored)),
    ...sx,
  };

  return (
    <Box
      sx={baseStyles}
      {...props}
    >
      {children}
    </Box>
  );
};

export default GlassmorphismCard; 
