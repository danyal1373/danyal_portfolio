# Content Management Guide

## Overview
This project uses a JSON + Markdown content management system for easy project content management without requiring a backend or database. It also includes password protection for sensitive projects using a single global password.

## 📁 File Structure

```
src/
├── data/
│   ├── projects.json              # All projects metadata
│   ├── featured-projects.json     # Featured projects only
│   └── content/
│       ├── ignik-outdoors.md      # Project content files
│       ├── smart-home-ecosystem.md
│       └── ...
public/
└── images/
    └── projects/                  # Project images
        ├── ignik-outdoors-hero.jpg
        ├── smart-home-thumb.jpg
        └── ...
```

## 📝 Adding a New Project

### 1. Add Project Metadata to `src/data/projects.json`

```json
{
  "id": "your-project-id",
  "title": "Your Project Title",
  "subtitle": "Project Subtitle",
  "description": "Brief project description",
  "image": "/images/projects/your-project-thumb.jpg",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "category": "Product Development",
  "featured": false,
  "date": "2024",
  "client": "Client Name",
  "role": "Your Role",
  "duration": "6 months",
  "contentFile": "your-project.md",
  "passwordProtected": false
}
```

### 2. Add Featured Project (if applicable) to `src/data/featured-projects.json`

```json
{
  "id": "your-project-id",
  "title": "Your Project Title",
  "subtitle": "Project Subtitle",
  "description": "Brief project description",
  "image": "/images/projects/your-project-hero.jpg",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "category": "Product Development",
  "featured": true,
  "date": "2024",
  "client": "Client Name",
  "role": "Your Role",
  "duration": "6 months",
  "contentFile": "your-project.md",
  "passwordProtected": false
}
```

### 3. Create Markdown Content File

Create `src/data/content/your-project.md`:

```markdown
# Your Project Title

## Project Overview

Brief overview of your project...

## The Challenge

What problem were you solving?

## Our Solution

How did you approach the problem?

## Design Process

### Research Phase
- What research did you conduct?
- What insights did you discover?

### Ideation & Prototyping
- How did you develop concepts?
- What prototypes did you create?

### Testing & Validation
- How did you test your solution?
- What feedback did you receive?

## Key Features

### Feature 1
- Description of feature 1
- Benefits and impact

### Feature 2
- Description of feature 2
- Benefits and impact

## Technical Specifications

- **Spec 1**: Value
- **Spec 2**: Value
- **Spec 3**: Value

## Results & Impact

### Metrics
- Key performance indicators
- User satisfaction scores
- Business impact

### User Feedback
- Testimonials
- User quotes
- Success stories

## Lessons Learned

What did you learn from this project?

## Future Development

What's next for this project?

---

*Brief reflection on the project's significance.*
```

### 4. Add Project Images

Place your project images in `public/images/projects/`:
- `your-project-thumb.jpg` - Thumbnail for project grid (400x300px)
- `your-project-hero.jpg` - Hero image for featured projects (800x400px)

## 🔐 Password Protection

### Enabling Password Protection

To make a project password-protected, simply set the `passwordProtected` field to `true`:

```json
{
  "id": "your-project-id",
  "title": "Your Project Title",
  // ... other fields ...
  "passwordProtected": true
}
```

### Global Password System

The portfolio uses a single global password for all protected projects:
- **Password**: `portfolio2024`
- **Location**: Defined in `src/contexts/PasswordContext.js`
- **Scope**: Unlocks access to all protected projects

### Password Protection Features

- **Visual Indicators**: Lock icons and "Protected" badges on project cards
- **Access Control**: Content is hidden until correct password is entered
- **Session Persistence**: Unlocked projects stay accessible during browser session
- **Local Storage**: Unlock status is saved in browser localStorage
- **Manual Locking**: Users can manually lock the entire portfolio

### Protected Projects

The system includes several sample protected projects:
- **Eco Transport App**
- **Healthcare Dashboard**
- **AR Navigation System**
- **Smart Fitness Tracker**
- **Smart City Infrastructure**

### Security Considerations

