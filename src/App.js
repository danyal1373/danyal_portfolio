import React, { useState, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box, Typography, Card, CardContent } from '@mui/material';
import AnimatedCircle from './components/AnimatedCircle';
import GlassyProjectCard from './components/GlassyProjectCard';
import { useTheme } from '@mui/material/styles';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageLoader from './components/PageLoader';
import ProjectsPage from './ProjectsPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import ResearchPage from './ResearchPage';
import ProjectOutlinePage from './ProjectOutlinePage';
import SkillCard from './components/SkillCard';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AdbIcon from '@mui/icons-material/Adb';
import StorageIcon from '@mui/icons-material/Storage';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import AstrophotographyPage from './AstrophotographyPage';
import PreviousWorkPage from './PreviousWorkPage';

// Lazy load pages
const ProjectsPageLazy = React.lazy(() => import('./ProjectsPage'));
const AboutPageLazy = React.lazy(() => import('./AboutPage'));
const PhotosPageLazy = React.lazy(() => import('./PhotosPage'));
const ResearchPageLazy = React.lazy(() => import('./ResearchPage'));
const ProjectOutlinePageLazy = React.lazy(() => import('./ProjectOutlinePage'));
const PreviousWorkPageLazy = React.lazy(() => import('./PreviousWorkPage'));
const AstrophotographyPageLazy = React.lazy(() => import('./AstrophotographyPage'));

function PlaceholderPage({ title }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.palette.background.default }}>
      <Typography variant="h3" color="text.secondary">{title}</Typography>
    </Box>
  );
}

