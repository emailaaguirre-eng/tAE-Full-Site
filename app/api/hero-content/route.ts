import { getHeroContent } from '@/lib/wordpress';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const heroContent = await getHeroContent();
    return NextResponse.json(heroContent);
  } catch (error) {
    console.error('Error fetching hero content:', error);
    // Return defaults if error
    return NextResponse.json({
      headline1: 'Art just Got',
      headline2: 'Personal',
      subtitle: 'Where fine art, prints & images\nmeet your personal expression.',
      description: 'Upload an image or browse our gallery.\nArtKey brings your vision to life.',
    });
  }
}