- The global password is hardcoded in the source code (not recommended for production)
- Consider using environment variables or a more secure method for sensitive projects
- Password status is cached in localStorage for convenience
- Users can clear all unlocks using browser developer tools

## 🎨 Available Categories

- **Product Development**
- **Engineering Design**
- **User Research**
- **Marketing/Branding**

## 🏷️ Tag Guidelines

Use relevant tags to help users find your projects:
- **Technology**: React, IoT, AR, AI, etc.
- **Domain**: Healthcare, Sustainability, Education, etc.
- **Skills**: UX Design, Hardware, Mobile App, etc.

## 📊 Project Statistics

The system automatically generates statistics:
- Total projects count
- Featured projects count
- Categories count
- Tags count
- Average project duration

## 🔧 Advanced Features

### Search Functionality
Projects can be searched by:
- Title
- Description
- Tags

### Filtering
Projects can be filtered by:
- Category
- Tags
- Featured status

### Content Caching
Markdown content is cached for better performance.

### Password Management
- Automatic unlock detection
- Persistent session storage
- Manual portfolio locking
- Visual status indicators

## 🚀 Best Practices

### Writing Content
1. **Be Specific**: Include concrete details and metrics
2. **Tell a Story**: Structure content as a narrative
3. **Use Visual Hierarchy**: Use headers, lists, and formatting
4. **Include Images**: Add relevant screenshots and diagrams
5. **Show Process**: Document your design/development process

### Image Guidelines
1. **Optimize Images**: Compress for web (max 500KB)
2. **Consistent Sizing**: Use standard dimensions
3. **Descriptive Names**: Use clear, descriptive filenames
4. **Alt Text**: Images will have fallback placeholders

### Metadata Guidelines
1. **Unique IDs**: Use kebab-case for project IDs
2. **Descriptive Titles**: Make titles clear and compelling
3. **Relevant Tags**: Use 3-5 relevant tags per project
4. **Accurate Dates**: Use consistent date format (YYYY)

### Password Security
1. **Strong Password**: Use a complex, unique global password
2. **Limited Sharing**: Only share password with intended recipients
3. **Regular Updates**: Change password periodically
4. **Secure Storage**: Consider more secure storage methods for production

## 🔄 Updating Content

### Quick Edits
- **Metadata**: Edit JSON files directly
- **Content**: Edit markdown files
- **Images**: Replace files in `public/images/projects/`
- **Global Password**: Update password in `PasswordContext.js`

### Content Validation
The system includes error handling for:
- Missing images (shows placeholder)
- Missing content files (shows default message)
- Invalid JSON (graceful fallback)
- Incorrect passwords (shows error message)

## 📱 Responsive Design

All content automatically adapts to:
- Desktop (1100px max width)
- Tablet (responsive grid)
- Mobile (stacked layout)

## 🎯 SEO Benefits

- **Structured Data**: JSON metadata for search engines
- **Semantic HTML**: Proper heading hierarchy
- **Fast Loading**: Static content with caching
- **Clean URLs**: SEO-friendly project URLs

## 🛠️ Technical Details

### Data Service Functions
```javascript
import { 
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  getProjectsByCategory,
  getProjectsByTag,
  searchProjects,
  loadProjectContent
} from './utils/projectDataService';
```

### Password Context Functions
```javascript
import { 
  usePassword,
  unlockPortfolio,
  lockPortfolio,
  isProjectUnlocked,
  verifyPassword,
  clearUnlock
} from './contexts/PasswordContext';
```

### Markdown Features
- **GitHub Flavored Markdown**: Tables, strikethrough, etc.
- **Custom Styling**: Theme-aware typography
- **Code Highlighting**: Syntax highlighting for code blocks
- **Responsive Images**: Auto-scaling images

### Password Protection Features
- **Context Provider**: Global password state management
- **Local Storage**: Persistent unlock status
- **Visual Feedback**: Lock icons and status indicators
- **Error Handling**: Graceful password validation

This system provides a powerful, maintainable way to manage your portfolio content while keeping the codebase simple and performant, with the added security of a global password protection system for sensitive projects! 