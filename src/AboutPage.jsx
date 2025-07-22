import React from 'react';
import { Box, Typography, Card, Avatar, Chip, Grid, useTheme } from '@mui/material';
import { useGlassmorphism } from './hooks/useGlassmorphism';
import cmuLogo from './assets/cmu.png';
import autLogo from './assets/aut.png';
import sharifLogo from './assets/sharif.png';
import cccLogo from './assets/ccc.png';
import dfsLogo from './assets/dfs.png';
import mtnLogo from './assets/mtn.png';
import akfLogo from './assets/akf.png';
import bmnLogo from './assets/bmn.png';
import starsLogo from './assets/stars.png';
import LifetimeRoadmap from './components/LifetimeRoadmap';
import AnimatedCircle from './components/AnimatedCircle';

const aboutSections = [
  {
    title: "Experience",
    items: [
      {
        logo: "ccc",
        title: "Product Design Strategist",
        subtitle: "CCC Intelligent Solutions",
        description: "Full-time\nChicago, IL, USA",
        date: "May 2023 - Now",
      },
      {
        logo: "dfs",
        title: "Product Marketing Manager",
        subtitle: "DreamFarm Studios",
        description: "Full-time\nTehran, Iran",
        date: "Dec 2021 - Aug 2022",
      },
      {
        logo: "mtn",
        title: "Product Design Strategist Intern",
        subtitle: "MTN Irancell",
        description: "Internship\nTehran, Iran",
        date: "Dec 2018 - March 2019",
      },
    ],
  },
  {
    title: "Education",
    items: [
      {
        logo: "cmu",
        title: "Integrated Innovation for Products and Services (MIIPS)",
        subtitle: "Carnegie Mellon University",
        description: "Master's Degree\nCapstone Project - Ignik Outdoors",
        date: "2022 - 2023",
      },
      {
        logo: "aut",
        title: "Master in Business Administration (MBA) - Marketing",
        subtitle: "Amirkabir University (Tehran Polytechnique)",
        description: "Master of Science\nFocus on Branding and Advertising",
        date: "2018 - 2020",
      },
      {
        logo: "sharif",
        title: "Mechanical Engineering",
        subtitle: "Sharif University of Technology",
        description: "Bachelor of Science\nThesis - Magnetic Micro Robot with Visual Control System",
        date: "2012 - 2017",
      },
    ],
  },
  {
    title: "Honors",
    items: [
      {
        logo: "akf",
        title: "Award Winner",
        subtitle: "Aga Khan Foundation",
        description: "Won Aga Khan Foundation’s Scholarship Award for Pursuing\n Studies in Carnegie Mellon University",
        date: "2021",
      },
      {
        logo: "bmn",
        title: "Second Place",
        subtitle: "Bonyad Melli Nokhbegan",
        description: "Awarded Silver Medal in the\n 7th National Olympiad of Astronomy and Astrophysics",
        date: "2011",
      },
      {
        logo: "stars",
        title: "Second Place",
        subtitle: "Starts Competition",
        description: "Second place in the STARS competition at CMU's Tepper School of Business\n for proposing an energy solution aimed at facilitating moon colonization",
        date: "2022",
      },
    ],
  },
];

const skills = [
  'Figma', 'Miro', 'Notion', 'Photoshop', 'Illustrator', 'React', 'Vue', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'User Research', 'Wireframing', 'Prototyping', 'Branding', 'Design Systems', 'Leadership', 'Teamwork', 'Communication', 'Problem Solving', 'Agile', 'Scrum', 'Adobe AfterEffects', 'SolidWorks', 'G CODE', 'Siemens NX', 'Lightroom', 'Visual Storytelling','Astrophotography','Power BI','R','Python','MATLAB','NET LOGO','Internet of Things','Data Analysis','Data Visualization', 'Julia (In progress)', 'AI/ML (PyTorch, TensorFlow, Scikit-learn, etc.)', 'SQL', 'NoSQL', 'GitHub', 'Docker', 'K8s', 'Architecture Visualization','Network','CloudFlare','Linux','Digital Marketing Strategy','Product Photography', 'Rendering','Competitive Analysis','Negotiation','Design Thinking','Rapid Prototyping','Manufacturing Processes', 'Material Selection','Interface Design'
];

const aboutText = `I'm a Product Innovator with concentration in Mechanical Engineering with graduate studies in Marketing; I'm an alumni of Carnegie Mellon University in human-centered innovation; for more than a decade, I've taken photographs of the night sky, and I've attended photography exhibitions at Lisboa Jubilee Art, Zanjan, etc. My passion for exploring the scientific world never settles down. My Metaphysics for innovation is to be the bridge between Scientist and Technologists to bring what's next to the market. Currently, I'm working at CCC Intelligent Solutions to expand my knowledge and skillset by applying what I've learned into practice and am open to the new experiences in edge deep tech space (Interplanetary Travel, Battery Systems, Quantum Computing)`;

