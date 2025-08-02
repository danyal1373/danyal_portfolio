import projectsData from '../data/projects.json';
import featuredProjectsData from '../data/featured-projects.json';

// Cache for markdown content
const contentCache = new Map();

/**
 * Load markdown content for a project
 * @param {string} contentFile - The markdown file name
 * @returns {Promise<string>} - The markdown content
 */
export const loadProjectContent = async (contentFile) => {
  if (contentCache.has(contentFile)) {
    return contentCache.get(contentFile);
  }

  try {
    // Try multiple paths for different build environments
    let content = null;
    
    // Try public path first (for production builds)
    try {
      const publicResponse = await fetch(`/content/${contentFile}`);
      if (publicResponse.ok) {
        content = await publicResponse.text();
      }
    } catch (e) {
      // Ignore and try next path
    }
    
    // Try src path (for development)
    if (!content) {
      try {
        const srcResponse = await fetch(`/src/data/content/${contentFile}`);
        if (srcResponse.ok) {
          content = await srcResponse.text();
        }
      } catch (e) {
        // Ignore and try next path
      }
    }
    
    // Try direct import as fallback
    if (!content) {
      try {
        const module = await import(`../data/content/${contentFile}`);
        content = module.default;
      } catch (e) {
        // Ignore and try next path
      }
    }
    
    if (content) {
      contentCache.set(contentFile, content);
      return content;
    } else {
      throw new Error(`Content file ${contentFile} not found`);
    }
  } catch (error) {
    console.error('Error loading project content:', error);
    return `# Content Not Available\n\nThis project's detailed content is currently being prepared.\n\n**Error Details:** ${error.message}`;
  }
};

/**
 * Get all projects
 * @returns {Array} - Array of all projects
 */
export const getAllProjects = () => {
  return projectsData;
};

/**
 * Get featured projects only
 * @returns {Array} - Array of featured projects
 */
export const getFeaturedProjects = () => {
  return featuredProjectsData;
};

/**
 * Get projects by category
 * @param {string} category - The category to filter by
 * @returns {Array} - Array of projects in the specified category
 */
export const getProjectsByCategory = (category) => {
  return projectsData.filter(project => project.category === category);
};

/**
 * Get a single project by ID
 * @param {string} id - The project ID
 * @returns {Object|null} - The project object or null if not found
 */
export const getProjectById = (id) => {
  return projectsData.find(project => project.id === id) || null;
};

/**
 * Get projects by tag
 * @param {string} tag - The tag to filter by
 * @returns {Array} - Array of projects with the specified tag
 */
export const getProjectsByTag = (tag) => {
  return projectsData.filter(project => 
    project.tags.some(projectTag => 
      projectTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

/**
 * Search projects by title, description, or tags
 * @param {string} query - The search query
 * @returns {Array} - Array of matching projects
 */
export const searchProjects = (query) => {
  const lowerQuery = query.toLowerCase();
  return projectsData.filter(project => 
    project.title.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Get all unique categories
 * @returns {Array} - Array of unique categories
 */
export const getAllCategories = () => {
  const categories = [...new Set(projectsData.map(project => project.category))];
  return categories.sort();
};

/**
 * Get all unique tags
 * @returns {Array} - Array of unique tags
 */
export const getAllTags = () => {
  const allTags = projectsData.flatMap(project => project.tags);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.sort();
};

/**
 * Get project statistics
 * @returns {Object} - Statistics about projects
 */
export const getProjectStats = () => {
  const totalProjects = projectsData.length;
  const featuredProjects = projectsData.filter(p => p.featured).length;
  const categories = getAllCategories().length;
  const tags = getAllTags().length;
  const years = [...new Set(projectsData.map(p => p.date))].length;

  return {
    totalProjects,
    featuredProjects,
    categories,
    tags,
    years,
    averageDuration: projectsData.reduce((acc, p) => {
      const duration = parseInt(p.duration.split(' ')[0]);
      return acc + duration;
    }, 0) / totalProjects
  };
}; 