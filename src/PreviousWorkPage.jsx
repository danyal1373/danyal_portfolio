import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Chip, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AnimatedCircle from './components/AnimatedCircle';
import ArchiveIcon from '@mui/icons-material/Archive';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import StorageIcon from '@mui/icons-material/Storage';
import withPageTransition from './components/withPageTransition';
import { Grow } from '@mui/material';

const legacyProjects = [
  {
    title: "Legacy System Migration",
    description: "A comprehensive migration project from legacy systems to modern cloud infrastructure.",
    tags: ["System Migration", "Cloud", "DevOps"],
    icon: <StorageIcon />,
    year: "2020"
  },
  {
    title: "Classic Web Portal",
    description: "A traditional web portal built with early web technologies, showcasing fundamental web development principles.",
    tags: ["Web Development", "PHP", "MySQL"],
    icon: <CodeIcon />,
    year: "2019"
  },
  {
    title: "Print Design Archive",
    description: "A collection of print design work from the pre-digital era, digitized and preserved.",
    tags: ["Print Design", "Typography", "Archival"],
    icon: <BrushIcon />,
    year: "2018"
  }
];

function PreviousWorkPage() {
  const theme = useTheme();
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    // Delay showing cards for staggered animation
    const timer = setTimeout(() => setShowCards(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ 
      background: theme.palette.background.default, 
      minHeight: '100vh', 
      py: 4, 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Background circles with muted colors */}
      <AnimatedCircle color="#4A4A4A" size={420} frequency={0.15} phase={0} style={{ top: '8%', left: '60%' }} />
      <AnimatedCircle color="#6B6B6B" size={420} frequency={0.18} phase={1.2} style={{ top: '18%', left: '75%' }} />
      <AnimatedCircle color="#8C8C8C" size={420} frequency={0.12} phase={2.1} style={{ top: '28%', left: '50%' }} />

      <Box sx={{ maxWidth: 1100, mx: 'auto', position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <ArchiveIcon sx={{ fontSize: 32, mr: 2, color: theme.palette.text.secondary }} />
          <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
            Previous Work
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4, maxWidth: '800px' }}>
          A curated collection of legacy projects and early work, showcasing the evolution of technology and design approaches over time.
        </Typography>

        <Grid container spacing={3}>
          {legacyProjects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Grow 
                in={showCards} 
                timeout={1000} 
                style={{ transformOrigin: '0 0 0' }}
                {...(showCards ? { timeout: 1000 + index * 200 } : {})}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {project.icon}
                      <Typography variant="h6" sx={{ ml: 1, color: theme.palette.text.primary }}>
                        {project.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.tags.map((tag, tagIndex) => (
                        <Chip 
                          key={tagIndex}
                          label={tag}
                          size="small"
                          sx={{ 
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: theme.palette.text.secondary,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.2)',
                            }
                          }}
                        />
                      ))}
                    </Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        mt: 2,
                        color: theme.palette.text.secondary,
                        opacity: 0.7
                      }}
                    >
                      {project.year}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default withPageTransition(PreviousWorkPage); 