import React, { useEffect, useState } from 'react';

const REST = window.ArtKeyViewer?.rest || {
  token: '/wp-json/artkey/v1/token',
  guestbookList: '/wp-json/artkey/v1/guestbook',
  guestbookAdd: '/wp-json/artkey/v1/guestbook',
};
const nonce = window.ArtKeyViewer?.nonce || '';

const BG_PRIMARY = '#FFFFFF';
const BG_ALT = '#ECECE9';
const ACCENT = '#353535';

export default function ArtKeyViewerWP({ token }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modal, setModal] = useState(null); // 'gallery' | 'videos' | 'guestbook' | 'playlist' | 'featured'
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [guestbookForm, setGuestbookForm] = useState({ name: '', message: '' });
  const [guestbookSubmitting, setGuestbookSubmitting] = useState(false);
  const [guestbookError, setGuestbookError] = useState(null);

  useEffect(() => {
    loadData();
  }, [token]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${REST.token}/${token}`);
      if (!res.ok) throw new Error('Failed to load ArtKey');
      const json = await res.json();
      setData(json?.data || json);
      await loadGuestbook(token);
    } catch (e) {
      setError(e.message || 'Failed to load ArtKey');
    } finally {
      setLoading(false);
    }
  };

  const loadGuestbook = async (tkn) => {
    try {
      const res = await fetch(`${REST.guestbookList}/${tkn}`);
      if (!res.ok) return;
      const json = await res.json();
      setGuestbookEntries(json.entries || []);
    } catch (_) {
      /* ignore */
    }
  };

  const submitGuestbook = async () => {
    if (!guestbookForm.message) {
      setGuestbookError('Message required');
      return;
    }
    setGuestbookSubmitting(true);
    setGuestbookError(null);
    try {
      const res = await fetch(REST.guestbookAdd, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': nonce },
        body: JSON.stringify({ token, name: guestbookForm.name, message: guestbookForm.message }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to post');
      }
      setGuestbookForm({ name: '', message: '' });
      await loadGuestbook(token);
    } catch (e) {
      setGuestbookError(e.message);
    } finally {
      setGuestbookSubmitting(false);
    }
  };

  if (loading) return <PageShell><div className="text-center py-12">Loading...</div></PageShell>;
  if (error || !data) return <PageShell><div className="text-center text-red-600 py-12">{error || 'Not found'}</div></PageShell>;

  const theme = data.theme || {};
  const buttons = buildButtons(data);

  return (
    <PageShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="card p-6">
          <h1 className="text-3xl font-bold font-playfair mb-2" style={{ color: theme.title_color || ACCENT }}>
            {data.title || 'Your ArtKey'}
          </h1>
          <div className="flex gap-3 flex-wrap mt-4">
            {buttons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setModal(btn.id)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm"
                style={{ background: theme.button_color || ACCENT, color: getButtonTextColor(theme.button_color || ACCENT) }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </header>

        {modal === 'gallery' && (
          <Modal title="Image Gallery" onClose={() => setModal(null)}>
            {data.uploadedImages?.length ? (
              <div className="grid grid-cols-2 gap-3">
                {data.uploadedImages.map((img, i) => (
                  <img key={i} src={img} alt="" className="w-full h-40 object-cover rounded-lg border border-[#e2e2e0]" />
                ))}
              </div>
            ) : (
              <p>No images yet.</p>
            )}
          </Modal>
        )}

        {modal === 'videos' && (
          <Modal title="Video Gallery" onClose={() => setModal(null)}>
            {data.uploadedVideos?.length ? (
              <div className="space-y-3">
                {data.uploadedVideos.map((vid, i) => (
                  <video key={i} src={vid} controls className="w-full rounded-lg border border-[#e2e2e0]" />
                ))}
              </div>
            ) : (
              <p>No videos yet.</p>
            )}
          </Modal>
        )}

        {modal === 'playlist' && (
          <Modal title="Playlist" onClose={() => setModal(null)}>
            {data.spotify?.url?.length > 10 ? (
              <iframe
                src={toSpotifyEmbed(data.spotify.url)}
                width="100%"
                height="380"
                allow="encrypted-media"
                className="rounded-lg border border-[#e2e2e0]"
              />
            ) : (
              <p>No playlist provided.</p>
            )}
          </Modal>
        )}

        {modal === 'featured' && (
          <Modal title="Featured Video" onClose={() => setModal(null)}>
            <video controls className="w-full rounded-lg border border-[#e2e2e0]">
              <source src={data.featured_video?.src || data.featured_video?.url || ''} />
            </video>
          </Modal>
        )}

        {modal === 'guestbook' && (
          <Modal title="Guestbook" onClose={() => setModal(null)}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Name (optional)</label>
                <input
                  type="text"
                  value={guestbookForm.name}
                  onChange={(e) => setGuestbookForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded border border-[#d8d8d6]"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Message</label>
                <textarea
                  value={guestbookForm.message}
                  onChange={(e) => setGuestbookForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-3 py-2 rounded border border-[#d8d8d6]"
                  rows={3}
                />
              </div>
              {guestbookError && <p className="text-sm text-red-600">{guestbookError}</p>}
              <button
                onClick={submitGuestbook}
                disabled={guestbookSubmitting}
                className="w-full py-2 rounded font-semibold"
                style={{ background: ACCENT, color: '#fff' }}
              >
                {guestbookSubmitting ? 'Sending...' : 'Sign Guestbook'}
              </button>

              <div className="pt-4 border-t border-[#e2e2e0] space-y-3">
                {guestbookEntries.length === 0 && <p className="text-sm text-gray-600">No entries yet.</p>}
                {guestbookEntries.map((e) => (
                  <div key={e.id} className="p-3 rounded border border-[#e2e2e0]" style={{ background: BG_PRIMARY }}>
                    <div className="text-sm font-semibold" style={{ color: ACCENT }}>{e.name || 'Guest'}</div>
                    <div className="text-xs text-gray-500">{formatDate(e.date)}</div>
                    <div className="mt-1 text-sm" dangerouslySetInnerHTML={{ __html: e.message }} />
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </PageShell>
  );
}

function PageShell({ children }) {
  return (
    <div style={{ background: BG_ALT, minHeight: '100vh', padding: '24px' }}>
      {children}
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lg text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4" style={{ color: ACCENT }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function getButtonTextColor(color) {
  if (!color) return '#fff';
  const c = color.toLowerCase();
  if (c === '#ffffff' || c === '#fefefe' || c === '#fef3c7' || c === '#fde047' || c === '#fffff0') return '#000';
  return '#fff';
}

function buildButtons(data) {
  const btns = [];
  if (data.uploadedImages?.length || data.features?.enable_gallery) btns.push({ id: 'gallery', label: '🖼️ Gallery' });
  if (data.uploadedVideos?.length || data.features?.enable_video) btns.push({ id: 'videos', label: '🎥 Videos' });
  if (data.features?.show_guestbook) btns.push({ id: 'guestbook', label: '📝 Guestbook' });
  if (data.spotify?.url?.length > 10) btns.push({ id: 'playlist', label: '🎵 Playlist' });
  if (data.features?.enable_featured_video) btns.push({ id: 'featured', label: '🎬 Featured Video' });
  (data.links || []).forEach((lnk, i) => {
    btns.push({ id: `link-${i}`, label: lnk.label || `Link ${i + 1}`, href: lnk.url, external: true });
  });
  return btns;
}

function toSpotifyEmbed(url) {
  // crude transform
  return url.replace('open.spotify.com', 'open.spotify.com/embed');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleString();
  } catch {
    return dateStr;
  }
}

