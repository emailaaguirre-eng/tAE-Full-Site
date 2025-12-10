"use client";

import { useState, useRef, useEffect } from 'react';

interface ArtKeyHoverPreviewProps {
  productName: string;
  productId?: string | number;
  initialData?: {
    title: string;
    theme: {
      template: string;
      bg_color: string;
      bg_image_url?: string;
      button_color: string;
      title_color: string;
    };
  };
  hotspotPosition?: {
    x: string;
    y: string;
  };
  children: React.ReactNode;
}

export default function ArtKeyHoverPreview({
  productName,
  productId,
  initialData = {
    title: 'Your ArtKey',
    theme: {
      template: 'classic',
      bg_color: '#F6F7FB',
      button_color: '#4f46e5',
      title_color: '#4f46e5',
    },
  },
  hotspotPosition = { x: '85%', y: '85%' },
  children,
}: ArtKeyHoverPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Mini Editor State
  const [title, setTitle] = useState(initialData.title);
  const [bgColor, setBgColor] = useState(initialData.theme.bg_color);
  const [buttonColor, setButtonColor] = useState(initialData.theme.button_color);
  const [titleColor, setTitleColor] = useState(initialData.theme.title_color);
  const [selectedTemplate, setSelectedTemplate] = useState(initialData.theme.template);
  
  // Features state
  const [features, setFeatures] = useState({
    showGuestbook: false,
    showGallery: false,
    showPlaylist: false,
  });

  // Templates (mini version - 6 quick options)
  const templates = [
    { id: 'classic', name: 'Classic', bg: '#F6F7FB', button: '#4f46e5', title: '#4f46e5' },
    { id: 'aurora', name: 'Aurora', bg: 'linear-gradient(135deg,#667eea,#764ba2)', button: '#ffffff', title: '#ffffff' },
    { id: 'sunset', name: 'Sunset', bg: 'linear-gradient(135deg,#ff6b6b,#feca57)', button: '#ffffff', title: '#ffd700' },
    { id: 'dark', name: 'Dark', bg: '#0f1218', button: '#667eea', title: '#667eea' },
    { id: 'ocean', name: 'Ocean', bg: 'linear-gradient(135deg,#667eea,#74ebd5)', button: '#ffffff', title: '#74ebd5' },
    { id: 'forest', name: 'Forest', bg: 'linear-gradient(135deg,#134e5e,#71b280)', button: '#ffffff', title: '#d4fc79' },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
    }
  };

  const applyTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id);
    setBgColor(template.bg);
    setButtonColor(template.button);
    setTitleColor(template.title);
  };

  const getButtonTextColor = (color: string) => {
    if (color === '#ffffff' || color === '#FFFFFF' || color === '#fef3c7' || color === '#fde047') {
      return '#000000';
    }
    return '#ffffff';
  };

  const handleOpenFullEditor = () => {
    // Save current customization to session storage
    sessionStorage.setItem('miniArtKeyData', JSON.stringify({
      title,
      theme: { bg_color: bgColor, button_color: buttonColor, title_color: titleColor, template: selectedTemplate },
      features,
    }));
    window.location.href = `/artkey-editor?product_id=${productId || ''}&from_mini=true`;
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative">
      {children}

      {/* ArtKey Signature Icon - Like an artist signature in the corner */}
      <div
        className="absolute cursor-pointer z-10 group/artkey"
        style={{ right: '8px', bottom: '8px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsPinned(!isPinned)}
      >
        {/* Subtle pulse effect */}
        <div className="absolute inset-0 w-12 h-12 -m-1.5">
          <div className="absolute inset-0 rounded-lg bg-white/40 animate-pulse"></div>
        </div>
        
        {/* Mini phone/ArtKey signature icon */}
        <div className="relative w-9 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md flex flex-col items-center justify-center shadow-lg border border-gray-600 overflow-hidden group-hover/artkey:scale-110 transition-transform">
          {/* Mini notch */}
          <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-black rounded-full"></div>
          
          {/* Mini screen with gradient */}
          <div 
            className="w-7 h-9 mt-1 rounded-sm flex items-center justify-center"
            style={{ background: bgColor }}
          >
            <span className="text-[8px] font-bold" style={{ color: titleColor }}>AK</span>
          </div>
          
          {/* Scan indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-medium to-brand-light opacity-80"></div>
        </div>
        
        {/* Tooltip on hover */}
        <div className="absolute bottom-full right-0 mb-1 opacity-0 group-hover/artkey:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
            ✨ Scan to Explore
          </div>
        </div>
      </div>

      {/* Mini ArtKey Phone Popup */}
      {isOpen && (
        <div
          className="absolute z-50 transition-all duration-300"
          style={{ 
            right: '0',
            bottom: '100%',
            marginBottom: '10px',
          }}
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-brand-light overflow-hidden" style={{ width: '320px' }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-medium to-brand-dark p-3 flex justify-between items-center">
              <div>
                <h4 className="text-white font-bold text-sm font-playfair">✨ ArtKey Preview</h4>
                <p className="text-white/70 text-xs">{productName}</p>
              </div>
              <button
                onClick={() => { setIsOpen(false); setIsPinned(false); }}
                className="text-white/70 hover:text-white text-lg"
              >
                ×
              </button>
            </div>

            <div className="p-4">
              {/* Mini Phone Frame */}
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[24px] p-1.5 shadow-xl relative" style={{ width: '180px' }}>
                  {/* Notch / Dynamic Island */}
                  <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-black rounded-full w-16 h-5 flex items-center justify-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                    </div>
                  </div>
                  
                  {/* Phone Screen */}
                  <div 
                    className="rounded-[20px] overflow-hidden relative"
                    style={{ height: '280px' }}
                  >
                    <div
                      className="h-full w-full pt-8 pb-4 px-4 flex flex-col items-center justify-center text-center"
                      style={{ 
                        background: bgColor,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {/* Title */}
                      <h1 
                        className="text-base font-bold mb-3 font-playfair px-2"
                        style={{ color: titleColor }}
                      >
                        {title || 'Your Title'}
                      </h1>
                      
                      {/* Mini Buttons Preview */}
                      <div className="flex flex-col gap-1.5 w-full px-2">
                        {features.showGallery && (
                          <button
                            className="w-full py-1.5 px-3 rounded-full text-xs font-semibold shadow-sm"
                            style={{ backgroundColor: buttonColor, color: getButtonTextColor(buttonColor) }}
                          >
                            🖼️ Gallery
                          </button>
                        )}
                        {features.showGuestbook && (
                          <button
                            className="w-full py-1.5 px-3 rounded-full text-xs font-semibold shadow-sm"
                            style={{ backgroundColor: buttonColor, color: getButtonTextColor(buttonColor) }}
                          >
                            📝 Guestbook
                          </button>
                        )}
                        {features.showPlaylist && (
                          <button
                            className="w-full py-1.5 px-3 rounded-full text-xs font-semibold shadow-sm"
                            style={{ backgroundColor: buttonColor, color: getButtonTextColor(buttonColor) }}
                          >
                            🎵 Playlist
                          </button>
                        )}
                        {!features.showGallery && !features.showGuestbook && !features.showPlaylist && (
                          <div className="text-xs opacity-60 py-2" style={{ color: titleColor }}>
                            Toggle features below
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Customization */}
              <div className="space-y-3">
                {/* Title Input */}
                <div>
                  <label className="block text-xs font-semibold text-brand-darkest mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-brand-light rounded-lg text-sm focus:border-brand-medium focus:outline-none"
                    placeholder="Enter your title..."
                  />
                </div>

                {/* Quick Templates */}
                <div>
                  <label className="block text-xs font-semibold text-brand-darkest mb-1">Quick Theme</label>
                  <div className="grid grid-cols-6 gap-1">
                    {templates.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => applyTemplate(tpl)}
                        className={`aspect-square rounded-lg border-2 transition-all ${
                          selectedTemplate === tpl.id ? 'border-brand-dark scale-110 shadow-md' : 'border-brand-light hover:border-brand-medium'
                        }`}
                        style={{ background: tpl.bg }}
                        title={tpl.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Feature Toggles */}
                <div>
                  <label className="block text-xs font-semibold text-brand-darkest mb-1">Features</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFeatures(f => ({ ...f, showGallery: !f.showGallery }))}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border-2 transition-all ${
                        features.showGallery ? 'border-brand-dark bg-brand-light' : 'border-brand-light hover:border-brand-medium'
                      }`}
                    >
                      🖼️ Gallery
                    </button>
                    <button
                      onClick={() => setFeatures(f => ({ ...f, showGuestbook: !f.showGuestbook }))}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border-2 transition-all ${
                        features.showGuestbook ? 'border-brand-dark bg-brand-light' : 'border-brand-light hover:border-brand-medium'
                      }`}
                    >
                      📝 Book
                    </button>
                    <button
                      onClick={() => setFeatures(f => ({ ...f, showPlaylist: !f.showPlaylist }))}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border-2 transition-all ${
                        features.showPlaylist ? 'border-brand-dark bg-brand-light' : 'border-brand-light hover:border-brand-medium'
                      }`}
                    >
                      🎵 Music
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-3 bg-gray-50 border-t border-brand-light flex gap-2">
              <button
                onClick={handleOpenFullEditor}
                className="flex-1 bg-gradient-to-r from-brand-medium to-brand-dark text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              >
                🎨 Full Editor
              </button>
              <button
                onClick={() => {
                  // Add to cart with customization
                  console.log('Adding to cart:', { title, bgColor, buttonColor, titleColor, features });
                  alert('Added to cart! (Demo)');
                }}
                className="flex-1 bg-white border-2 border-brand-medium text-brand-dark py-2 rounded-lg font-semibold text-sm hover:bg-brand-lightest transition-all"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
