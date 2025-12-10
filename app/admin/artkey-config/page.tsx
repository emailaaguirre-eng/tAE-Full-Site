"use client";

import { useState } from 'react';

export default function ArtKeyConfigPage() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [enabled, setEnabled] = useState(true);
  
  // Hotspot configuration
  const [hotspotX, setHotspotX] = useState('50%');
  const [hotspotY, setHotspotY] = useState('50%');
  const [hotspotSize, setHotspotSize] = useState('40px');
  
  // ArtKey content
  const [title, setTitle] = useState('Your ArtKey');
  const [template, setTemplate] = useState('aurora');
  const [bgColor, setBgColor] = useState('#F6F7FB');
  const [titleColor, setTitleColor] = useState('#667eea');
  const [buttonColor, setButtonColor] = useState('#667eea');
  
  // Links
  const [links, setLinks] = useState<Array<{ label: string; url: string }>>([
    { label: 'Visit Website', url: 'https://example.com' },
  ]);
  
  // Features
  const [enableGallery, setEnableGallery] = useState(true);
  const [enableVideo, setEnableVideo] = useState(true);
  const [showGuestbook, setShowGuestbook] = useState(true);
  const [allowImgUploads, setAllowImgUploads] = useState(true);
  
  const [saveStatus, setSaveStatus] = useState('');

  const templates = [
    'classic', 'paper', 'dark', 'bold', 'aurora', 'sunset', 
    'ocean', 'rose_gold', 'forest', 'lavender', 'cosmic', 
    'vintage', 'midnight', 'mint', 'coral', 'berry'
  ];

  const handleSave = async () => {
    const config = {
      productId,
      config: {
        enabled,
        productName,
        hotspot: {
          x: hotspotX,
          y: hotspotY,
          size: hotspotSize,
        },
        artKeyData: {
          title,
          theme: {
            template,
            bg_color: bgColor,
            title_color: titleColor,
            button_color: buttonColor,
          },
          links,
          features: {
            enable_gallery: enableGallery,
            enable_video: enableVideo,
            show_guestbook: showGuestbook,
            allow_img_uploads: allowImgUploads,
          },
        },
      },
    };

    try {
      const response = await fetch('/api/artkey/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setSaveStatus('✅ Configuration saved successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('❌ Failed to save configuration');
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('❌ Error saving configuration');
    }
  };

  const handleLoadConfig = async () => {
    if (!productId) return;

    try {
      const response = await fetch(`/api/artkey/config?productId=${productId}`);
      const data = await response.json();

      if (data.success && data.config) {
        const c = data.config;
        setEnabled(c.enabled);
        setProductName(c.productName);
        setHotspotX(c.hotspot.x);
        setHotspotY(c.hotspot.y);
        setHotspotSize(c.hotspot.size);
        setTitle(c.artKeyData.title);
        setTemplate(c.artKeyData.theme.template);
        setBgColor(c.artKeyData.theme.bg_color);
        setTitleColor(c.artKeyData.theme.title_color);
        setButtonColor(c.artKeyData.theme.button_color);
        setLinks(c.artKeyData.links);
        setEnableGallery(c.artKeyData.features.enable_gallery);
        setEnableVideo(c.artKeyData.features.enable_video);
        setShowGuestbook(c.artKeyData.features.show_guestbook);
        setAllowImgUploads(c.artKeyData.features.allow_img_uploads);
        setSaveStatus('✅ Configuration loaded');
        setTimeout(() => setSaveStatus(''), 2000);
      }
    } catch (error) {
      console.error('Load error:', error);
      setSaveStatus('❌ Error loading configuration');
    }
  };

  const addLink = () => {
    setLinks([...links, { label: '', url: '' }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: 'label' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  return (
    <div className="min-h-screen bg-brand-lightest p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-brand-dark mb-2">
            ArtKey Popup Configuration
          </h1>
          <p className="text-brand-darkest opacity-75 mb-6">
            Configure custom ArtKey popups for each product
          </p>

          {saveStatus && (
            <div className={`p-4 rounded-lg mb-6 ${
              saveStatus.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {saveStatus}
            </div>
          )}

          {/* Product Selection */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-brand-darkest mb-2">
                Product ID *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                  placeholder="e.g., product-123"
                />
                <button
                  onClick={handleLoadConfig}
                  className="px-4 py-2 bg-brand-medium text-white rounded-lg font-semibold hover:bg-brand-dark transition-colors"
                >
                  Load
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-darkest mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                placeholder="e.g., Custom Photo Card"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8 p-4 bg-brand-lightest rounded-lg">
            <input
              type="checkbox"
              id="enabled"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="enabled" className="font-semibold text-brand-darkest">
              Enable ArtKey Popup for this product
            </label>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column: Configuration */}
          <div className="space-y-6">
            {/* Hotspot Position */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4">
                Hotspot Position
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    X Position (horizontal)
                  </label>
                  <input
                    type="text"
                    value={hotspotX}
                    onChange={(e) => setHotspotX(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                    placeholder="e.g., 50% or 100px"
                  />
                  <p className="text-xs text-brand-darkest opacity-60 mt-1">
                    Use % for relative or px for absolute positioning
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    Y Position (vertical)
                  </label>
                  <input
                    type="text"
                    value={hotspotY}
                    onChange={(e) => setHotspotY(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                    placeholder="e.g., 30% or 50px"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    Hotspot Size
                  </label>
                  <input
                    type="text"
                    value={hotspotSize}
                    onChange={(e) => setHotspotSize(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                    placeholder="e.g., 40px"
                  />
                </div>
              </div>
            </div>

            {/* ArtKey Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4">
                ArtKey Content
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                    placeholder="Your ArtKey Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    Template
                  </label>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                  >
                    {templates.map(t => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-brand-darkest mb-2">
                      Background
                    </label>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full h-10 rounded-lg border-2 border-brand-light cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-darkest mb-2">
                      Title Color
                    </label>
                    <input
                      type="color"
                      value={titleColor}
                      onChange={(e) => setTitleColor(e.target.value)}
                      className="w-full h-10 rounded-lg border-2 border-brand-light cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-darkest mb-2">
                      Button Color
                    </label>
                    <input
                      type="color"
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      className="w-full h-10 rounded-lg border-2 border-brand-light cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4">
                Custom Links/Buttons
              </h2>
              <div className="space-y-3 mb-4">
                {links.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => updateLink(index, 'label', e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none text-sm"
                      placeholder="Button label"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateLink(index, 'url', e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none text-sm"
                      placeholder="https://..."
                    />
                    <button
                      onClick={() => removeLink(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addLink}
                className="w-full px-4 py-2 bg-brand-lightest border-2 border-brand-medium text-brand-dark rounded-lg font-semibold hover:bg-brand-light transition-colors"
              >
                + Add Link
              </button>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4">
                Features
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'gallery', label: '📸 Image Gallery', value: enableGallery, setter: setEnableGallery },
                  { id: 'video', label: '🎥 Video Gallery', value: enableVideo, setter: setEnableVideo },
                  { id: 'guestbook', label: '📖 Guestbook', value: showGuestbook, setter: setShowGuestbook },
                  { id: 'uploads', label: '📤 Allow Uploads', value: allowImgUploads, setter: setAllowImgUploads },
                ].map(feature => (
                  <label key={feature.id} className="flex items-center gap-3 p-3 bg-brand-lightest rounded-lg cursor-pointer hover:bg-brand-light transition-colors">
                    <input
                      type="checkbox"
                      checked={feature.value}
                      onChange={(e) => feature.setter(e.target.checked)}
                      className="w-5 h-5"
                    />
                    <span className="font-semibold text-brand-darkest">{feature.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-brand-dark mb-4">
                Preview
              </h2>
              <div className="space-y-4">
                {/* Hotspot Position Visual */}
                <div>
                  <p className="text-sm font-semibold text-brand-darkest mb-2">Hotspot Position:</p>
                  <div className="relative w-full aspect-square bg-gray-100 rounded-lg border-2 border-brand-light overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      Product Image
                    </div>
                    <div
                      className="absolute"
                      style={{
                        left: hotspotX,
                        top: hotspotY,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div
                        className="rounded-full bg-brand-medium flex items-center justify-center text-white font-bold shadow-lg"
                        style={{
                          width: hotspotSize,
                          height: hotspotSize,
                        }}
                      >
                        ✨
                      </div>
                    </div>
                  </div>
                </div>

                {/* ArtKey Content Preview */}
                <div>
                  <p className="text-sm font-semibold text-brand-darkest mb-2">ArtKey Preview:</p>
                  <div
                    className="rounded-xl p-6 text-center"
                    style={{ background: bgColor }}
                  >
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ color: titleColor }}
                    >
                      {title || 'Your ArtKey'}
                    </h3>
                    <div className="space-y-2">
                      {links.map((link, idx) => link.label && (
                        <div
                          key={idx}
                          className="py-2 px-4 rounded-full text-white text-sm font-semibold"
                          style={{ background: buttonColor }}
                        >
                          {link.label}
                        </div>
                      ))}
                      {enableGallery && (
                        <div className="py-2 px-4 rounded-full bg-white/20 text-white text-sm font-semibold">
                          📸 View Gallery
                        </div>
                      )}
                      {showGuestbook && (
                        <div className="py-2 px-4 rounded-full bg-white/20 text-white text-sm font-semibold">
                          📖 Guestbook
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <button
            onClick={handleSave}
            className="w-full bg-brand-dark text-white py-4 rounded-lg text-lg font-bold hover:bg-brand-darkest transition-all shadow-lg"
          >
            💾 Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}

