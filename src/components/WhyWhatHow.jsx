import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import GlassSection from './GlassSection';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function WhyWhatHow({ why = '', what = '', how = '' }) {
  const theme = useTheme();
  const brandColors = {
    Why: theme.palette.error.main,
    What: theme.palette.warning.main,
    How: theme.palette.info.main,
  };

  const Item = ({ title, content }) => (
    <GlassSection
      sx={{
        p: { xs: 2, md: 3 },
        borderTop: `3px solid ${brandColors[title] || theme.palette.primary.main}`,
        height: '100%',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: brandColors[title] || theme.palette.primary.main,
          fontWeight: theme.typography.h6.fontWeight,
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          '& p, & li': {
            ...theme.typography.body1,
            lineHeight: theme.typography.body1.lineHeight,
          },
          '& p': { color: theme.palette.text.secondary },
          '& li': { color: theme.palette.text.secondary },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </Box>
    </GlassSection>
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
        gap: 2,
      }}
    >
      <Item title="Why" content={why} />
      <Item title="What" content={what} />
      <Item title="How" content={how} />
    </Box>
  );
}