function HomePage() {
  const theme = useTheme();
  // State for About card glow
  const [glowPos, setGlowPos] = useState(null);

  return (
    <>
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          background: 'transparent',
          position: 'relative',
          overflow: 'hidden',
          py: 4,
        }}
      >
        {/* Animated background circles */}
        <AnimatedCircle color="#D11B28" size={250} frequency={0.5} phase={0} />
        <AnimatedCircle color="#ECB145" size={250} frequency={0.7} phase={1} />
        <AnimatedCircle color="#21A6C0" size={250} frequency={0.6} phase={2} />
        
        <Box sx={{ maxWidth: 1100, mx: 'auto', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Large faded name */}
          <Typography
            variant="h1"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 100,
              fontSize: { xs: '2.5rem', md: '5rem' },
              textAlign: 'right',
              mt: 4,
              userSelect: 'none',
              letterSpacing: 2,
            }}
          >
            Danyal Ghanbari
          </Typography>
          {/* Right-aligned subtitle and tags */}
          <Box sx={{ textAlign: 'right', mt: { xs: 8, md: 16 } }}>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 300 }}>
              Technology | Human | Nature
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, fontWeight: 300 }}>
              Product Designer
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography component="span" sx={{ color: theme.palette.error.main, fontWeight: 500 }}>
                Business
              </Typography>
              <Typography component="span" sx={{ color: theme.palette.text.secondary, fontWeight: 500, mx: 1 }}>
                |
              </Typography>
              <Typography component="span" sx={{ color: theme.palette.warning.main, fontWeight: 500 }}>
                Design
              </Typography>
              <Typography component="span" sx={{ color: theme.palette.text.secondary, fontWeight: 500, mx: 1 }}>
                |
              </Typography>
              <Typography component="span" sx={{ color: theme.palette.info.main, fontWeight: 500 }}>
                Engineering
              </Typography>
            </Box>
          </Box>
          {/* Bottom-centered description */}
          <Box sx={{ width: '100%', mt: { xs: 8, md: 16 }, mb: 6 }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 1,
              position: 'relative',
              width: 'fit-content',
              ml: 'auto',
              mr: { xs: 2, md: 0 },
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                height: '1px',
                background: theme.palette.divider,
              },
              '&::before': {
                top: 0,
              },
              '&::after': {
                bottom: 0,
              },
              py: 2,
            }}>
              <Typography variant="body1" sx={{ 
                color: theme.palette.text.secondary, 
                textAlign: 'right', 
                fontWeight: 300,
                maxWidth: 'fit-content'
              }}>
                Passionate about bridging the gaps by help
              </Typography>
              <Typography variant="body1" sx={{ 
                color: theme.palette.text.secondary, 
                textAlign: 'right', 
                fontWeight: 300,
                maxWidth: 'fit-content'
              }}>
                cutting-edge technology, building meaningful
              </Typography>
              <Typography variant="body1" sx={{ 
                color: theme.palette.text.secondary, 
                textAlign: 'right', 
                fontWeight: 300,
                maxWidth: 'fit-content'
              }}>
                products that people love, to solve problems for humans
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Projects Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
          background: 'transparent',
          overflow: 'hidden',
        }}
      >
        {/* Background circles for projects section - updated to match screenshot */}
        <AnimatedCircle color="#21A6C0" size={550} frequency={0.22} phase={0} style={{ top: '50%', left: '45%' }} />
        <AnimatedCircle color="#ECB145" size={550} frequency={0.22} phase={1} style={{ top: '50%', left: '50%' }} />
        <AnimatedCircle color="#D11B28" size={550} frequency={0.22} phase={2} style={{ top: '50%', left: '55%' }} />
        <Box sx={{ maxWidth: 1100, mx: 'auto', position: 'relative', zIndex: 1 }}>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, mb: 3, ml: 2, fontWeight: 400 }}>
            Projects
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'center', alignItems: 'stretch' }}>
            <GlassyProjectCard title="Product Development" color="primary" />
            <GlassyProjectCard title="Engineering Design and Prototyping" color="primary" />
            <GlassyProjectCard title="Marketing/Branding" color="error" />
            <GlassyProjectCard title="User Research" color="warning" />
          </Box>
        </Box>
      </Box>
      {/* Skills Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 10 },
          background: theme.palette.background.default,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ maxWidth: 1100, mx: 'auto', position: 'relative', zIndex: 1 }}>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, mb: 3, ml: 2, fontWeight: 400 }}>
            Skills
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }, gap: 3 }}>
            <SkillCard icon={<CodeIcon />} name="JavaScript" color="#f7df1e" />
            <SkillCard icon={<CodeIcon />} name="TypeScript" color="#3178c6" />
            <SkillCard icon={<WebAssetIcon />} name="React" color="#61dafb" />
            <SkillCard icon={<WebAssetIcon />} name="Vue" color="#42b883" />
            <SkillCard icon={<BrushIcon />} name="Figma" color="#a259ff" />
            <SkillCard icon={<BrushIcon />} name="Adobe XD" color="#ff61f6" />
            <SkillCard icon={<DesignServicesIcon />} name="Sketch" color="#f7b500" />
            <SkillCard icon={<AdbIcon />} name="Android Studio" color="#3ddc84" />
            <SkillCard icon={<StorageIcon />} name="Firebase" color="#ffca28" />
            <SkillCard icon={<WebAssetIcon />} name="HTML" color="#e34c26" />
            <SkillCard icon={<WebAssetIcon />} name="CSS" color="#2965f1" />
            <SkillCard icon={<WebAssetIcon />} name="Notion" color="#000" />
          </Box>
        </Box>
      </Box>
      {/* About Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
          background: theme.palette.background.default,
          overflow: 'hidden',
        }}
      >
        {/* Red background circle */}
        <AnimatedCircle color="error" size={340} frequency={0.12} phase={0} style={{ top: '10%', left: '18%' }} />
        <Box sx={{ maxWidth: 1100, mx: 'auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'stretch' }}>
          {/* Glassy card with about text - now interactive */}
          <Card
            sx={{
              flex: 2,
              minWidth: 320,
              background: theme.palette.background.paper + 'cc',
              border: `1.5px solid ${theme.palette.divider}`,
              boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(12px)',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              px: 3,
              pt: 6,
              pb: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s',
              boxShadow: glowPos ? `0 0 0 3px ${theme.palette.primary.main}33` : '0 4px 30px rgba(0,0,0,0.08)',
            }}
            onMouseMove={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              setGlowPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                w: rect.width,
                h: rect.height,
              });
            }}
            onMouseLeave={() => setGlowPos(null)}
          >
            {/* Border glow effect */}
            {glowPos && (
              <Box
                sx={{
                  pointerEvents: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 10,
                  borderRadius: 2,
                  boxShadow: `0 0 24px 6px ${theme.palette.primary.main}55`,
                  opacity: 0.5,
                  maskImage: `radial-gradient(circle at ${glowPos.x}px ${glowPos.y}px, white 30%, transparent 70%)`,
                  WebkitMaskImage: `radial-gradient(circle at ${glowPos.x}px ${glowPos.y}px, white 30%, transparent 70%)`,
                  transition: 'mask-image 0.1s, -webkit-mask-image 0.1s',
                }}
              />
            )}
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 300, position: 'absolute', top: 24, left: 24, zIndex: 2 }}>
              About
            </Typography>
            <CardContent sx={{ color: theme.palette.text.secondary, fontWeight: 400, fontSize: 16 }}>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, sit amet tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
              </Typography>
            </CardContent>
          </Card>
          {/* Photo */}
          <Box sx={{ flex: 1.2, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              component="img"
              src="/images/profile.jpg"
              alt="Danyal Ghanbari"
              sx={{
                width: '100%',
                maxWidth: 320,
                height: 340,
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: '0 4px 30px rgba(0,0,0,0.10)',
                filter: 'grayscale(100%)',
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPageLazy />} />
            <Route path="/previous-work" element={<PreviousWorkPageLazy />} />
            <Route path="/about" element={<AboutPageLazy />} />
            <Route path="/photos" element={<PhotosPageLazy />} />
            <Route path="/photos/astrophotography" element={<AstrophotographyPageLazy />} />
            <Route path="/research" element={<ResearchPageLazy />} />
            <Route path="/resume" element={<PlaceholderPage title="Resume" />} />
            <Route path="/project-outline" element={<ProjectOutlinePageLazy />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </>
  );
}