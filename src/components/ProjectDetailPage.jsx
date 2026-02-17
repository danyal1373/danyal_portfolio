import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Grid, 
  Card, 
  Skeleton,
  Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
// import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AnimatedCircle from './AnimatedCircle';
import MarkdownRenderer from './MarkdownRenderer';
import PasswordPrompt from './PasswordPrompt';
import { getProjectById, loadProjectContent } from '../utils/projectDataService';
import { useGlassmorphism } from '../hooks/useGlassmorphism';
import { usePassword } from '../contexts/PasswordContext';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  const { isProjectUnlocked, lockPortfolio } = usePassword();
  
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
  
  const [project, setProject] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [contentError, setContentError] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      try {
        const projectData = getProjectById(projectId);
        if (!projectData) {
          navigate('/projects');
          return;
        }
        
        setProject(projectData);
        
        // Check if project is password protected and not unlocked
        if (projectData.passwordProtected && !isProjectUnlocked(projectId)) {
          setShowPasswordPrompt(true);
          setLoading(false);
          return;
        }
        
        if (projectData.contentFile) {
          try {
            const markdownContent = await loadProjectContent(projectData.contentFile);
            setContent(markdownContent);
            setContentError(null);
          } catch (error) {
            console.error('Error loading content:', error);
            setContentError(error.message);
            setContent(`# Content Loading Error\n\nUnable to load the project content.\n\n**Error:** ${error.message}\n\nPlease try refreshing the page or contact support if the issue persists.`);
          }
        }
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId, navigate, isProjectUnlocked]);

  const handlePasswordSuccess = async () => {
    if (project?.contentFile) {
      const markdownContent = await loadProjectContent(project.contentFile);
      setContent(markdownContent);
    }
  };

  const handleLockPortfolio = () => {
    lockPortfolio();
    setContent('');
    setShowPasswordPrompt(true);
  };

  if (loading) {
    return (
      <Box sx={{ 
        background: theme.palette.background.default, 
        minHeight: '100vh', 
        py: 4, 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
       
        <Box sx={{ maxWidth: 1100, mx: 'auto', position: 'relative', zIndex: 1 }}>
          <Skeleton variant="text" width={300} height={60} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 3 }} />
          <Skeleton variant="text" width="100%" height={100} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="80%" height={100} />
        </Box>
      </Box>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <Box sx={{ background: theme.palette.background.default, minHeight: '100vh' }}>
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
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
          sx={{ 
            mb: 3, 
            color: theme.palette.text.secondary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            }
          }}
        >
          Back to Projects
        </Button>

        {/* Project Header */}
        <Card
          sx={{
            ...glassmorphism.base,
            ...glassmorphism.withHighlights,
            ...glassmorphism.hover,
            ...noisyBackgroundStyle,
            mb: 4,
            p: 4,
            borderRadius: theme.shape.borderRadius * 2,
          }}
        >
          <Grid container spacing={4}>
            {/* Project Info */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: theme.typography.h2.fontWeight }}>
                  {project.category}
                </Typography>
                {project.passwordProtected && (
                  <Chip
                    icon={<LockIcon />}
                    label="Protected"
                    size="small"
                    sx={{
                      ml: 2,
                      backgroundColor: theme.palette.warning.main,
                      color: 'white',
                      '& .MuiChip-icon': {
                        color: 'white',
                      }
                    }}
                  />
                )}
              </Box>
              <Typography variant="h3" sx={{ 
                color: theme.palette.text.primary, 
                fontWeight: theme.typography.h2.fontWeight, 
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}>
                {project.title}
              </Typography>
              <Typography variant="h6" sx={{ 
                color: theme.palette.text.secondary, 
                fontWeight: theme.typography.body1.fontWeight, 
                mb: 3,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}>
                {project.subtitle}
              </Typography>
              <Typography variant="body1" sx={{ 
                color: theme.palette.text.secondary, 
                mb: 3,
                lineHeight: 1.7
              }}>
                {project.description}
              </Typography>

              {/* Tags */}
              <Box sx={{ mb: 3 }}>
                {project.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    sx={{
                      mr: 1,
                      mb: 1,
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255,255,255,0.1)' 
                        : 'rgba(0,0,0,0.08)',
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                      }
                    }}
                  />
                ))}
              </Box>

              {/* Project Details */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarTodayIcon sx={{ mr: 1, fontSize: 16, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {project.date}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ScheduleIcon sx={{ mr: 1, fontSize: 16, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {project.duration}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon sx={{ mr: 1, fontSize: 16, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {project.role}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BusinessIcon sx={{ mr: 1, fontSize: 16, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {project.client}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Lock/Unlock Button for Protected Projects */}
              {project.passwordProtected && (
                <Box sx={{ mt: 3 }}>
                  {isProjectUnlocked(projectId) ? (
                    <Button
                      variant="outlined"
                      startIcon={<LockIcon />}
                      onClick={handleLockPortfolio}
                      sx={{
                        color: theme.palette.warning.main,
                        borderColor: theme.palette.warning.main,
                        '&:hover': {
                          backgroundColor: theme.palette.warning.main,
                          color: 'white',
                        }
                      }}
                    >
                      Lock Portfolio
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<LockIcon />}
                      onClick={() => setShowPasswordPrompt(true)}
                      sx={{
                        backgroundColor: theme.palette.warning.main,
                        '&:hover': {
                          backgroundColor: theme.palette.warning.dark,
                        }
                      }}
                    >
                      Unlock Portfolio
                    </Button>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>

        {/* Project Content */}
        {(!project.passwordProtected || isProjectUnlocked(projectId)) ? (
          <>
            {contentError ? (
              <Card
                sx={{
                  ...glassmorphism.base,
                  ...glassmorphism.withHighlights,
                  ...glassmorphism.hover,
                  ...noisyBackgroundStyle,
                  p: 4,
                  borderRadius: theme.shape.borderRadius * 2,
                  mb: 4,
                }}
              >
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" sx={{ color: theme.palette.error.main, mb: 2 }}>
                    Content Loading Error
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                    {contentError}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    onClick={() => window.location.reload()}
                    sx={{ mt: 2 }}
                  >
                    Retry
                  </Button>
                </Box>
              </Card>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <MarkdownRenderer content={content} sectionByH2 />
              </Box>
            )}
          </>
        ) : (
          <Card
            sx={{
              ...glassmorphism.base,
              ...glassmorphism.withHighlights,
              ...glassmorphism.hover,
              ...noisyBackgroundStyle,
              p: 4,
              borderRadius: theme.shape.borderRadius * 2,
            }}
          >
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <LockIcon sx={{ fontSize: 80, color: theme.palette.text.secondary, mb: 2 }} />
              <Typography variant="h5" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                Content Protected
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                This project requires a password to view the detailed content.
              </Typography>
              <Button
                variant="contained"
                startIcon={<LockIcon />}
                onClick={() => setShowPasswordPrompt(true)}
                sx={{
                  backgroundColor: theme.palette.warning.main,
                  '&:hover': {
                    backgroundColor: theme.palette.warning.dark,
                  }
                }}
              >
                Enter Password
              </Button>
            </Box>
          </Card>
        )}
        </Box>
      </Box>

      {/* Password Prompt Dialog */}
      <PasswordPrompt
        open={showPasswordPrompt}
        onClose={() => setShowPasswordPrompt(false)}
        onSuccess={handlePasswordSuccess}
      />
    </Box>
  );
};

export default ProjectDetailPage; 
