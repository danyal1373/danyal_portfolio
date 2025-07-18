import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, useTheme } from '@mui/material';

export default function PhotoCard({ image, title, date, location, camera, description, onImageClick }) {
  const theme = useTheme();
  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, borderRadius: (theme) => theme.shape.borderRadius, boxShadow: 2, mb: 3, minHeight: 200 }}>
      <Box sx={{ flexBasis: { xs: '100%', sm: '75%' }, flexGrow: 0, flexShrink: 0, position: 'relative', width: { xs: '100%', sm: 'auto' }, aspectRatio: '4/3', minWidth: 0, cursor: onImageClick ? 'pointer' : 'default' }} onClick={onImageClick}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: (theme) => theme.shape.borderRadius,
            borderTopRightRadius: { sm: 0 },
            borderBottomLeftRadius: { sm: 0 },
          }}
        />
      </Box>
      <CardContent sx={{ flexBasis: { xs: '100%', sm: '25%' }, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: theme.typography.h2.fontWeight }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
          {date} {location ? `| ${location}` : ''}
        </Typography>
        {camera && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
            {camera}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
} 
