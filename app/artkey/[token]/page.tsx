import { notFound } from 'next/navigation';

/**
 * ArtKey Shareable URL Page
 * Displays ArtKey at /artkey/{token}
 * Also supports /artkey/{id} for backward compatibility
 */
export default async function ArtKeyViewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Fetch ArtKey data - try token first, then fall back to id
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                 process.env.VERCEL_URL || 
                 process.env.NEXT_PUBLIC_NETLIFY_URL ||
                 'http://localhost:3000';
  
  try {
    // First try token-based lookup
    let response = await fetch(`${baseUrl}/api/artkey/store?token=${token}`, {
      cache: 'no-store',
    });

    // If token lookup fails, try id-based lookup (backward compatibility)
    if (!response.ok) {
      response = await fetch(`${baseUrl}/api/artkey/${token}`, {
        cache: 'no-store',
      });
    }

    if (!response.ok) {
      notFound();
    }

    const data = await response.json();
    // Handle both response formats
    const artKey = data.artKey || data;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-4">{artKey.artKeyData?.title || 'ArtKey'}</h1>
            
            {/* ArtKey Preview/Viewer */}
            <div className="mt-8">
              {/* You can render the ArtKey here using the artKeyData */}
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600">ArtKey Viewer</p>
                <p className="text-sm text-gray-500 mt-2">
                  Token: {token}
                </p>
                {/* TODO: Render actual ArtKey design here */}
                <pre className="mt-4 text-xs text-left overflow-auto">
                  {JSON.stringify(artKey.artKeyData, null, 2)}
                </pre>
              </div>
            </div>

            {/* QR Code if available */}
            {artKey.qrCodeUrl && (
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-2">Share this ArtKey:</p>
                <img 
                  src={artKey.qrCodeUrl} 
                  alt="QR Code" 
                  className="mx-auto w-40 h-40"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading ArtKey:', error);
    notFound();
  }
}

