import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, Tag, BookOpen } from 'lucide-react';
import { StatIconClient } from '../../../tools/stats-wiki/components/StatIconClient';
import { slugToStatId, statIdToSlug, getTargetStatSlug, getAllStatSlugs, isValidStatId } from '../../../utils/stat-url-utils';
import { getStatInfo } from '../../../tools/build-planner/data/stats-config';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Metadata } from 'next';

// ISR: Revalidate every 30 days (content updates require deployment anyway)
export const revalidate = 2592000;

// Get all available stat slugs for static generation
export async function generateStaticParams() {
  // Get slugs from stats config (this ensures we only generate pages for valid stats)
  const statSlugs = getAllStatSlugs();
  
  // Also check for existing content files to ensure we have content
  const statsDirectory = path.join(process.cwd(), 'content/stats');
  const existingFiles = fs.existsSync(statsDirectory) 
    ? fs.readdirSync(statsDirectory)
        .filter(filename => filename.endsWith('.md') && !filename.startsWith('_'))
        .map(filename => filename.replace('.md', ''))
    : [];
  
  // Only generate params for stats that have both config entry and content file
  return statSlugs
    .filter(slug => {
      const statId = slugToStatId(slug);
      return existingFiles.includes(statId);
    })
    .map(slug => ({ slug }));
}

