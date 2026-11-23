import React from 'react';
import { Box, Typography } from '@mui/material';
import MuxPlayer from '@mux/mux-player-react';
import GlassSection from './GlassSection';

const extractMuxPlaybackId = (url = '') => {
  const match = String(url).match(/https?:\/\/stream\.mux\.com\/([^./?]+)(?:\.[a-z0-9]+)?/i);
  return match ? match[1] : '';
};

export default function VideoSection({
  src,
  poster,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  aspectRatio = '16 / 9',
  caption,
}) {
  if (!src) return null;

  const playbackId = extractMuxPlaybackId(src);
  const effectiveMuted = autoplay ? true : muted;

  return (
    <GlassSection sx={{ p: 2 }}>
      <Box
        sx={{
          width: '100%',
          aspectRatio,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {playbackId ? (
          <MuxPlayer
            playbackId={playbackId}
            metadata={{ video_title: caption || 'Project Video' }}
            streamType="on-demand"
            poster={poster}
            autoPlay={autoplay}
            loop={loop}
            muted={effectiveMuted}
            controls={controls}
            playsInline
            preload="auto"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box
            component="video"
            src={src}
            poster={poster}
            autoPlay={autoplay}
            loop={loop}
            muted={effectiveMuted}
            controls={controls}
            playsInline
            preload="metadata"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
      </Box>
      {caption && (
        <Typography variant="caption" sx={{ display: 'block', mt: 1.5, opacity: 0.8 }}>
          {caption}
        </Typography>
      )}
    </GlassSection>
  );
}

