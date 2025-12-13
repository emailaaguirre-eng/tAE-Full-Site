import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { artKeyStore } from '@/lib/artKeyStore';

/**
 * ArtKey Save API (Legacy - redirects to new storage system)
 * Use /api/artkey/store instead
 */
export async function POST(request: Request) {
  try {
    const { productId, cartItemId, artKeyData, userId, sessionId, existingId } = await request.json();

    // Forward to new storage system
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   process.env.VERCEL_URL || 
                   'http://localhost:3000';

    const storeResponse = await fetch(`${baseUrl}/api/artkey/store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        sessionId: sessionId || generateSessionId(),
        productId,
        cartItemId,
        artKeyData,
        existingId,
      }),
    });

    if (!storeResponse.ok) {
      const error = await storeResponse.json();
      throw new Error(error.error || 'Failed to store ArtKey');
    }

    const result = await storeResponse.json();

    return NextResponse.json({
      success: true,
      artKeyId: result.artKey.id,
      token: result.artKey.token,
      shareUrl: result.artKey.shareUrl,
      qrCodeUrl: result.artKey.qrCodeUrl,
      message: 'ArtKey saved successfully',
    });
  } catch (error: any) {
    console.error('Error saving ArtKey:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save ArtKey' },
      { status: 500 }
    );
  }
}

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