const logoMap = {
  cmu: cmuLogo,
  aut: autLogo,
  sharif: sharifLogo,
  ccc: cccLogo,
  dfs: dfsLogo,
  mtn: mtnLogo,
  akf: akfLogo,
  bmn: bmnLogo,
  stars: starsLogo,
};

function AboutCard({ logo, title, subtitle, description, date }) {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  const noisyBackgroundStyle = {
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')`,
      opacity: theme.palette.mode === 'dark' ? 0.05 : 0.1,
      pointerEvents: 'none',
      zIndex: 0,
    },
  };
  // Use imported image if available, fallback to initials
  const imageSrc = logoMap[logo];
  return (
    <Card
      sx={{
        ...glassmorphism.base,
        ...glassmorphism.withHighlights,
        ...glassmorphism.hover,
        ...noisyBackgroundStyle,
        display: 'flex',
        alignItems: 'center',
        p: { xs: 2, md: 3 },
        borderRadius: theme.shape.borderRadius,
        boxShadow: 'none',
        width: '100%',
        minHeight: 90,
        position: 'relative',
        overflow: 'hidden',
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: '100%',
          aspectRatio: '1 / 1',
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={logo}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ) : (
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: theme.typography.h2.fontWeight }}>
            {subtitle ? subtitle[0] : '?'}
          </Typography>
        )}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, fontWeight: theme.typography.body1.fontWeight, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: theme.typography.h6.fontWeight, mb: 0.5, fontSize: theme.typography.h6.fontSize, lineHeight: theme.typography.h6.lineHeight, whiteSpace: 'pre-line' }}>
          {subtitle}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: theme.typography.body2.fontWeight, fontSize: theme.typography.body2.fontSize, whiteSpace: 'pre-line' }}>
          {description}
        </Typography>
      </Box>
      <Chip
        label={date}
        size="small"
        sx={{
          ml: 2,
          bgcolor: theme.palette.divider,
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.h6.fontWeight,
          fontSize: theme.typography.body2.fontSize,
          borderRadius: 2,
          height: 28,
          minWidth: 90,
          display: 'flex',
          alignItems: 'center',
        }}
      />
    </Card>
  );
}

export default function AboutPage() {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  return (
    <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      {/* --- FIXED BACKGROUND --- */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}>
        <AnimatedCircle color="#D11B28" size={800} frequency={0.22} phase={0} style={{ top: '50%', left: '55%' }} />
        <AnimatedCircle color="#ECB145" size={800} frequency={0.25} phase={1.2} style={{ top: '50%', left: '60%' }} />
        <AnimatedCircle color="#21A6C0" size={800} frequency={0.21} phase={2.1} style={{ top: '50%', left: '50%' }} />
      </Box>
      {/* Header Section */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', width: '100%' }}>
        <Typography 
          variant="h1"
                      sx={{ 
              color: theme.palette.text.primary, 
              mb: 4, 
              mt: 2, 
              fontWeight: theme.typography.h1.fontWeight,
              fontSize: { xs: '2.5rem', md: '5rem' },
              textAlign: 'right'
            }}
        >
          About
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4, mb: 4 }}>
          <Box sx={{ flex: 2 }}>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
              {aboutText}
            </Typography>
          </Box>
          <Box sx={{ flex: 0, display: 'flex-end', justifyContent: 'center' }}>
            <Box
              component="img"
              src={require('./assets/danyal-head.jpeg')}
              alt="Danyal Ghanbari"
              sx={{ 
                width: 140, 
                height: 180, 
                objectFit: 'cover',
                borderRadius: theme.shape.borderRadius,
                boxShadow: '0 4px 30px rgba(0,0,0,0.10)',
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ maxWidth: 1100, mx: 'auto', width: '100%' }}>
        {aboutSections.map(section => (
          <Box key={section.title} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary, fontWeight: theme.typography.h6.fontWeight }}>{section.title}</Typography>
            {section.items.map((item, idx) => (
              <AboutCard key={idx} {...item} />
            ))}
          </Box>
        ))}
        {/* Skills Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, mb: 3, fontWeight: theme.typography.body1.fontWeight }}>
            Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skills.map((skill, index) => (
              <Box
                key={index}
                sx={{
                  ...glassmorphism.base,
                  ...glassmorphism.withHighlights,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=\\"0 0 512 512\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.8\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E')`,
                    opacity: theme.palette.mode === 'dark' ? 0.05 : 0.1,
                    pointerEvents: 'none',
                    zIndex: 0,
                  },
                  color: theme.palette.text.secondary,
                  px: 2,
                  py: 1,
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid ${theme.palette.divider}`,
                  fontSize: theme.typography.body2.fontSize,
                  fontWeight: theme.typography.body1.fontWeight,
                  display: 'inline-block',
                  mb: 1,
                }}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
        {/* Lifetime Roadmap Section */}
        <LifetimeRoadmap />
      </Box>
    </Box>
  );
} 
