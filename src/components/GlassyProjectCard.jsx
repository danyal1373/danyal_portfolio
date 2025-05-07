import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTheme } from '@mui/material/styles';

export default function GlassyProjectCard({ title, color = 'primary', icon }) {
  const [hover, setHover] = useState(false);
  const Icon = icon || OpenInNewIcon;
  const theme = useTheme();

  // Resolve color from theme palette if possible
  let resolvedColor = color;
  if (theme.palette[color] && theme.palette[color].main) {
    resolvedColor = theme.palette[color].main;
  }

  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        minWidth: 200,
        minHeight: 340,
        height: 340,
        flex: 1,
        m: 1,
        px: 2,
        py: 2,
        display: 'flex',
        alignItems: 'flex-end',
        background: theme.palette.background.paper + 'cc',
        border: `1.5px solid ${theme.palette.divider}`,
        boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(12px)',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: `0 8px 40px ${resolvedColor}44`,
        },
      }}
    >
      {/* Centered icon on hover */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}
      >
        <Icon sx={{ fontSize: 56, color: resolvedColor, opacity: 0.7 }} />
      </Box>
      <CardContent>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, fontWeight: 400 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
} 