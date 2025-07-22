import React from 'react';
import { Box, Typography, Link, IconButton, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import XIcon from '@mui/icons-material/X';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

export default function Footer() {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  
  const socialApps = [
    { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com/danyal1373' },
    { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/danyal-ghanbari/' },
    { icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/danyal1373/' },
    { icon: EmailIcon, label: 'Email', href: 'mailto:danyal1373@gmail.com' },
    { icon: XIcon, label: 'X (Twitter)', href: 'https://x.com/danyal1373' },
  ];

  const navigationLinks = [
    { text: 'projects', href: '/projects' },
    { text: 'about', href: '/about' },
    { text: 'photos', href: '/photos' },
    { text: 'mission', href: '/mission' },
    { text: 'research', href: '/research' },
    { text: 'CV', href: '/resume' },
  ];

  return (
    <Box sx={{ 
      mt: 8, 
      py: 3, 
      borderTop: `1px solid ${theme.palette.divider}`,
      background: theme.palette.background.paper,
    }}>
      <Box sx={{
        maxWidth: 1100,
        mx: 'auto',
        px: 4,
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
        }}>
          {/* Left: Name and Navigation */}
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 100, // Very light weight
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                mb: 2,
              }}
            >
              Danyal Ghanbari
            </Typography>
            
            {/* Navigation links horizontally under the name */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row',
              gap: 3,
              flexWrap: 'wrap',
            }}>
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{ 
                    color: theme.palette.text.secondary,
                    textDecoration: 'none',
                    fontSize: theme.typography.body2.fontSize,
                    fontWeight: theme.typography.body2.fontWeight,
                    '&:hover': { 
                      color: theme.palette.primary.main,
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Right: Connect and Social Apps */}
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 1,
          }}>
            {/* "Connect" Label */}
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: theme.typography.body2.fontWeight,
                mb: 1,
              }}
            >
              Connect
            </Typography>
            
            {/* Social Icons with Glassmorphism */}
            <Box sx={{ 
              display: 'flex', 
              gap: 1,
              flexWrap: 'wrap',
            }}>
              {socialApps.map((app, index) => (
                <IconButton
                  key={index}
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={app.label}
                  sx={{
                    width: 40,
                    height: 40,
                    ...glassmorphism.base,
                    ...glassmorphism.withHighlights,
                    ...glassmorphism.hover,
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      ...glassmorphism.hover['&:hover'],
                      color: theme.palette.primary.main,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 32px ${theme.palette.primary.main}40`,
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <app.icon sx={{ fontSize: 20 }} />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Copyright - Bottom Right */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 2,
        }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: theme.palette.error.main,
              fontSize: theme.typography.caption.fontSize,
              fontWeight: theme.typography.caption.fontWeight,
            }}
          >
            Curated by Danyal Ghanbari © 2024
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
