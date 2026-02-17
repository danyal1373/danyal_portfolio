import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useGlassmorphism } from '../hooks/useGlassmorphism';
import LockIcon from '@mui/icons-material/Lock';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import EngineeringIcon from '@mui/icons-material/Engineering';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PsychologyIcon from '@mui/icons-material/Psychology';

// Hover reveal card with two states:
// - front (default/idle)
// - back (revealed on hover)
// size: '1/3' | '2/3' | 'full' (affects suggested width; container may override)
export default function HoverSplitCard({
  left = '',   // kept for backward-compat; mapped to front
  right = '',  // kept for backward-compat; mapped to back
  layout,      // kept for backward-compat; mapped to size
  front,       // preferred prop
  back,        // preferred prop
  size = '1/3',
  title,
  thumb,       // optional background/thumb image like homepage cards
  icon,        // optional icon name from MUI set used in project cards
}) {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();

  // Backward compatibility mapping
  const frontContent = typeof front === 'string' ? front : left;
  const backContent = typeof back === 'string' ? back : right;
  let resolvedSize = size;
  if (!resolvedSize && layout) {
    resolvedSize = layout.startsWith('2/3') ? '2/3' : '1/3';
  }

  const iconMap = {
    lock: LockIcon,
    openinnew: OpenInNewIcon,
    arrowoutward: ArrowOutwardIcon,
    engineering: EngineeringIcon,
    designservices: DesignServicesIcon,
    psychology: PsychologyIcon,
  };
  const IconComp = icon ? iconMap[String(icon).replace(/[^a-z0-9]/gi, '').toLowerCase()] : null;

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
      zIndex: 0,
    },
  };

  return (
    <Box
      sx={{
        ...glassmorphism.base,
        ...glassmorphism.hover,
        ...noisyBackgroundStyle,
        p: { xs: 2, md: 3 },
        borderRadius: theme.shape.borderRadius * 2,
        minHeight: 220,
        cursor: 'pointer',
        // Prevent global markdown heading dividers inside cards
        '& h1, & h2, & h3, & h4': {
          borderBottom: 'none !important',
          paddingBottom: '0 !important',
          marginTop: 0,
        },
        '& hr': {
          display: 'none',
        },
        // Front state typography: theme gray
        '& .hover-card-front p, & .hover-card-front li, & .hover-card-front span, & .hover-card-front strong, & .hover-card-front em, & .hover-card-front h1, & .hover-card-front h2, & .hover-card-front h3, & .hover-card-front h4, & .hover-card-front h5, & .hover-card-front h6': {
          color: theme.palette.text.secondary,
        },
        '& .hover-card-front a': {
          color: theme.palette.text.secondary,
          textDecorationColor: theme.palette.text.secondary,
        },
        // Back (hovered) state typography: theme red
        '& .hover-card-back p, & .hover-card-back li, & .hover-card-back span, & .hover-card-back strong, & .hover-card-back em, & .hover-card-back h1, & .hover-card-back h2, & .hover-card-back h3, & .hover-card-back h4, & .hover-card-back h5, & .hover-card-back h6': {
          color: theme.palette.error.main,
        },
        '& .hover-card-back a': {
          color: theme.palette.error.main,
          textDecorationColor: theme.palette.error.main,
        },
        '& .hover-card-front': {
          opacity: 1,
          transform: 'translateY(0)',
          pointerEvents: 'auto',
        },
        '& .hover-card-back': {
          opacity: 0,
          transform: 'translateY(6px)',
          pointerEvents: 'none',
        },
        '&:hover .hover-card-front': {
          opacity: 0,
          transform: 'translateY(-6px)',
          pointerEvents: 'none',
        },
        '&:hover .hover-card-back': {
          opacity: 1,
          transform: 'translateY(0)',
          pointerEvents: 'auto',
        },
      }}
    >
      {/* Optional faint thumb/icon like homepage cards */}
      {thumb && (
        <Box
          component="img"
          src={thumb}
          alt=""
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: '62%',
            maxWidth: { xs: '82%', md: '68%' },
            objectFit: 'contain',
            opacity: 0.2,
            filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Front state */}
      <Box
        className="hover-card-front"
        sx={{
          position: 'absolute',
          inset: 0,
          p: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          textAlign: 'left',
          zIndex: 2,
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        {IconComp && (
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <IconComp sx={{ color: theme.palette.error.main, fontSize: 30 }} />
          </Box>
        )}
        {title && (
          <Typography variant="overline" sx={{ color: theme.palette.text.secondary }}>
            {title}
          </Typography>
        )}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{frontContent}</ReactMarkdown>
      </Box>

      {/* Back state */}
      <Box
        className="hover-card-back"
        sx={{
          position: 'absolute',
          inset: 0,
          p: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          textAlign: 'left',
          zIndex: 3,
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{backContent}</ReactMarkdown>
      </Box>
    </Box>
  );
}

