import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, useTheme } from '@mui/material';

const MarkdownRenderer = ({ content, sx = {} }) => {
  const theme = useTheme();

  const markdownStyles = {
    '& h1': {
      fontSize: '2.5rem',
      fontWeight: theme.typography.h2.fontWeight,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(4),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      paddingBottom: theme.spacing(1),
    },
    '& h2': {
      fontSize: '2rem',
      fontWeight: theme.typography.h2.fontWeight,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4),
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(1),
    },
    '& h3': {
      fontSize: '1.5rem',
      fontWeight: theme.typography.h2.fontWeight,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(3),
    },
    '& h4': {
      fontSize: '1.25rem',
      fontWeight: theme.typography.h2.fontWeight,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    '& p': {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2),
    },
    '& ul, & ol': {
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
    },
    '& li': {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(0.5),
    },
    '& strong': {
      fontWeight: theme.typography.h2.fontWeight,
      color: theme.palette.text.primary,
    },
    '& em': {
      fontStyle: 'italic',
      color: theme.palette.text.secondary,
    },
    '& code': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(0,0,0,0.1)',
      padding: theme.spacing(0.5, 1),
      borderRadius: theme.shape.borderRadius,
      fontFamily: 'monospace',
      fontSize: '0.9rem',
    },
    '& pre': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(0,0,0,0.3)' 
        : 'rgba(0,0,0,0.05)',
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      overflow: 'auto',
      marginBottom: theme.spacing(2),
    },
    '& pre code': {
      backgroundColor: 'transparent',
      padding: 0,
    },
    '& blockquote': {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      paddingLeft: theme.spacing(2),
      marginLeft: 0,
      marginRight: 0,
      fontStyle: 'italic',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(255,255,255,0.05)' 
        : 'rgba(0,0,0,0.05)',
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
    },
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: theme.spacing(2),
    },
    '& th, & td': {
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
      textAlign: 'left',
    },
    '& th': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(255,255,255,0.1)' 
        : 'rgba(0,0,0,0.05)',
      fontWeight: theme.typography.h2.fontWeight,
    },
    '& hr': {
      border: 'none',
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(4, 0),
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  };

  return (
    <Box sx={{ 
      ...markdownStyles, 
      ...sx,
      position: 'relative',
      zIndex: 1,
    }}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom component for h1 to add extra styling
          h1: ({ children }) => (
            <Typography variant="h1" component="h1">
              {children}
            </Typography>
          ),
          // Custom component for h2
          h2: ({ children }) => (
            <Typography variant="h2" component="h2">
              {children}
            </Typography>
          ),
          // Custom component for h3
          h3: ({ children }) => (
            <Typography variant="h3" component="h3">
              {children}
            </Typography>
          ),
          // Custom component for h4
          h4: ({ children }) => (
            <Typography variant="h4" component="h4">
              {children}
            </Typography>
          ),
          // Custom component for paragraphs
          p: ({ children }) => (
            <Typography variant="body1" component="p">
              {children}
            </Typography>
          ),
          // Custom component for lists
          li: ({ children }) => (
            <Typography variant="body1" component="li">
              {children}
            </Typography>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer; 
