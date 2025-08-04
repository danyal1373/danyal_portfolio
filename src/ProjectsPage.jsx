import React, { useEffect, useRef } from 'react';
import { Box, Typography, Card, Divider, Grid, Chip } from '@mui/material';
import AnimatedCircle from './components/AnimatedCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LockIcon from '@mui/icons-material/Lock';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, getFeaturedProjects, getAllCategories } from './utils/projectDataService';
import { usePassword } from './contexts/PasswordContext';
import CategoryProjectCard from './components/CategoryProjectCard';
import { useGlassmorphism } from './hooks/useGlassmorphism';
import SEO from './components/SEO';

const FeaturedProjectCard = ({ project }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isProjectUnlocked } = usePassword();
  const glassmorphism = useGlassmorphism();

  const handleProjectClick = () => {
    navigate(`/projects/${project.id}`);
  };

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
    },
  };

  return (
    <Card
      sx={{
        ...glassmorphism.base,
        ...glassmorphism.withHighlights,
        ...glassmorphism.hover,
        ...noisyBackgroundStyle,
        height: { xs: 400, md: 450 },
        p: { xs: 2, sm: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onClick={handleProjectClick}
      variant="elevation"
      elevation={0}
    >
      <Box
        component="img"
        src={project.image}
        alt={project.title}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '60%',
          maxWidth: { xs: '80%', md: '50%' },
          objectFit: 'contain',
          opacity: 0.5,
          filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
          zIndex: 0,
        }}
        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x120?text=Image+Not+Found'; e.target.style.opacity = '0.1'; }}
      />
      
      <Box sx={{ position: 'absolute', top: { xs: 24, md: 32 }, left: { xs: 24, md: 32 }, textAlign: 'left', zIndex: 1 }}>
        <Typography variant="h6" sx={{ color: 'text.secondary', opacity: 0.8, fontSize: { xs: '1rem', md: '1.25rem' } }}>
          {project.subtitle}
        </Typography>
      </Box>

      {project.passwordProtected && (
        <Box sx={{ position: 'absolute', top: { xs: 24, md: 32 }, right: { xs: 24, md: 32 }, zIndex: 1 }}>
          <LockIcon
            sx={{
              fontSize: { xs: 24, md: 28 },
              color: '#D94A4A',
              opacity: isProjectUnlocked(project.id) ? 0.6 : 1,
            }}
          />
        </Box>
      )}

      <Box sx={{
        position: 'absolute',
        bottom: { xs: 24, md: 32 },
        left: { xs: 24, md: 32 },
        right: { xs: 24, md: 32 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 2,
        zIndex: 1,
      }}>
        <Box sx={{ textAlign: 'left', flexShrink: 1, minWidth: 0 }}>
          <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: theme.typography.h2.fontWeight, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
            {project.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'error.main', mt: 1, fontWeight: theme.typography.h6.fontWeight }}>
            {project.category}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, display: { xs: 'none', md: 'block' } }}>
            {project.description}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'flex-end', flexShrink: 0 }}>
          {project.tags.map((tag, i) => (
            <Chip
              key={i}
              label={tag}
              size="small"
              sx={{
                ...glassmorphism.base,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'text.secondary',
              }}
              variant="outlined"
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
};


export default function ProjectsPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const pageRef = useRef();
  const glassmorphism = useGlassmorphism();
  
  const featuredProjects = getFeaturedProjects();
  const allProjects = getAllProjects();
  const categories = getAllCategories();

  const projectsByCategory = categories.reduce((acc, category) => {
    const projs = allProjects.filter(p => p.category === category && !p.featured);
    if (projs.length > 0) {
      acc[category] = projs;
    }
    return acc;
  }, {});

  // Scroll to section if hash is present
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

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
    },
  };

  return (
    <>
      <SEO 
        title="Projects Portfolio - Danyal Ghanbari"
        description="Explore my innovative projects in product design, engineering, marketing, and user research. Featured projects showcasing cutting-edge technology and human-centered design."
        keywords="projects, portfolio, product design, engineering, innovation, technology, user research, marketing, Danyal Ghanbari"
        url="/projects"
      />
      <Box sx={{ background: theme.palette.background.default, minHeight: '100vh' }} ref={pageRef}>
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
      
      {/* --- SCROLLABLE CONTENT --- */}
      <Box sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
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
              Projects
            </Typography>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <>
                <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 3, fontWeight: theme.typography.h6.fontWeight }}>
                  Featured Projects
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
                  {featuredProjects.map((item, idx) => (
                    <FeaturedProjectCard project={item} key={idx} />
                  ))}
                </Box>
                <Divider sx={{ my: 6 }} />
              </>
            )}

            {/* Projects By Category */}
            {Object.entries(projectsByCategory).map(([category, projects]) => (
              <Box key={category} sx={{ mb: 6 }} id={category.toLowerCase().replace(/\s+/g, '-')}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#8C8C87', 
                    mb: 3,
                    fontWeight: theme.typography.h1.fontWeight,
                  }}
                >
                  {category}
                </Typography>
                <Grid container spacing={3}>
                  {projects.map((item, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                      <CategoryProjectCard project={item} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}

            {Object.keys(projectsByCategory).length === 0 && !featuredProjects.length && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                  No projects found.
                </Typography>
              </Box>
            )}
            
            <Divider sx={{ my: 4 }} />
            
            {/* Section Links */}
            <Box sx={{ maxWidth: 1100, mx: 'auto', width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, justifyContent: 'center', alignItems: 'stretch', width: '100%' }}>
                <Card
                  sx={{
                    ...glassmorphism.base,
                    ...glassmorphism.withHighlights,
                    ...glassmorphism.hover,
                    ...noisyBackgroundStyle,
                    position: 'relative',
                    minHeight: 72,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textAlign: 'left',
                    p: { xs: 2.5, md: 4 },
                    mx: 'auto',
                    boxShadow: 'none',
                  }}
                  onClick={() => navigate('/about')}
                  elevation={0}
                >
                  <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: theme.typography.body1.fontWeight, textAlign: 'left' }}>
                    About Me
                  </Typography>
                  <OpenInNewIcon sx={{ color: theme.palette.error.main, fontSize: 40, ml: 2 }} />
                </Card>
                <Card
                  sx={{
                    ...glassmorphism.base,
                    ...glassmorphism.withHighlights,
                    ...glassmorphism.hover,
                    ...noisyBackgroundStyle,
                    position: 'relative',
                    minHeight: 72,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textAlign: 'left',
                    p: { xs: 2.5, md: 4 },
                    mx: 'auto',
                    boxShadow: 'none',
                  }}
                  onClick={() => navigate('/research')}
                  elevation={0}
                >
                  <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: theme.typography.body1.fontWeight, textAlign: 'left' }}>
                    My Publications
                  </Typography>
                  <OpenInNewIcon sx={{ color: theme.palette.error.main, fontSize: 40, ml: 2 }} />
                </Card>
              </Box>
            </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
} 
