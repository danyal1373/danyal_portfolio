import React from 'react';
import { Box, Typography, Card, Avatar, Chip, Grid, Button, useTheme } from '@mui/material';

const aboutText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.`;

const experiences = [
  {
    company: 'CCC',
    logo: '',
    role: 'Product Designer',
    duration: '2021 - Present',
    description: 'Worked on various projects related to product design, UX, and prototyping. Led a team of designers and engineers to deliver high-quality products.',
    skills: ['UX', 'UI', 'Prototyping', 'Leadership'],
  },
  {
    company: 'Square',
    logo: '',
    role: 'Design Engineer',
    duration: '2019 - 2021',
    description: 'Collaborated with cross-functional teams to design and implement new features. Focused on user research and iterative design.',
    skills: ['React', 'User Research', 'Iteration'],
  },
  {
    company: 'Acme Corp',
    logo: '',
    role: 'UX Researcher',
    duration: '2017 - 2019',
    description: 'Conducted user interviews and usability tests. Synthesized findings into actionable insights for the product team.',
    skills: ['Research', 'Interviews', 'Usability'],
  },
  {
    company: 'Design Studio',
    logo: '',
    role: 'Visual Designer',
    duration: '2015 - 2017',
    description: 'Created visual assets and branding for clients. Developed design systems and style guides.',
    skills: ['Branding', 'Design Systems', 'Illustration'],
  },
];

const skills = [
  'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'React', 'Vue', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'User Research', 'Wireframing', 'Prototyping', 'Branding', 'Design Systems', 'Leadership', 'Teamwork', 'Communication', 'Problem Solving', 'Agile', 'Scrum', 'Jira', 'Confluence', 'Notion',
];

export default function AboutPage() {
  const theme = useTheme();
  return (
    <Box sx={{ background: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      {/* Header Section */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4 }}>
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.primary, fontWeight: 500 }}>
            About
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            {aboutText}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Box sx={{ 
            width: 140, 
            height: 180, 
            bgcolor: theme.palette.divider, 
            borderRadius: theme.shape.borderRadius 
          }} />
        </Box>
      </Box>
      {/* Experience Section */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary, fontWeight: 500 }}>Experience</Typography>
        <Grid container spacing={2}>
          {experiences.map((exp, idx) => (
            <Grid item xs={12} key={idx}>
              <Card sx={{ display: 'flex', alignItems: 'flex-start', p: 2, bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, boxShadow: 1 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: theme.palette.divider, mr: 2 }}>{exp.company[0]}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>{exp.company}</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 400 }}>{exp.role} &bull; {exp.duration}</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>{exp.description}</Typography>
                  <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {exp.skills.map(skill => (
                      <Chip key={skill} label={skill} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Box>
                <Button variant="text" size="small" sx={{ ml: 2, color: theme.palette.primary.main }}>View</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Skills Section */}
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Typography variant="h5" sx={{ color: theme.palette.text.secondary, mb: 3, fontWeight: 400 }}>
          Skills
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1 
        }}>
          {skills.map((skill, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                bgcolor: theme.palette.background.paper,
                px: 2,
                py: 1,
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              {skill}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
} 