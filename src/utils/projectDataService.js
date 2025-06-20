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
    const response = await fetch(`/src/data/content/${contentFile}`);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.statusText}`);
    }
    const content = await response.text();
    contentCache.set(contentFile, content);
    return content;
  } catch (error) {
    console.error('Error loading project content:', error);
    return `# Content Not Available\n\nThis project's detailed content is currently being prepared.`;
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