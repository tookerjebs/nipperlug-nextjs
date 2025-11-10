import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { getAllStatSlugs, slugToStatId } from '@/utils/stat-url-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nipperlug.com';
  const currentDate = new Date().toISOString();
  
  const urls: MetadataRoute.Sitemap = [];

  // Static pages with high priority
  urls.push(
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/build-planner`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    }
  );

  // Main tool pages
  const mainTools = [
    'monster-database',
    'tier-lists',
    'stats-wiki',
    'collection-tracker',
    'myth-level-data',
    'calculators',
    'exp-calculator',
    'exp-calculators',
    'force-wing-calculator',
    'oxp-calculator',
    'myth-exp-calculator',
    'extreme-upgrade-calculator',
    'chloe-craft-profit-calculator',
    'devils-shop-calculator',
    'chloe-amity-calculator',
    'event-pass-calculator',
    'bm3-target-damage-boost'
  ];

  mainTools.forEach(tool => {
    urls.push({
      url: `${baseUrl}/${tool}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: tool === 'monster-database' || tool === 'tier-lists' || tool === 'stats-wiki' || tool === 'collection-tracker' || tool === 'myth-level-data' ? 0.8 : 0.7,
    });
  });

  // Dynamic stats pages - only include stats that have actual content files
  try {
    const statsDirectory = path.join(process.cwd(), 'content/stats');
    
    if (fs.existsSync(statsDirectory)) {
      const contentFiles = fs.readdirSync(statsDirectory)
        .filter(filename => 
          filename.endsWith('.md') && 
          !filename.startsWith('_') && 
          !filename.startsWith('DAMAGE_CALCULATION_EXPLAINED')
        )
        .map(filename => filename.replace('.md', ''));

      // Get all valid stat slugs from config
      const validStatSlugs = getAllStatSlugs();
      
      // Only include stats that have both config entry AND content file
      const availableStatSlugs = validStatSlugs.filter(slug => {
        const statId = slugToStatId(slug);
        return contentFiles.includes(statId);
      });

      // Add each available stat page
      availableStatSlugs.forEach(slug => {
        urls.push({
          url: `${baseUrl}/stats/${slug}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });

      console.log(`Generated sitemap with ${availableStatSlugs.length} stat pages`);
      console.log('Available stat pages:', availableStatSlugs.sort());
    }
  } catch (error) {
    console.error('Error generating stats sitemap entries:', error);
  }

  // Additional tool pages
  const additionalTools = [
    'event-mobs-location',
    'penetration-effectiveness-table',
    'resources'
  ];

  additionalTools.forEach(tool => {
    urls.push({
      url: `${baseUrl}/${tool}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // Footer pages
  const footerPages = [
    'credits',
    'legal'
  ];

  footerPages.forEach(page => {
    urls.push({
      url: `${baseUrl}/${page}`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  });

  console.log(`Total sitemap entries: ${urls.length}`);
  return urls;
}