"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ArtKeyResponse = {
  id: string;
  status: string;
  artKeyData: {
    title?: string;
    links?: Array<{ label: string; url: string }>;
    spotify?: { url?: string; autoplay?: boolean };
    featured_video?: { button_label?: string; url?: string };
    features?: {
      enable_gallery?: boolean;
      enable_video?: boolean;
      show_guestbook?: boolean;
      enable_featured_video?: boolean;
    };
  };
};

export default function ArtKeyPublicPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<ArtKeyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/artkey/${id}`, { cache: "no-store" });
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        const json = await res.json();
        setData(json);
      } catch (e) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      load();
    }
  }, [id]);

  const title = data?.artKeyData?.title || "ArtKey Portal";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-10">
          {loading && <p className="text-gray-600">Loading ArtKey...</p>}
          {notFound && !loading && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">ArtKey not found</h1>
              <p className="text-gray-600">This link may be inactive or invalid.</p>
            </div>
          )}
          {data && !notFound && (
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="text-center space-y-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">ArtKey</p>
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
                {(data.artKeyData.links || []).slice(0, 4).map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center rounded-full px-4 py-3 font-semibold bg-gray-900 text-white hover:bg-gray-800 transition shadow-sm"
                  >
                    {link.label || `Link ${idx + 1}`}
                  </a>
                ))}

                {data.artKeyData.spotify?.url && (
                  <a
                    href={data.artKeyData.spotify.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center rounded-full px-4 py-3 font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 transition"
                  >
                    🎵 Open Playlist
                  </a>
                )}

                {data.artKeyData.featured_video?.button_label && (
                  <button className="w-full text-center rounded-full px-4 py-3 font-semibold bg-gray-100 text-gray-900 cursor-default shadow-sm">
                    🎬 {data.artKeyData.featured_video.button_label}
                  </button>
                )}

                {data.artKeyData.features?.enable_gallery && (
                  <div className="text-sm text-gray-700 text-center bg-gray-50 rounded-xl px-4 py-3 border border-dashed border-gray-200">
                    🖼️ Gallery available
                  </div>
                )}
                {data.artKeyData.features?.enable_video && (
                  <div className="text-sm text-gray-700 text-center bg-gray-50 rounded-xl px-4 py-3 border border-dashed border-gray-200">
                    📹 Video uploads available
                  </div>
                )}
                {data.artKeyData.features?.show_guestbook && (
                  <div className="text-sm text-gray-700 text-center bg-gray-50 rounded-xl px-4 py-3 border border-dashed border-gray-200">
                    📝 Guestbook enabled
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

