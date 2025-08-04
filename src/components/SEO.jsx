import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Danyal Ghanbari - Product Designer & Innovator",
  description = "Award-winning innovator with expertise in mechanical engineering, MBA, and integrated innovation. Product designer passionate about technology, human-centered design, and astrophotography.",
  keywords = "Danyal Ghanbari, Product Designer, Innovation, Mechanical Engineering, MBA, Carnegie Mellon, Astrophotography, Technology, Human-Centered Design",
  image = "/images/profile.jpg",
  url = "",
  type = "website"
}) {
  const fullUrl = url ? `https://danebula.com${url}` : "https://danebula.com";
  const fullImageUrl = image.startsWith('http') ? image : `https://danebula.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Danyal Ghanbari" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Danyal Ghanbari Portfolio" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Danyal Ghanbari",
          "jobTitle": "Product Designer & R&D Engineer",
          "alumniOf": {
            "@type": "Organization",
            "name": "Carnegie Mellon University"
          },
          "worksFor": {
            "@type": "Organization", 
            "name": "CCC Intelligent Solutions"
          },
          "description": "Award-winning innovator with expertise in mechanical engineering, MBA, and integrated innovation.",
          "url": "https://danebula.com",
          "image": "https://danebula.com/images/profile.jpg",
          "sameAs": [
            "https://github.com/danyalghanbari",
            "https://linkedin.com/in/danyalghanbari",
            "https://instagram.com/danyal1373"
          ]
        })}
      </script>
    </Helmet>
  );
} 