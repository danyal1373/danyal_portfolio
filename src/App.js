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
import SkillCard from './components/SkillCard';
import SpiderChart from './components/SpiderChart';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AdbIcon from '@mui/icons-material/Adb';
import StorageIcon from '@mui/icons-material/Storage';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import CategoryIcon from '@mui/icons-material/Category';
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { PasswordProvider } from './contexts/PasswordContext';

// Lazy load pages
const ProjectsPageLazy = React.lazy(() => import('./ProjectsPage'));
const AboutPageLazy = React.lazy(() => import('./AboutPage'));
const PhotosPageLazy = React.lazy(() => import('./PhotosPage'));
const ResearchPageLazy = React.lazy(() => import('./ResearchPage'));
const ProjectOutlinePageLazy = React.lazy(() => import('./ProjectOutlinePage'));
const PreviousWorkPageLazy = React.lazy(() => import('./PreviousWorkPage'));
const AstrophotographyPageLazy = React.lazy(() => import('./AstrophotographyPage'));
const SwarmPageLazy = React.lazy(() => import('./SwarmPage'));
const ProjectDetailPageLazy = React.lazy(() => import('./components/ProjectDetailPage'));

function PlaceholderPage({ title }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.palette.background.default }}>
      <Typography variant="h3" color="text.secondary">{title}</Typography>
    </Box>
  );
}

// Add SwappingFactionText component
const factionText = {
  business: 'Business: Strategic thinking, leadership, and decision making drive innovation and growth.',
  design: 'Design: Creativity, user research, and visual storytelling shape delightful experiences.',
  engineering: 'Engineering: Technical expertise, problem solving, and architecture build robust solutions.'
};

function SwappingFactionText({ faction = 'business' }) {
  return (
    <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 400, fontSize: { xs: 18, md: 22 }, textAlign: 'left', maxWidth: 420 }}>
      {factionText[faction]}
    </Typography>
  );
}

function HomePage() {
  const theme = useTheme();
  const [glowPos, setGlowPos] = useState(null);
  const [faction, setFaction] = useState('business');
  const [hoveredFaction, setHoveredFaction] = useState(null);
  const displayFaction = hoveredFaction || faction;

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

      {/* Skills Radar Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
          background: 'transparent',
          overflow: 'hidden',
        }}
      >
        {/* Background circles for skills section - shifted left by 2048px */}
        <AnimatedCircle color="#21A6C0" size={4500} frequency={0.22} phase={0} style={{ top: '30%', left: 'calc(35% - 2048px)' }} />
        <AnimatedCircle color="#ECB145" size={4500} frequency={0.22} phase={1} style={{ top: '30%', left: 'calc(45% - 2048px)' }} />
        <AnimatedCircle color="#D11B28" size={4500} frequency={0.22} phase={2} style={{ top: '30%', left: 'calc(55% - 2048px)' }} />
        <Box sx={{ maxWidth: 1100, mx: 'auto', position: 'relative', zIndex: 1 }}>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, mb: 3, ml: 2, fontWeight: 400 }}>
            Skills Overview
          </Typography>
          {/* Glossy, slightly darker background for the chart */}
          <Box sx={{
            position: 'relative',
            // Glassmorphism core styles:
            background: 'rgba(255,255,255,0.18)',
            border: '1.5px solid rgba(255,255,255,0.35)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderRadius: (theme) => theme.shape.borderRadius * 1.5,
            p: { xs: 2, md: 4 },
            px: { xs: 2, md: 6 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
            maxWidth: 1100,
            minHeight: 340,
            mx: 'auto',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '60px',
              pointerEvents: 'none',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 100%)',
              zIndex: 2,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              boxShadow: 'inset 0 1.5px 12px 0 rgba(255,255,255,0.18)',
              pointerEvents: 'none',
              zIndex: 3,
            },
          }}>
            {/* Chart on left, swapping text on right */}
            <Box sx={{ flex: { xs: 'unset', md: '1 1 33%' }, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4 }}>
              <SpiderChart textColor={theme.palette.text.primary} showOnlyChart faction={displayFaction} setFaction={setFaction} setHoveredFaction={setHoveredFaction} />
            </Box>
            <Box sx={{ flex: { xs: 'unset', md: '2 1 67%' }, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4, p: { xs: 2, md: 4 } }}>
              <SwappingFactionText faction={displayFaction} />
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
            <GlassyProjectCard title="Product Development" color="primary" icon={<CategoryIcon />} />
            <GlassyProjectCard title="Engineering Design and Prototyping" color="primary" icon={<DesignServicesIcon />} />
            <GlassyProjectCard title="Marketing/Branding" color="error" icon={<CampaignIcon />} />
            <GlassyProjectCard title="User Research" color="warning" icon={<PersonSearchIcon />} />
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
              // Glassmorphism core styles:
              background: 'rgba(255,255,255,0.18)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: (theme) => theme.shape.borderRadius * 1.5,
              position: 'relative',
              overflow: 'hidden',
              px: 3,
              pt: 6,
              pb: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '60px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 100%)',
                borderRadius: 'inherit',
                pointerEvents: 'none',
                zIndex: 1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                boxShadow: 'inset 0 1.5px 12px 0 rgba(255,255,255,0.18)',
                pointerEvents: 'none',
                zIndex: 1,
              },
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
                  borderRadius: (theme) => theme.shape.borderRadius,
                  boxShadow: `0 0 24px 6px ${theme.palette.primary.main}55`,
                  opacity: 0.5,
                  maskImage: `radial-gradient(circle at ${glowPos.x}px ${glowPos.y}px, white 30%, transparent 70%)`,
                  WebkitMaskImage: `radial-gradient(circle at ${glowPos.x}px ${glowPos.y}px, white 30%, transparent 70%)`,
                  transition: 'mask-image 0.1s, -webkit-mask-image 0.1s',
                }}
              />
            )}
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 300, position: 'absolute', top: 24, left: 24, zIndex: 3 }}>
              About
            </Typography>
            <CardContent sx={{ color: theme.palette.text.secondary, fontWeight: 400, fontSize: 16, position: 'relative', zIndex: 3 }}>
              <Typography paragraph>
                Award Winning Innovator with background in Mechanical Engineer pursued graduate degrees in MBA (Marketing) and Integrated Innovation in Products and Services (MIIPS) from Carnegie Mellon University; This mix of my career and education has given me a unique perspective on human-centered innovation; for more than a decade, I've taken photographs of the night sky, and I've attended photography exhibitions at Lisboa Jubilee Art, Zanjan, etc. My passion for exploring new edges of technology and scientific world never settles in me. Currently, I'm working at CCC Intelligent Solutions as R&D Engineer and willing to explore beyond the horizon.
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
                borderRadius: (theme) => theme.shape.borderRadius,
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
    <PasswordProvider>
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPageLazy />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPageLazy />} />
            <Route path="/previous-work" element={<PreviousWorkPageLazy />} />
            <Route path="/about" element={<AboutPageLazy />} />
            <Route path="/photos" element={<PhotosPageLazy />} />
            <Route path="/photos/astrophotography" element={<AstrophotographyPageLazy />} />
            <Route path="/research" element={<ResearchPageLazy />} />
            <Route path="/resume" element={<PlaceholderPage title="Resume" />} />
            <Route path="/project-outline" element={<ProjectOutlinePageLazy />} />
            <Route path="/swarm" element={
              <Suspense fallback={<PageLoader />}>
                <SwarmPageLazy />
              </Suspense>
            } />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </PasswordProvider>
  );
}