import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, useTheme } from '@mui/material';
import VideoSection from './VideoSection';
import HoverSplitCard from './HoverSplitCard';
import WhyWhatHow from './WhyWhatHow';
import NdaNotice from './NdaNotice';
import GlassSection from './GlassSection';
import ExternalLinkCard from './ExternalLinkCard';
import ImageCollageThree from './ImageCollageThree';
import ImageCarouselTwo from './ImageCarouselTwo';
import ImageGalleryCarousel from './ImageGalleryCarousel';

const MarkdownRenderer = ({ content, sx = {}, sectionByH2 = false }) => {
  const theme = useTheme();

  const markdownStyles = {
    '& h1': {
      // Level 1
      ...theme.typography.h2,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(4),
      borderBottom: `2px solid ${theme.palette.error.main}`,
      paddingBottom: theme.spacing(1),
    },
    '& h2': {
      // Level 2
      ...theme.typography.h4,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4),
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(1),
    },
    '& h3': {
      // Level 3
      ...theme.typography.h6,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(3),
    },
    '& h4': {
      // Level 3 (same as h3 to keep only three levels)
      ...theme.typography.h6,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    '& p': {
      ...theme.typography.body1,
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2),
    },
    '& ul, & ol': {
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
    },
    '& li': {
      ...theme.typography.body1,
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(0.5),
    },
    '& strong': {
      fontWeight: theme.typography.h6.fontWeight,
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
      color: theme.palette.error.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& img': {
      width: '100%',
      maxWidth: '100%',
      height: 'auto',
      display: 'block',
      marginBottom: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      objectFit: 'cover',
    },
  };

  return (
    <Box sx={{ 
      ...markdownStyles, 
      ...sx,
      position: 'relative',
      zIndex: 1,
    }}>
      {content ? (
        (() => {
          const components = {
            // Custom component for h1 to add extra styling
            h1: ({ children }) => (
              <Typography variant="h2" component="h1">
                {children}
              </Typography>
            ),
            // Custom component for h2
            h2: ({ children }) => (
              <Typography variant="h4" component="h2">
                {children}
              </Typography>
            ),
            // Custom component for h3
            h3: ({ children }) => (
              <Typography variant="h6" component="h3">
                {children}
              </Typography>
            ),
            // Custom component for h4
            h4: ({ children }) => (
              <Typography variant="h6" component="h4">
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
            // Custom component for code blocks and shortcodes
            code: ({ inline, className, children, ...props }) => {
              const langMatch = /language-(\w+)/.exec(className || '');
              const lang = (langMatch && langMatch[1]) ? langMatch[1].toLowerCase() : '';
              const raw = String(children || '').trim();

              // Helpers
              const parseKeyValue = (text) => {
                const result = {};
                text.split('\n').forEach((line) => {
                  const m = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+)\s*$/);
                  if (m) {
                    const key = m[1];
                    let val = m[2];
                    if (val === 'true') val = true;
                    else if (val === 'false') val = false;
                    else if (!isNaN(Number(val))) val = Number(val);
                    result[key] = val;
                  }
                });
                return result;
              };

              if (!inline) {
                if (lang === 'video') {
                  const propsObj = parseKeyValue(raw);
                  return <VideoSection {...propsObj} />;
                }

                if (lang === 'card2') {
                   // Optional config lines at top (e.g., size: 1/3 | 2/3) or legacy layout
                  const lines = raw.split('\n');
                   let size = '1/3';
                   let layout = '';
                   let title = '';
                   let thumb = '';
                   let icon = '';
                  let contentStart = 0;
                  for (let i = 0; i < lines.length; i += 1) {
                     const m1 = lines[i].match(/^\s*size\s*:\s*(.+)\s*$/i);
                     const m2 = lines[i].match(/^\s*layout\s*:\s*(.+)\s*$/i);
                     const m3 = lines[i].match(/^\s*title\s*:\s*(.+)\s*$/i);
                     const m4 = lines[i].match(/^\s*thumb\s*:\s*(.+)\s*$/i);
                     const m5 = lines[i].match(/^\s*icon\s*:\s*(.+)\s*$/i);
                     if (m1) {
                      size = m1[1].trim();
                      contentStart = i + 1;
                    } else if (m2) {
                      layout = m2[1].trim();
                      contentStart = i + 1;
                    } else if (m3) {
                      title = m3[1].trim();
                      contentStart = i + 1;
                    } else if (m4) {
                      thumb = m4[1].trim();
                      contentStart = i + 1;
                    } else if (m5) {
                      icon = m5[1].trim();
                      contentStart = i + 1;
                    } else if (lines[i].trim() === '') {
                      contentStart = i + 1;
                    } else {
                      break;
                    }
                  }
                  const content = lines.slice(contentStart).join('\n');
                  const parts = content.split(/^---\s*$/m);
                   const front = (parts[0] || '').trim();
                   const back = (parts[1] || '').trim();
                   // Derive size from legacy layout if not provided
                   if (!size && layout) {
                     size = layout.startsWith('2/3') ? '2/3' : '1/3';
                   }
                   return <HoverSplitCard front={front} back={back} size={size} title={title} thumb={thumb} icon={icon} />;
                }

                if (lang === 'wwh') {
                  const parts = raw.split(/^---\s*$/m).map(s => s.trim());
                  const [p1 = '', p2 = '', p3 = ''] = parts;
                  // Allow optional "Why:" prefixes, but treat content as-is
                  const clean = (s) => s.replace(/^\s*(Why|What|How)\s*:\s*/i, '');
                  return <WhyWhatHow why={clean(p1)} what={clean(p2)} how={clean(p3)} />;
                }

                if (lang === 'nda') {
                  return <NdaNotice>{raw}</NdaNotice>;
                }
                if (lang === 'extlink') {
                  const propsObj = parseKeyValue(raw);
                  return <ExternalLinkCard {...propsObj} />;
                }
                if (lang === 'album3') {
                  const propsObj = parseKeyValue(raw);
                  return <ImageCollageThree {...propsObj} />;
                }
                if (lang === 'carousel2') {
                  const propsObj = parseKeyValue(raw);
                  return <ImageCarouselTwo {...propsObj} />;
                }
                if (lang === 'gallery') {
                  const lines = raw.split('\n');
                  const propsObj = {};
                  const items = [];
                  lines.forEach((line) => {
                    const kv = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+)\s*$/);
                    if (!kv) return;
                    const key = kv[1];
                    const val = kv[2].trim();
                    if (key.toLowerCase() === 'item') {
                      const parts = val.split('|');
                      items.push({
                        src: (parts[0] || '').trim(),
                        name: (parts[1] || '').trim(),
                      });
                    } else {
                      let parsed = val;
                      if (parsed === 'true') parsed = true;
                      else if (parsed === 'false') parsed = false;
                      else if (!isNaN(Number(parsed))) parsed = Number(parsed);
                      propsObj[key] = parsed;
                    }
                  });
                  return <ImageGalleryCarousel {...propsObj} items={items} />;
                }
                if (lang === 'plain') {
                  return (
                    <Box sx={{ ...markdownStyles }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                        {raw}
                      </ReactMarkdown>
                    </Box>
                  );
                }
              }

              // Default rendering for code/inline code
              if (!inline) {
                return (
                  <Box
                    component="pre"
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(0,0,0,0.3)'
                        : 'rgba(0,0,0,0.05)',
                      padding: theme.spacing(2),
                      borderRadius: theme.shape.borderRadius,
                      overflow: 'auto',
                      marginBottom: theme.spacing(2),
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                    }}
                    {...props}
                  >
                    {children}
                  </Box>
                );
              }
              return (
                <Box
                  component="code"
                  sx={{
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)',
                    padding: theme.spacing(0.5, 1),
                    borderRadius: theme.shape.borderRadius,
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                  }}
                  {...props}
                >
                  {children}
                </Box>
              );
            },
          };

          if (sectionByH2) {
            const splitByH2OutsideFences = (text) => {
              const lines = String(text || '').trim().split('\n');
              const sections = [];
              let current = [];
              let inFence = false;

              for (let i = 0; i < lines.length; i += 1) {
                const line = lines[i];
                const trimmed = line.trim();

                if (trimmed.startsWith('```')) {
                  inFence = !inFence;
                }

                const isH2 = /^##\s+/.test(trimmed);
                if (!inFence && isH2 && current.length > 0) {
                  sections.push(current.join('\n'));
                  current = [line];
                } else {
                  current.push(line);
                }
              }

              if (current.length > 0) {
                sections.push(current.join('\n'));
              }

              return sections;
            };

            const parts = splitByH2OutsideFences(content);

            const shortcodeLangs = new Set(['video', 'card2', 'wwh', 'nda', 'plain', 'extlink', 'album3', 'carousel2', 'gallery']);

            const splitIntoBlocks = (text) => {
              const lines = text.split('\n');
              const blocks = [];
              let buffer = [];
              let inFence = false;
              let fenceLang = '';
              let fenceBuffer = [];

              const flushBuffer = () => {
                if (buffer.length > 0) {
                  const md = buffer.join('\n').trim();
                  if (md) blocks.push({ type: 'md', text: md });
                  buffer = [];
                }
              };

              for (let i = 0; i < lines.length; i += 1) {
                const line = lines[i];
                const trimmed = line.trim();
                const fenceClose = trimmed === '```';
                const isFenceLine = trimmed.startsWith('```');
                const fenceLangCandidate = isFenceLine ? trimmed.slice(3).trim().toLowerCase() : '';

                if (!inFence && isFenceLine) {
                  if (shortcodeLangs.has(fenceLangCandidate)) {
                    // Start capturing a shortcode fence
                    flushBuffer();
                    inFence = true;
                    fenceLang = fenceLangCandidate;
                    fenceBuffer = [];
                  } else {
                    // Not a recognized shortcode; treat as normal markdown
                    buffer.push(line);
                  }
                } else if (inFence) {
                  if (fenceClose) {
                    // End of shortcode fence
                    const body = fenceBuffer.join('\n').trim();
                    blocks.push({ type: 'shortcode', lang: fenceLang, body });
                    inFence = false;
                    fenceLang = '';
                    fenceBuffer = [];
                  } else {
                    fenceBuffer.push(line);
                  }
                } else {
                  buffer.push(line);
                }
              }

              flushBuffer();
              return blocks;
            };

            return (
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                {parts.map((part, idx) => {
                  const blocks = splitIntoBlocks(part);
                  return (
                    <Box
                      key={idx}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                        columnGap: 3,
                        rowGap: 3,
                        mb: 2,
                      }}
                    >
                      {blocks.map((b, i) => {
                        if (b.type === 'shortcode') {
                          if (b.lang === 'video') {
                            // key/value
                            const propsObj = {};
                            b.body.split('\n').forEach((line) => {
                              const m = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+)\s*$/);
                              if (m) {
                                const key = m[1];
                                let val = m[2];
                                if (val === 'true') val = true;
                                else if (val === 'false') val = false;
                                else if (!isNaN(Number(val))) val = Number(val);
                                propsObj[key] = val;
                              }
                            });
                            return (
                              <Box key={i} sx={{ gridColumn: '1 / -1' }}>
                                <VideoSection {...propsObj} />
                              </Box>
                            );
                          }
                          if (b.lang === 'card2') {
                            const lines = b.body.split('\n');
                            // collect header key: value lines
                            let layout = '1/3-2/3';
                            let size = '';
                            let title = '';
                            let thumb = '';
                            let icon = '';
                            let contentStart = 0;
                            for (let j = 0; j < lines.length; j += 1) {
                              const mKv = lines[j].match(/^\s*([a-zA-Z]+)\s*:\s*(.+)\s*$/);
                              if (mKv) {
                                const key = mKv[1].toLowerCase();
                                const val = mKv[2].trim();
                                if (key === 'layout') layout = val;
                                if (key === 'size') size = val;
                                if (key === 'title') title = val;
                                if (key === 'thumb') thumb = val;
                                if (key === 'icon') icon = val;
                                contentStart = j + 1;
                              } else if (lines[j].trim() === '') {
                                contentStart = j + 1;
                              } else {
                                break;
                              }
                            }
                            const content = lines.slice(contentStart).join('\n');
                            const parts2 = content.split(/^---\s*$/m);
                            const left = (parts2[0] || '').trim();
                            const right = (parts2[1] || '').trim();
                            // derive size from legacy layout if not provided
                            if (!size && layout) size = layout.startsWith('2/3') ? '2/3' : '1/3';
                            const gridColumn =
                              size === '2/3'
                                ? { xs: '1 / -1', md: 'span 2' }
                                : size === '1/3'
                                ? { xs: '1 / -1', md: 'span 1' }
                                : { xs: '1 / -1', md: '1 / -1' };
                            return (
                              <Box key={i} sx={{ gridColumn, minWidth: 0 }}>
                                <HoverSplitCard left={left} right={right} layout={layout} size={size} title={title} thumb={thumb} icon={icon} />
                              </Box>
                            );
                          }
                          if (b.lang === 'wwh') {
                            const parts2 = b.body.split(/^---\s*$/m).map(s => s.trim());
                            const [p1 = '', p2 = '', p3 = ''] = parts2;
                            const clean = (s) => s.replace(/^\s*(Why|What|How)\s*:\s*/i, '');
                            return (
                              <Box key={i} sx={{ gridColumn: '1 / -1' }}>
                                <WhyWhatHow why={clean(p1)} what={clean(p2)} how={clean(p3)} />
                              </Box>
                            );
                          }
                          if (b.lang === 'nda') {
                            return (
                              <Box key={i} sx={{ gridColumn: '1 / -1' }}>
                                <NdaNotice>{b.body}</NdaNotice>
                              </Box>
                            );
                          }
                          if (b.lang === 'extlink') {
                            const propsObj = {};
                            b.body.split('\n').forEach((line) => {
                              const m = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+)\s*$/);
                              if (m) {
                                const key = m[1];
                                let val = m[2];
                                if (val === 'true') val = true;
                                else if (val === 'false') val = false;
                                propsObj[key] = val;
                              }
                            });
                            return (
                              <Box key={i} sx={{ gridColumn: '1 / -1' }}>
                                <ExternalLinkCard {...propsObj} />
                              </Box>
                            );
                          }
                          if (b.lang === 'album3') {
                            const propsObj = {};
                            b.body.split('\n').forEach((line) => {
                              const m = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+)\s*$/);
                              if (m) {
                                const key = m[1];
                                propsObj[key] = m[2];
                              }
                            });
                            return (
                              <Box key={i} sx={{ gridColumn: '1 / -1' }}>
                                <ImageCollageThree {...propsObj} />
                              </Box>
                            );
                          }
                          if (b.lang === 'carousel2') {
                            const propsObj = {};
                            b.body.split('\n').forEach((line) => {
                              const m = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+)\s*$/);
                              if (m) {
                                const key = m[1];
                                let val = m[2];
                                if (val === 'true') val = true;
                                else if (val === 'false') val = false;
                                else if (!isNaN(Number(val))) val = Number(val);
                                propsObj[key] = val;
                              }
                            });
                            return (
                              <Box key={i} sx={{ gridColumn: '1 / -1' }}>
                                <ImageCarouselTwo {...propsObj} />
                              </Box>
                            );
                          }
                          if (b.lang === 'gallery') {
                            const propsObj = {};
                            const items = [];
                            b.body.split('\n').forEach((line) => {
                              const m = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+)\s*$/);
                              if (!m) return;
                              const key = m[1];
                              let val = m[2].trim();
                              if (key.toLowerCase() === 'item') {
                                const parts3 = val.split('|');
                                items.push({
                                  src: (parts3[0] || '').trim(),
                                  name: (parts3[1] || '').trim(),
                                });
                              } else {
                                if (val === 'true') val = true;
                                else if (val === 'false') val = false;
                                else if (!isNaN(Number(val))) val = Number(val);
                                propsObj[key] = val;
                              }
                            });
                            return (
                              <Box key={i} sx={{ gridColumn: '1 / -1' }}>
                                <ImageGalleryCarousel {...propsObj} items={items} />
                              </Box>
                            );
                          }
                          if (b.lang === 'plain') {
                            return (
                              <Box key={i} sx={{ gridColumn: '1 / -1' }}>
                                <Box sx={{ ...markdownStyles, ...sx }}>
                                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                                    {b.body}
                                  </ReactMarkdown>
                                </Box>
                              </Box>
                            );
                          }
                          return null;
                        }
                        // Regular markdown block as its own bubble
                        const plainMarkerRegex = /^\s*<!--\s*bg:\s*none\s*-->\s*\n?/i;
                        const isPlain = plainMarkerRegex.test(b.text);
                        const textToRender = b.text.replace(plainMarkerRegex, '');
                        if (isPlain) {
                          return (
                            <Box key={i} sx={{ gridColumn: '1 / -1' }}>
                              <Box sx={{ ...markdownStyles, ...sx }}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                                  {textToRender}
                                </ReactMarkdown>
                              </Box>
                            </Box>
                          );
                        }
                        return (
                          <GlassSection key={i} sx={{ gridColumn: '1 / -1' }}>
                            <Box sx={{ ...markdownStyles, ...sx }}>
                              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                                {textToRender}
                              </ReactMarkdown>
                            </Box>
                          </GlassSection>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            );
          }

          return (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {content}
            </ReactMarkdown>
          );
        })()
      ) : (
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Content is loading...
        </Typography>
      )}
    </Box>
  );
};

export default MarkdownRenderer; 
