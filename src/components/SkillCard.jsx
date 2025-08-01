import React from 'react';
import { Card, CardActionArea, Avatar, Typography, Box, useTheme } from '@mui/material';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

export default function SkillCard({ icon, name, color }) {
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
      opacity: 0.05,
      pointerEvents: 'none',
    },
  };

  return (
    <Card
      sx={{
        ...glassmorphism.base,
        ...glassmorphism.withHighlights,
        ...glassmorphism.hover,
        ...noisyBackgroundStyle,
        borderRadius: (theme) => theme.shape.borderRadius * 1.5,
        '&:hover': {
          ...glassmorphism.hover['&:hover'],
          boxShadow: `0 12px 40px 0 rgba(31, 38, 135, 0.25), 0 0 20px ${color}33`,
        },
      }}
    >
              <CardActionArea 
        sx={{ 
          p: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box 
          sx={{ 
            width: 48, 
            height: 48, 
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }}
        >
          {React.cloneElement(icon, { 
            sx: { 
              opacity: 0.7,
              fontSize: 32,
              color: color || theme.palette.primary.main
            } 
          })}
        </Box>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            color: 'text.primary', 
            fontWeight: theme.typography.h6.fontWeight,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          {name}
        </Typography>
      </CardActionArea>
    </Card>
  );
} 
