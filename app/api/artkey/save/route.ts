import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { artKeyStore } from '@/lib/artKeyStore';

export async function POST(request: Request) {
  try {
    const { productId, cartItemId, artKeyData } = await request.json();

    // Generate a 32-char URL-safe slug (base62)
    const slug = crypto.randomBytes(24) // 24 bytes -> 48 hex, but we'll map to base62 below
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 32)
      .toLowerCase();

    // In production: insert into SQL (status draft/pending), associate to cart/order.
    // Here: store in-memory as a demo so /api/artkey/[id] and /artkey/[id] can read it.
    artKeyStore.set(slug, {
      id: slug,
      status: 'draft',
      productId,
      cartItemId,
      artKeyData,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      artKeyId: slug,
      message: 'ArtKey saved successfully',
    });
  } catch (error) {
    console.error('Error saving ArtKey:', error);
    return NextResponse.json(
      { error: 'Failed to save ArtKey' },
      { status: 500 }
    );
  }
}

