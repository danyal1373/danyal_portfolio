import React from 'react';
import { Box, Typography, Card, Chip, Link, useTheme } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useGlassmorphism } from './hooks/useGlassmorphism';
import AnimatedCircle from './components/AnimatedCircle';

const publications = [
  {
    role: 'Advances in Building Energy Research',
    company: 'Experimental investigation of buoyancy-driven natural ventilation in a building with an atrium using particle image velocimetry (PIV) method.',
    project: {
      name: "https://doi.org/10.1080/17512549.2023.2263459",
      url: 'https://doi.org/10.1080/17512549.2023.2263459',
    },
    description: 'Mitra Bagheri, Danyal Ghanbari Barfeh, Maryam Karami, Shahram Delfani, Mohamadreza Hafezi',
    date: 'Sep 2023',
  },
  {
    role: 'Visions for Sustainability',
    company: 'Building design based on zero energy approach',
    project: {
      name: "https://doi.org/10.13135/2384-8677/8109",
      url: 'https://doi.org/10.13135/2384-8677/8109',
    },
    description: 'Mitra Bagheri, Danyal Ghanbari Barfeh, Mahdis Hamisi',
    date: 'July 2023',
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
        <Typography 
          variant="h1"
          sx={{ 
            color: theme.palette.text.primary, 
            mb: 4, 
            mt: 2, 
            fontWeight: theme.typography.h1.fontWeight,
            fontSize: { xs: '2.5rem', md: '5rem' },
            textAlign: 'right'
          }}
        >
          Research
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
          As a researcher, I'm interested in challenging technical problems at the intersections of engineering, design, and reality, exploring the natures behavior using smart systems, Vision systems, AI, and ML to understand and elaborate on complex systems behavior to be able to improve the built systems performance with a concern for sustainability.
        </Typography>
        <Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: theme.typography.body1.fontWeight, mb: 3 }}>
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
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: theme.typography.body1.fontWeight }}>
              {pub.role}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: theme.typography.h6.fontWeight, mb: 0.5 }}>
              {pub.company}
            </Typography>
            <Link href={pub.project.url} underline="hover" sx={{ color: theme.palette.error.main, fontWeight: theme.typography.body1.fontWeight, fontSize: theme.typography.body2.fontSize }}>
              {pub.project.name}
            </Link>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: theme.typography.body2.fontSize, mt: 0.5 }}>
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
                fontWeight: theme.typography.h6.fontWeight 
              }} 
            />
          </Card>
        ))}
        <Link 
          href="https://scholar.google.com/citations?user=3mu_XjsAAAAJ&hl=en&inst=3203679203499159833" 
          target="_blank" 
          rel="noopener noreferrer" 
          sx={{ textDecoration: 'none' }}
        >
          <Card sx={{ 
            ...glassmorphism.base,
            ...glassmorphism.withHighlights,
            ...glassmorphism.hover,
            ...noisyBackgroundStyle,
            mt: 4, 
            borderRadius: 2, boxShadow: 0, p: 2, display: 'flex', alignItems: 'center', minHeight: 64,
            cursor: 'pointer',
            '&:hover': {
              ...glassmorphism.hover['&:hover'],
              transform: 'translateY(-2px)',
            }
          }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', flex: 1, fontWeight: theme.typography.body1.fontWeight }}>
              Google Scholar
            </Typography>
            <ArrowOutwardIcon sx={{ fontSize: 48, color: 'error.main' }} />
          </Card>
        </Link>
      </Box>
    </Box>
  );
} 