// Get stat content by slug
async function getStatContent(slug: string) {
  try {
    // Convert kebab-case slug to camelCase stat ID for file lookup
    const statId = slugToStatId(slug);
    
    // Validate that this is a real stat
    if (!isValidStatId(statId)) {
      return null;
    }
    
    const statsDirectory = path.join(process.cwd(), 'content/stats');
    const filePath = path.join(statsDirectory, `${statId}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();
    
    return {
      slug,
      statId,
      frontmatter: data,
      content: contentHtml,
    };
  } catch (error) {
    console.error('Error reading stat content:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const statContent = await getStatContent(slug);
  
  if (!statContent) {
    return {
      title: 'Stat Not Found - Cabal Online Stats Wiki',
      description: 'The requested stat page could not be found.',
    };
  }
  
  const { frontmatter } = statContent;
  const statName = frontmatter.title;
  const category = frontmatter.category;
  const priority = frontmatter.priority;
  
  // Generate SEO-friendly description based on stat info
  const categoryText = category === 'offensive' ? 'offensive' : category === 'defensive' ? 'defensive' : 'utility';
  const priorityText = priority ? ` This ${priority} priority stat` : ' This stat';
  
  // Extract first paragraph from content for description (remove HTML tags)
  const firstParagraph = statContent.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .split('\n')
    .find(line => line.trim().length > 50) // Find first substantial paragraph
    ?.trim()
    .substring(0, 160) || `Learn about ${statName}, an important ${categoryText} stat in Cabal Online.`;
  
  const title = `${statName} - Cabal Online Stats Wiki | Nipperlug`;
  const description = `${firstParagraph}${priorityText} affects your character's performance in Cabal Online. Complete wiki with formulas, tips, and optimization strategies.`;
  const url = `https://nipperlug.com/stats/${slug}`;
  
  return {
    title,
    description,
    keywords: [
      statName,
      'Cabal Online',
      'stats wiki',
      'character stats',
      categoryText + ' stats',
      'build planner',
      'game wiki',
      'MMORPG stats',
      'Nipperlug'
    ],
    authors: [{ name: 'Nipperlug' }],
    creator: 'Nipperlug',
    publisher: 'Nipperlug',
    
    // Open Graph
    openGraph: {
      title,
      description,
      url,
      siteName: 'Nipperlug - Cabal Online Wiki',
      type: 'article',
      images: [
        {
          url: '/images/og-stats-default.jpg', // You can create a default OG image
          width: 1200,
          height: 630,
          alt: `${statName} - Cabal Online Stats Wiki`,
        },
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-stats-default.jpg'],
      creator: '@nipperlug',
    },
    
    // Additional SEO
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Structured data will be handled by JSON-LD in the component
    alternates: {
      canonical: url,
    },
  };
}

const CATEGORY_INFO = {
  offensive: {
    title: 'Attack Stats',
    color: 'text-stat-offensive',
    bgColor: 'bg-stat-offensive-bg',
    borderColor: 'border-stat-offensive',
  },
  defensive: {
    title: 'Defense Stats',
    color: 'text-stat-defensive',
    bgColor: 'bg-stat-defensive-bg',
    borderColor: 'border-stat-defensive',
  },
  utility: {
    title: 'Other Stats',
    color: 'text-stat-utility',
    bgColor: 'bg-stat-utility-bg',
    borderColor: 'border-stat-utility',
  },
};

const PRIORITY_CONFIG = {
  high: {
    label: 'HIGH PRIORITY',
    color: 'text-red-300',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
  },
  medium: {
    label: 'MEDIUM PRIORITY',
    color: 'text-yellow-300',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
  },
  low: {
    label: 'LOW PRIORITY',
    color: 'text-gray-300',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30',
  },
};

export default async function StatPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params before using its properties (Next.js 15 requirement)
  const { slug } = await params;
  const statContent = await getStatContent(slug);
  
  if (!statContent) {
    notFound();
  }
  
  const { frontmatter, content, statId } = statContent;
  const categoryInfo = CATEGORY_INFO[frontmatter.category as keyof typeof CATEGORY_INFO];
  const priorityInfo = PRIORITY_CONFIG[frontmatter.priority as keyof typeof PRIORITY_CONFIG];
  
  // Get stat info to check for variants
  const statInfo = getStatInfo(statId);
  
  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: `Complete wiki entry for ${frontmatter.title} stat in Cabal Online. Learn about this ${frontmatter.category} stat, its mechanics, and optimization strategies.`,
    author: {
      '@type': 'Organization',
      name: 'Nipperlug',
      url: 'https://nipperlug.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nipperlug',
      url: 'https://nipperlug.com'
    },
    datePublished: frontmatter.lastUpdated || '2025-01-08',
    dateModified: frontmatter.lastUpdated || '2025-01-08',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nipperlug.com/stats/${slug}`
    },
    articleSection: 'Game Wiki',
    keywords: [frontmatter.title, 'Cabal Online', 'stats wiki', frontmatter.category + ' stats'].join(', '),
    about: {
      '@type': 'VideoGame',
      name: 'Cabal Online',
      genre: 'MMORPG'
    }
  };
  
  // Extract headings from content for table of contents and add IDs
  let contentWithIds = content;
  const headings = content.match(/<h[2-3][^>]*>.*?<\/h[2-3]>/g)?.map(heading => {
    const level = heading.match(/<h([2-3])/)?.[1] || '2';
    const text = heading.replace(/<[^>]*>/g, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    // Add ID to heading in content
    const headingWithId = heading.replace(/^<h([2-3])/, `<h$1 id="${id}"`);
    contentWithIds = contentWithIds.replace(heading, headingWithId);
    
    return { level: parseInt(level), text, id };
  }) || [];
  
  return (
    <div className="min-h-screen text-foreground">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Enhanced Navigation Bar */}
      <div className="sticky top-0 z-10 bg-theme-darker/95 backdrop-blur-sm border-b border-border-dark">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/stats-wiki" 
                className="inline-flex items-center text-foreground/60 hover:text-game-highlight transition-colors group"
              >
                <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Stats Wiki
              </Link>
              <span className="text-foreground/40">•</span>
              <span className="text-foreground/80 capitalize">{frontmatter.category}</span>
              <span className="text-foreground/40">•</span>
              <span className="text-foreground font-medium">{frontmatter.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Wikipedia-style Sidebar - Left Side */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents - Wikipedia Style */}
              {headings.length > 0 && (
                <div className="bg-component-card border border-border-dark rounded-lg">
                  <div className="bg-theme-darker/50 px-4 py-3 border-b border-border-dark">
                    <h4 className="font-semibold text-foreground text-sm">Contents</h4>
                  </div>
                  <nav className="p-4 space-y-1">
                    {headings.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`block text-sm hover:text-game-highlight transition-colors py-1 ${
                          heading.level === 2 
                            ? 'text-foreground/80 font-medium' 
                            : 'text-foreground/60 ml-4'
                        }`}
                      >
                        <span className="text-foreground/40 mr-2">
                          {heading.level === 2 ? `${index + 1}.` : `${index + 1}.${heading.level - 1}`}
                        </span>
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Wikipedia-style Infobox */}
              <div className="bg-component-card border border-border-dark rounded-lg">
                <div className="bg-theme-darker/50 px-4 py-3 border-b border-border-dark text-center">
                  <h4 className="font-semibold text-foreground text-sm">{frontmatter.title}</h4>
                </div>
                <div className="p-4">
                  {/* Stat Icons - Show base + variants if available */}
                  <div className="flex justify-center mb-4">
                    {statInfo?.variants && statInfo.variants.length > 0 ? (
                      // Show all variants in a row
                      <div className="flex gap-2 items-center">
                        {/* Base stat icon */}
                        <StatIconClient 
                          statId={statId}
                          width={32}
                          height={32}
                        />
                        
                        {/* Variant icons */}
                        {statInfo.variants.map((variant) => {
                          const variantStatId = variant + statId.charAt(0).toUpperCase() + statId.slice(1);
                          return (
                            <StatIconClient 
                              key={variant}
                              statId={variantStatId}
                              width={32}
                              height={32}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      // Single base icon
                      <StatIconClient 
                        statId={statId}
                        width={40}
                        height={40}
                      />
                    )}
                  </div>
                  
                  {/* Info Table */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2">
                      <span className="text-foreground/60">Category</span>
                      <span className={`font-medium capitalize ${
                        frontmatter.category === 'offensive' 
                          ? 'text-stat-offensive' 
                          : frontmatter.category === 'defensive'
                          ? 'text-stat-defensive'
                          : 'text-stat-utility'
                      }`}>
                        {frontmatter.category}
                      </span>
                    </div>
                    
                    {frontmatter.priority && (
                      <div className="flex justify-between py-2">
                        <span className="text-foreground/60">Priority</span>
                        <span className={`font-medium ${priorityInfo?.color}`}>
                          {frontmatter.priority.charAt(0).toUpperCase() + frontmatter.priority.slice(1)}
                        </span>
                      </div>
                    )}
                    
                    {/* Show percentage type */}
                    <div className="flex justify-between py-2">
                      <span className="text-foreground/60">Type</span>
                      <span className="font-medium text-foreground">
                        {(() => {
                          // Primary source: stats-config.ts
                          const isPercentageFromConfig = statInfo?.isPercentage;
                          // Fallback: markdown frontmatter
                          const isPercentageFromMd = frontmatter.isPercentage;
                          // Use config first, then markdown, default to false
                          const isPercentage = isPercentageFromConfig !== undefined 
                            ? isPercentageFromConfig 
                            : isPercentageFromMd !== undefined 
                            ? isPercentageFromMd 
                            : false;
                          
                          return isPercentage ? 'Percentage (%)' : 'Flat Value';
                        })()}
                      </span>
                    </div>
                    
                    {/* Show variants if available */}
                    {statInfo?.variants && statInfo.variants.length > 0 && (
                      <div className="flex justify-between py-2">
                        <span className="text-foreground/60">Variants</span>
                        <span className="font-medium text-game-highlight">
                          {statInfo.variants.map(v => v.toUpperCase()).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Main Content Area - Extended Card Design */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            {/* Unified Article Container */}
            <div className="bg-component-card border border-border-dark rounded-lg">
              {/* Article Header - Now inside the card */}
              <div className="p-8 pb-6 border-b border-border-dark">
                <div className="flex items-center gap-4 mb-4">
                  {/* Stat Icon - Prominently displayed next to title */}
                  <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-theme-darker rounded-lg border border-border-dark">
                    <StatIconClient 
                      statId={statId}
                      width={40}
                      height={40}
                    />
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    {frontmatter.title}
                  </h1>
                </div>
                
                {/* Subtitle badges - minimal and clean */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded border ${
                    frontmatter.category === 'offensive' 
                      ? 'bg-stat-offensive-bg border-stat-offensive/30 text-stat-offensive' 
                      : frontmatter.category === 'defensive'
                      ? 'bg-stat-defensive-bg border-stat-defensive/30 text-stat-defensive'
                      : 'bg-stat-utility-bg border-stat-utility/30 text-stat-utility'
                  }`}>
                    {frontmatter.category.charAt(0).toUpperCase() + frontmatter.category.slice(1)} Stat
                  </div>
                  
                  {priorityInfo && (
                    <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded border ${priorityInfo.bgColor} ${priorityInfo.borderColor} ${priorityInfo.color}`}>
                      {priorityInfo.label.split(' ')[0]} Priority
                    </div>
                  )}
                </div>

                {/* Last Updated */}
                {frontmatter.lastUpdated && (
                  <div className="text-sm text-foreground/60">
                    Last updated: {frontmatter.lastUpdated}
                  </div>
                )}
              </div>

              {/* Main Article Content */}
              <div className="p-8">
              {/* Mobile-only icon display at the top of content */}
              <div className="sm:hidden flex justify-center mb-6">
                <StatIconClient 
                  statId={statId}
                  width={50}
                  height={50}
                />
              </div>
              
              {/* First paragraph with icon float (desktop) */}
              <div className="article-content text-foreground/90 leading-relaxed space-y-4">
                <div 
                  className="article-content text-foreground/90 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: contentWithIds }}
                />
              </div>

                {/* Formula Section */}
                {frontmatter.formula && (
                  <div className="mt-8 bg-theme-darker/50 border border-border-dark rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-game-highlight/20 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-xl text-game-highlight">∑</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-game-highlight mb-1">Formula</h3>
                      </div>
                    </div>
                    <div className="bg-theme-darker border border-border-dark rounded-lg p-4 font-mono text-base overflow-x-auto">
                      <code className="text-game-highlight whitespace-nowrap">
                        {frontmatter.formula}
                      </code>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* See Also Section - List Style with Columns */}
            {frontmatter.related && frontmatter.related.length > 0 && (
              <div className="mt-8 bg-component-card border border-border-dark rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">See also</h3>
                <ul className={`space-y-1 ${frontmatter.related.length > 4 ? 'columns-1 sm:columns-2' : ''}`}>
                  {frontmatter.related.map((relatedStatId: string) => {
                    const relatedSlug = getTargetStatSlug(relatedStatId);
                    return (
                      <li key={relatedStatId} className="break-inside-avoid">
                        <Link
                          href={`/stats/${relatedSlug}`}
                          prefetch={false}
                          className="flex items-center space-x-3 p-2 rounded hover:bg-theme-darker/50 hover:text-game-highlight transition-all group"
                        >
                          <div className="flex-shrink-0">
                            <StatIconClient 
                              statId={relatedStatId}
                              width={24}
                              height={24}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground group-hover:text-game-highlight transition-colors">
                              {relatedStatId.charAt(0).toUpperCase() + relatedStatId.slice(1).replace(/([A-Z])/g, ' $1')}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
