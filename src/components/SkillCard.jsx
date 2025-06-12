import React from 'react';
import { Card, CardActionArea, Avatar, Typography } from '@mui/material';

export default function SkillCard({ icon, name, color }) {
  return (
    <Card
      sx={{
        borderRadius: (theme) => theme.shape.borderRadius,
        boxShadow: 1,
        transition: 'box-shadow 0.3s, border-color 0.3s, background 0.3s',
        border: '2px solid transparent',
        '&:hover': {
          boxShadow: 4,
          borderColor: color || 'primary.main',
          background: (theme) => theme.palette.action.hover,
        },
      }}
    >
      <CardActionArea sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: color || 'primary.main', width: 48, height: 48, mb: 1 }}>
          {icon}
        </Avatar>
        <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 500 }}>
          {name}
        </Typography>
      </CardActionArea>
    </Card>
  );
} 