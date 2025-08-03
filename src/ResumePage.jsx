import React from 'react';
import { Box, Typography, Card, Chip, Link, useTheme, Grid } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DownloadIcon from '@mui/icons-material/Download';
import { useGlassmorphism } from './hooks/useGlassmorphism';
import AnimatedCircle from './components/AnimatedCircle';

const resumeSections = [
  {
    title: "Experience",
    items: [
      {
        role: "R&D Engineer",
        company: "CCC Intelligent Solutions",
        period: "May 2023 - Present",
        description: "Leading product development initiatives and research projects in insurance technology.",
        tags: ["Product Development", "Product Design", "Product Management"]
      },
      {
        role: "Marketing Specialist",
        company: "DreamFarm Studios",
        period: "Dec 2021 - Aug 2022",
        description: "Worked on user-centered design projects and product strategy development.",
        tags: ["Campaign Design", "Strategy", "Marketing"]
      },
      {
        role: "Digital Marketing Intern",
        company: "MTN Irancell",
        period: "Dec 2018 - Mar 2019",
        description: "Contributed to Ad Campaign Design and management.",
        tags: ["Ad Campaign Design", "Marketing", "Telecommunications"]
      }
    ]
  },
  {
    title: "Education",
    items: [
      {
        role: "Master of Integrated Innovation for Products and Services",
        company: "Carnegie Mellon University",
        period: "2022 - 2024",
        description: "Focused on human-centered innovation and product development methodologies.",
        tags: ["Innovation", "Product Management", "Human-Centered Design"]
      },
      {
        role: "Master of Business Administration (MBA) - Marketing",
        company: "Amirkabir University (Tehran Polytechnique)",
        period: "2018 - 2020",
        description: "Specialized in marketing and branding.",
        tags: ["Marketing", "Business Strategy", "Management"]
      },
      {
        role: "Bachelor of Mechanical Engineering",
        company: "Sharif University of Technology",
        period: "2012 - 2017",
        description: "Foundation in engineering principles with a focus on Control Systems.",
        tags: ["Mechanical Engineering", "Control Systems", "Technical Design"]
      }
    ]
  },
  {
    title: "Honors & Awards",
    items: [
      {
        role: "Second Place",
        company: "Starts Competition",
        period: "2023",
        description: "Secured second place in Tepper School's design competition for Moon Colonization Energy Solution.",
        tags: ["STARS", "Design", "Competition"]
      },
      {
        role: "Award Winner",
        company: "AKF Scholarship Award",
        period: "2021",
        description: "Granted Scholarship for studying at CMU in MIIPS program.",
        tags: ["Innovation", "Design", "Recognition"]
      },
      {
        role: "Silver Medal",
        company: "Bonyad Melli Nokhbegan",
        period: "2011",
        description: "Achieved second place in national olympiad of astronomy and astrophysiscs.",
        tags: ["Olympiad", "Astronomy and Astrophysics", "National Recognition"]
      },
      
    ]
  }
];

const skills = {
  "Creative/Design Tools": ["Figma", "Solidworks", "After Effects", "Premier Pro", "Photoshop", "Illustrator"],
  "Programming": ["Python", "C++", "C", "Docker", "React", "Vue", "HTML", "CSS", "JavaScript", "TypeScript"],
  "System Design": ["NetLogo", "Ansys", "Abaqus", "Comsol", "Magnet Design", "Econometrics", "Macro Modeling", "BWM Analysis"],
  "Design Skills": ["User Research", "Wireframing", "Prototyping", "Branding", "Design Systems"],
  "Soft Skills": ["Leadership", "Teamwork", "Communication", "Problem Solving", "Time Negotiation", "Dynamic Capabilities", "Creativity"],
  "Project Management": ["Agile", "Scrum", "Notion", "Trello", "Monday.com", "Team Collaboration","Accounting", "Financial Analysis"]
};

export default function ResumePage() {
  const theme = useTheme();
  const glassmorphism = useGlassmorphism();
  const noisyBackgroundStyle = {
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
  };

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
      
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 4 }}>
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
          Resume
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
          Award-winning innovator with a unique blend of mechanical engineering, business administration, and integrated innovation expertise. Passionate about human-centered design and pushing the boundaries of technology.
        </Typography>

        {/* Download Resume Card */}
        <Card 
          component="a"
          href="/Resume_FTJ- V4.pdf"
          download="Danyal_Ghanbari_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            ...glassmorphism.base,
            ...glassmorphism.withHighlights,
            ...glassmorphism.hover,
            ...noisyBackgroundStyle,
            mb: 6, 
            borderRadius: theme.shape.borderRadius, 
            boxShadow: 0, 
            p: 3, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            cursor: 'pointer',
            textDecoration: 'none',
            '&:hover': {
              ...glassmorphism.hover['&:hover'],
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: theme.typography.h6.fontWeight, mb: 1 }}>
              Download Full Resume
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Get the complete PDF version of my resume
            </Typography>
          </Box>
          <DownloadIcon sx={{ fontSize: 32, color: theme.palette.error.main }} />
        </Card>

        {/* Skills Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: theme.typography.body1.fontWeight, mb: 3 }}>
            Skills
          </Typography>
          <Grid container spacing={3}>
            {Object.entries(skills).map(([category, skillList]) => (
              <Grid item xs={12} md={6} key={category}>
                <Card sx={{ 
                  ...glassmorphism.base,
                  ...glassmorphism.withHighlights,
                  ...glassmorphism.hover,
                  ...noisyBackgroundStyle,
                  p: 3, 
                  borderRadius: theme.shape.borderRadius, 
                  boxShadow: 0 
                }}>
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: theme.typography.h6.fontWeight, mb: 2 }}>
                    {category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skillList.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        sx={{
                          ...glassmorphism.base,
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'text.secondary',
                        }}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Experience, Education, and Honors Sections */}
        {resumeSections.map((section, sectionIndex) => (
          <Box key={section.title} sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: theme.typography.body1.fontWeight, mb: 3 }}>
              {section.title}
            </Typography>
            <Grid container spacing={2}>
              {section.items.map((item, itemIndex) => (
                <Grid item xs={12} key={itemIndex}>
                  <Card sx={{ 
                    ...glassmorphism.base,
                    ...glassmorphism.withHighlights,
                    ...glassmorphism.hover,
                    ...noisyBackgroundStyle,
                    p: 3, 
                    borderRadius: theme.shape.borderRadius, 
                    boxShadow: 0,
                    position: 'relative'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: theme.typography.body1.fontWeight, mb: 0.5 }}>
                          {item.role}
                        </Typography>
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: theme.typography.h6.fontWeight, mb: 0.5 }}>
                          {item.company}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: theme.typography.body2.fontSize }}>
                          {item.description}
                        </Typography>
                      </Box>
                      <Chip 
                        label={item.period} 
                        size="small" 
                        sx={{ 
                          bgcolor: theme.palette.divider, 
                          color: theme.palette.text.secondary, 
                          fontWeight: theme.typography.h6.fontWeight,
                          ml: 2,
                          flexShrink: 0
                        }} 
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {item.tags.map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          size="small"
                          sx={{
                            ...glassmorphism.base,
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'text.secondary',
                            fontSize: '0.75rem'
                          }}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
} 
