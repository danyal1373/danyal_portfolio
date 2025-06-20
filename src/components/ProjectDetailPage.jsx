import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Grid, 
  Card, 
  CardContent, 
  Divider,
  Skeleton,
  Button,
  IconButton,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
  
  const [project, setProject] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
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
          const markdownContent = await loadProjectContent(projectData.contentFile);
          setContent(markdownContent);
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
        <AnimatedCircle color="primary" size={420} frequency={0.22} phase={0} style={{ top: '8%', left: '60%' }} />
        <AnimatedCircle color="error" size={420} frequency={0.25} phase={1.2} style={{ top: '18%', left: '75%' }} />
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
    <Box sx={{ 
      background: theme.palette.background.default, 
      minHeight: '100vh', 
      py: 4, 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Background circles */}
      <AnimatedCircle color="primary" size={420} frequency={0.22} phase={0} style={{ top: '8%', left: '60%' }} />
      <AnimatedCircle color="error" size={420} frequency={0.25} phase={1.2} style={{ top: '18%', left: '75%' }} />
      <AnimatedCircle color="warning" size={420} frequency={0.21} phase={2.1} style={{ top: '28%', left: '50%' }} />
      
      <Box sx={{ maxWidth: 1100, mx: 'auto', position: 'relative', zIndex: 1 }}>
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
            mb: 4,
            p: 4,
          }}
        >
          <Grid container spacing={4}>
            {/* Project Image */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={project.image}
                alt={project.title}
                sx={{
                  width: '100%',
                  height: 300,
                  objectFit: 'cover',
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x300?text=Project+Image';
                }}
              />
            </Grid>

            {/* Project Info */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="overline" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
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
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}>
                {project.title}
              </Typography>
              <Typography variant="h6" sx={{ 
                color: theme.palette.text.secondary, 
                fontWeight: 400, 
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
          <Card
            sx={{
              ...glassmorphism.base,
              ...glassmorphism.withHighlights,
              p: 4,
            }}
          >
            <MarkdownRenderer content={content} />
          </Card>
        ) : (
          <Card
            sx={{
              ...glassmorphism.base,
              ...glassmorphism.withHighlights,
              p: 4,
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