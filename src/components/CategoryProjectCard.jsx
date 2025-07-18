import React from 'react';
import { Box, Typography, Card, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { usePassword } from '../contexts/PasswordContext';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

const CategoryProjectCard = ({ project }) => {
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

    const cardStyle = {
        ...glassmorphism.base,
        ...glassmorphism.withHighlights,
        ...glassmorphism.hover,
        ...noisyBackgroundStyle,
        height: { xs: 480, md: 520 },
        width: { xs: 220, md: 220 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2.5,
        cursor: 'pointer',
    };

    return (
        <Card sx={cardStyle} onClick={handleProjectClick} variant="elevation" elevation={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.7 }}>
                    {project.subtitle}
                </Typography>
                {project.passwordProtected && (
                    <LockIcon
                        sx={{
                            fontSize: theme.typography.h6.fontSize,
                            color: '#D94A4A',
                            opacity: isProjectUnlocked(project.id) ? 0.6 : 1,
                        }}
                    />
                )}
            </Box>

            <Box sx={{ textAlign: 'left' }}>
                <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.tags.slice(0, 3).map((tag, i) => (
                        <Chip
                            key={i}
                            label={tag}
                            variant="outlined"
                            size="small"
                        />
                    ))}
                </Box>
                
                <Typography variant="h5" sx={{ fontWeight: theme.typography.h2.fontWeight, mb: 1 }}>
                    {project.title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'error.main', fontWeight: theme.typography.h6.fontWeight, mb: 1.5 }}>
                    {project.client} &mdash; {project.role}
                </Typography>

                <Typography variant="body2" sx={{ 
                    color: 'text.secondary', 
                    opacity: 0.8, 
                    lineHeight: 1.6,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                }}>
                    {project.description}
                </Typography>
            </Box>
        </Card>
    );
};

export default CategoryProjectCard; 
