const fs = require('fs');
const path = require('path');

// Define your routes and their metadata
const routes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/projects',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/research',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/photos',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/photos/astrophotography',
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/photos/landscape',
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/photos/industrial',
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/resume',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Generate sitemap XML
function generateSitemap() {
  const domain = 'https://danebula.com'; // Replace with your actual domain
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${domain}${route.path}</loc>\n`;
    sitemap += `    <lastmod>${route.lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${route.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  return sitemap;
}

// Write sitemap to public folder
const sitemapContent = generateSitemap();
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(sitemapPath, sitemapContent);
console.log('✅ Sitemap generated successfully at:', sitemapPath); 