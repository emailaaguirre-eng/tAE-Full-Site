/* Demo form to post to /api/artkey/save with a neutral palette.
   This is a UX preview only; wire the API to your SQL database in app/api/artkey/save/route.ts */
"use client";

import { useState } from "react";

type FormState = {
  productId: string;
  cartItemId: string;
  title: string;
  primaryLinkLabel: string;
  primaryLinkUrl: string;
  spotifyUrl: string;
  enableGallery: boolean;
  enableVideo: boolean;
  showGuestbook: boolean;
};

export default function ArtKeySaveDemo() {
  const [form, setForm] = useState<FormState>({
    productId: "",
    cartItemId: "",
    title: "Your ArtKey Title",
    primaryLinkLabel: "View Story",
    primaryLinkUrl: "https://example.com/story",
    spotifyUrl: "",
    enableGallery: true,
    enableVideo: true,
    showGuestbook: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ artKeyId?: string; message?: string; error?: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = 'checked' in target ? target.checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      const payload = {
        productId: form.productId || "demo-product",
        cartItemId: form.cartItemId || "demo-cart-item",
        artKeyData: {
          title: form.title,
          links: [
            {
              label: form.primaryLinkLabel,
              url: form.primaryLinkUrl,
            },
          ],
          spotify: {
            url: form.spotifyUrl,
            autoplay: false,
          },
          features: {
            enable_gallery: form.enableGallery,
            enable_video: form.enableVideo,
            show_guestbook: form.showGuestbook,
            enable_featured_video: true,
            allow_img_uploads: true,
            allow_vid_uploads: true,
            gb_btn_view: true,
            gb_signing_status: "open",
            gb_signing_start: "",
            gb_signing_end: "",
            gb_require_approval: true,
            img_require_approval: true,
            vid_require_approval: true,
            order: ["gallery", "guestbook", "featured_video", "video"],
          },
        },
      };

      const res = await fetch("/api/artkey/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err?.message || "Failed to save ArtKey" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">ArtKey</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Save ArtKey (Demo UI)
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            This form posts to <code className="font-mono">/api/artkey/save</code>. Wire the route to your SQL DB to persist ArtKeys and return <code className="font-mono">artkey_id</code>. Saved ArtKeys can be viewed at <code className="font-mono">/artkey/&lt;id&gt;</code> (noindex, chrome-free).
          </p>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                <input
                  name="productId"
                  value={form.productId}
                  onChange={handleChange}
                  placeholder="product-123"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cart Item ID</label>
                <input
                  name="cartItemId"
                  value={form.cartItemId}
                  onChange={handleChange}
                  placeholder="cart-item-abc"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Link Label</label>
                <input
                  name="primaryLinkLabel"
                  value={form.primaryLinkLabel}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Link URL</label>
                <input
                  name="primaryLinkUrl"
                  value={form.primaryLinkUrl}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Spotify URL (optional)</label>
              <input
                name="spotifyUrl"
                value={form.spotifyUrl}
                onChange={handleChange}
                placeholder="https://open.spotify.com/..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="enableGallery"
                  checked={form.enableGallery}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Enable Gallery
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="enableVideo"
                  checked={form.enableVideo}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Enable Video
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="showGuestbook"
                  checked={form.showGuestbook}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Guestbook
              </label>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white px-4 py-2 font-semibold shadow-sm hover:bg-gray-800 transition disabled:opacity-60"
              >
                {submitting ? "Saving..." : "Save ArtKey"}
              </button>
              <p className="text-sm text-gray-500">
                Posts to <code className="font-mono">/api/artkey/save</code> and returns an <code className="font-mono">artKeyId</code>.
              </p>
            </div>
          </form>

          {result && (
            <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4">
              {result.error && (
                <p className="text-sm font-semibold text-red-600">
                  Error: {result.error}
                </p>
              )}
              {!result.error && (
                <>
                  <p className="text-sm text-gray-700">
                    {result.message || "Saved."}
                  </p>
                  {result.artKeyId && (
                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      artKeyId: <span className="font-mono">{result.artKeyId}</span>
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

