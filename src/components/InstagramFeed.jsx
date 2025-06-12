import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, Typography, useTheme } from '@mui/material';

// Get credentials from environment variables
const INSTAGRAM_ACCESS_TOKEN = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.REACT_APP_INSTAGRAM_USER_ID;

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
        setError('Instagram API credentials are not configured');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }

        const data = await response.json();
        // Filter for image posts only and take the first 6
        const imagePosts = data.data
          .filter(post => post.media_type === 'IMAGE')
          .slice(0, 6);
        
        setPosts(imagePosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Loading Instagram feed...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography variant="body2" sx={{ color: theme.palette.error.main }}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (posts.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          No Instagram posts found
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card 
            sx={{ 
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
              boxShadow: 0,
              border: `1px solid ${theme.palette.divider}`,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <a 
              href={post.permalink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <CardMedia
                component="img"
                image={post.media_url}
                alt={post.caption || 'Instagram post'}
                sx={{
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                }}
              />
              {post.caption && (
                <Box sx={{ p: 2 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {post.caption}
                  </Typography>
                </Box>
              )}
            </a>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
} 