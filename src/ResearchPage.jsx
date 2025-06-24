import React from 'react';
import { Box, Typography, Card, Chip, Link, useTheme } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useGlassmorphism } from './hooks/useGlassmorphism';
import AnimatedCircle from './components/AnimatedCircle';

const publications = [
  {
    role: 'Product Design Strategist Intern',
    company: 'CCC Intelligent Solutions',
    project: {
      name: "Carnegie Mellon University's Ignik Outdoors - Capstone Project",
      url: '#',
    },
    description: 'How might we make people want to explore, move and live outside longer?',
    date: 'May 2023 - Now',
  },
  {
    role: 'Product Design Strategist Intern',
    company: 'CCC Intelligent Solutions',
    project: {
      name: "Carnegie Mellon University's Ignik Outdoors - Capstone Project",
      url: '#',
    },
    description: 'How might we make people want to explore, move and live outside longer?',
    date: 'May 2023 - Now',
  },
];

export default function ResearchPage() {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  const noisyBackgroundStyle = {
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=\\"0 0 512 512\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.8\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E')`,
      opacity: theme.palette.mode === 'dark' ? 0.05 : 0.1,
      pointerEvents: 'none',
      zIndex: 0,
    },
  };
  return (
    <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      {/* --- FIXED BACKGROUND --- */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}>
        <AnimatedCircle color="#D11B28" size={800} frequency={0.22} phase={0} style={{ top: '50%', left: '55%' }} />
        <AnimatedCircle color="#ECB145" size={800} frequency={0.25} phase={1.2} style={{ top: '50%', left: '60%' }} />
        <AnimatedCircle color="#21A6C0" size={800} frequency={0.21} phase={2.1} style={{ top: '50%', left: '50%' }} />
      </Box>
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 4 }}>
        <Typography variant="h3" sx={{ color: theme.palette.text.primary, fontWeight: 400, textAlign: 'right', mb: 2 }}>
          Research
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2, textAlign: 'left' }}>
          Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus
        </Typography>
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 400, mb: 2 }}>
          Publications
        </Typography>
        {publications.map((pub, idx) => (
          <Card key={idx} sx={{ 
            ...glassmorphism.base,
            ...glassmorphism.withHighlights,
            ...glassmorphism.hover,
            ...noisyBackgroundStyle,
            mb: 2, 
            borderRadius: theme.shape.borderRadius, 
            boxShadow: 0, 
            p: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            position: 'relative' 
          }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 400 }}>
              {pub.role}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 500, mb: 0.5 }}>
              {pub.company}
            </Typography>
            <Link href={pub.project.url} underline="hover" sx={{ color: theme.palette.error.main, fontWeight: 400, fontSize: 14 }}>
              {pub.project.name}
            </Link>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: 13, mt: 0.5 }}>
              {pub.description}
            </Typography>
            <Chip 
              label={pub.date} 
              size="small" 
              sx={{ 
                position: 'absolute', 
                right: 16, 
                bottom: 16, 
                bgcolor: theme.palette.divider, 
                color: theme.palette.text.secondary, 
                fontWeight: 500 
              }} 
            />
          </Card>
        ))}
        <Card sx={{ 
          ...glassmorphism.base,
          ...glassmorphism.withHighlights,
          ...glassmorphism.hover,
          ...noisyBackgroundStyle,
          mt: 4, 
          borderRadius: 2, boxShadow: 0, p: 2, display: 'flex', alignItems: 'center', minHeight: 64 }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', flex: 1, fontWeight: 400 }}>
            Google Scholar
          </Typography>
          <ArrowOutwardIcon sx={{ fontSize: 48, color: 'error.main' }} />
        </Card>
      </Box>
    </Box>
  );
} 