/**
 * WordPress REST API Integration
 * Fetches content from WordPress headless CMS
 * 
 * Use this to pull blog posts, pages, media, and other content
 * from your WordPress site into Next.js
 */

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;

/**
 * Fetch WordPress posts (blog posts)
 * @param limit - Number of posts to fetch (default: 10)
 * @param category - Optional category ID or slug
 */
export async function getPosts(limit = 10, category?: string | number) {
  try {
    let url = `${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=${limit}`;
    
    if (category) {
      url += `&categories=${category}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Get single post by slug
 */
export async function getPost(slug: string) {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

/**
 * Fetch WordPress pages
 */
export async function getPages() {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/pages?_embed`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch pages');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

/**
 * Get single page by slug
 */
export async function getPage(slug: string) {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/pages?slug=${slug}&_embed`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }

    const pages = await response.json();
    return pages[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

/**
 * Fetch media (images) from WordPress by ID
 */
export async function getMedia(mediaId: number) {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/media/${mediaId}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch media');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

/**
 * Get featured image from post/page
 */
export function getFeaturedImage(post: any) {
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return {
      url: post._embedded['wp:featuredmedia'][0].source_url,
      alt: post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered,
      width: post._embedded['wp:featuredmedia'][0].media_details?.width,
      height: post._embedded['wp:featuredmedia'][0].media_details?.height,
    };
  }
  return null;
}

/**
 * Search WordPress content
 */
export async function searchContent(query: string) {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/search?search=${encodeURIComponent(query)}&per_page=10`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search content');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
}

/**
 * Get WordPress categories
 */
export async function getCategories() {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/categories`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get custom post types (if you have custom post types in WordPress)
 * Example: ArtKey configurations, CoCreators profiles
 */
export async function getCustomPosts(postType: string, limit = 10) {
  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/${postType}?per_page=${limit}&_embed`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${postType}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${postType}:`, error);
    return [];
  }
}

/**
 * Fetch WooCommerce products
 * Uses the public Store API (wc/store/v1) which doesn't require authentication
 * @param limit - Number of products to fetch (default: 20)
 * @param category - Optional category ID or slug
 * @param featured - Fetch only featured products
 */
export async function getWooCommerceProducts(limit = 20, category?: string | number, featured = false) {
  try {
    const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://theartfulexperience.com';
    
    // Use public Store API (no authentication required)
    let url = `${WP_URL}/wp-json/wc/store/v1/products?per_page=${limit}`;
    
    if (category) {
      url += `&category=${category}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('WooCommerce Store API error:', response.status, response.statusText);
      // If Store API fails, try the regular REST API endpoint
      const fallbackUrl = `${WP_URL}/wp-json/wp/v2/product?per_page=${limit}`;
      const fallbackResponse = await fetch(fallbackUrl, {
        next: { revalidate: 3600 },
      });
      
      if (fallbackResponse.ok) {
        return await fallbackResponse.json();
      }
      
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    
    // Filter featured products if requested
    if (featured && Array.isArray(data)) {
      return data.filter((product: any) => product.featured === true);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error);
    return [];
  }
}

/**
 * Get single WooCommerce product by ID or slug
 */
export async function getWooCommerceProduct(idOrSlug: string | number) {
  try {
    const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'https://theartfulexperience.com';
    
    const response = await fetch(
      `${WP_URL}/wp-json/wc/store/v1/products/${idOrSlug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching WooCommerce product:', error);
    return null;
  }
}

/**
 * Get hero section content from WordPress
 * Fetches from a WordPress page with slug "home-settings" or uses default values
 */
export async function getHeroContent() {
  try {
    // Try to fetch from a WordPress page called "Home Settings"
    const page = await getPage('home-settings');
    
    if (page) {
      // If page exists, extract content from custom fields or page content
      // You can use ACF (Advanced Custom Fields) or page content
      return {
        headline1: page.acf?.hero_headline_1 || page.acf?.headline_1 || 'Art just Got',
        headline2: page.acf?.hero_headline_2 || page.acf?.headline_2 || 'Personal',
        subtitle: page.acf?.hero_subtitle || page.acf?.subtitle || 'Where fine art, prints & images\nmeet your personal expression.',
        description: page.acf?.hero_description || page.acf?.description || 'Upload an image or browse our gallery.\nArtKey brings your vision to life.',
      };
    }
    
    // Fallback: Try to get from site options (requires authentication)
    // For now, return defaults
    return {
      headline1: 'Art just Got',
      headline2: 'Personal',
      subtitle: 'Where fine art, prints & images\nmeet your personal expression.',
      description: 'Upload an image or browse our gallery.\nArtKey brings your vision to life.',
    };
  } catch (error) {
    console.error('Error fetching hero content:', error);
    // Return defaults if WordPress is unavailable
    return {
      headline1: 'Art just Got',
      headline2: 'Personal',
      subtitle: 'Where fine art, prints & images\nmeet your personal expression.',
      description: 'Upload an image or browse our gallery.\nArtKey brings your vision to life.',
    };
  }
}

