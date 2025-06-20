import React from 'react';
import { Card, CardActionArea, Avatar, Typography } from '@mui/material';

export default function SkillCard({ icon, name, color }) {
  return (
    <Card
      sx={{
        borderRadius: (theme) => theme.shape.borderRadius * 1.5,
        // Glassmorphism core styles:
        background: 'rgba(255,255,255,0.18)',
        border: '1.5px solid rgba(255,255,255,0.35)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: `0 12px 40px 0 rgba(31, 38, 135, 0.25), 0 0 20px ${color}33`,
          transform: 'translateY(-2px)',
          border: `1.5px solid rgba(255,255,255,0.5)`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '40px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          boxShadow: 'inset 0 1.5px 12px 0 rgba(255,255,255,0.18)',
          zIndex: 1,
          pointerEvents: 'none',
        },
      }}
    >
      <CardActionArea 
        sx={{ 
          p: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: color || 'primary.main', 
            width: 48, 
            height: 48, 
            mb: 1,
            boxShadow: `0 4px 12px ${color}40`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: `0 6px 20px ${color}60`,
            }
          }}
        >
          {icon}
        </Avatar>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            color: 'text.primary', 
            fontWeight: 500,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          {name}
        </Typography>
      </CardActionArea>
    </Card>
  );
} 