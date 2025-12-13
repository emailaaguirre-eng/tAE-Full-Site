/**
 * WordPress Design Editor Component
 * Adapted from Next.js PersonalizationStudio for WordPress
 */

import React, { useEffect, useState } from 'react';

// Get WordPress REST API URLs and Gelato key from localized script
const wpRestApi = window.ArtKeyDesignEditor?.rest || {
  save: '/wp-json/artkey-design/v1/save',
  get: '/wp-json/artkey-design/v1/get',
  options: '/wp-json/artkey-design/v1/options',
  calculate: '/wp-json/artkey-design/v1/calculate-price',
};
const wpNonce = window.ArtKeyDesignEditor?.nonce || '';
const gelatoApiKey = window.ArtKeyDesignEditor?.gelatoApiKey || '';

const LIGHT_BG = '#ECECE9';
const PRIMARY_BG = '#FFFFFF';
const ACCENT = '#353535';

export default function DesignEditorWP({ productId, productType = 'print' }) {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [options, setOptions] = useState({ sizes: [], materials: [], frames: [] });
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    loadOptions();
  }, [productId]);

  const loadOptions = async () => {
    try {
      const res = await fetch(`${wpRestApi.options}/${productId || 0}`);
      if (res.ok) {
        const data = await res.json();
        setOptions({
          sizes: data.sizes || [],
          materials: data.materials || [],
          frames: data.frames || [],
        });
        if (data.sizes?.length) setSelectedSize(data.sizes[0]);
        if (data.materials?.length) setSelectedMaterial(data.materials[0]);
        if (data.frames?.length) setSelectedFrame(data.frames[0]);
      }
    } catch (e) {
      console.error('Failed to load options', e);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/wp-json/artkey/v1/upload', {
        method: 'POST',
        headers: { 'X-WP-Nonce': wpNonce },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadedImage(result.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    }
  };

  const handleCalculate = async () => {
    if (!selectedSize) return;
    setCalculating(true);
    try {
      const res = await fetch(wpRestApi.calculate, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
        body: JSON.stringify({
          product_id: productId,
          size: selectedSize,
          material: selectedMaterial,
          frame: selectedFrame,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setPrice(data.price || null);
      }
    } catch (e) {
      console.error('Calc failed', e);
    } finally {
      setCalculating(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(wpRestApi.save, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': wpNonce,
        },
        body: JSON.stringify({
          product_id: productId,
          product_type: productType,
          design_data: {
            image: uploadedImage,
            size: selectedSize,
            material: selectedMaterial,
            frame: selectedFrame,
            gelatoApiKey,
          },
        }),
      });

      if (response.ok) {
        alert('Design saved!');
        window.location.href = '/checkout/';
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save design');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex" style={{ background: LIGHT_BG }}>
      {/* Left Sidebar - Tools */}
      <div className="w-80 bg-white border-r border-[#d8d8d6] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-[#e2e2e0]" style={{ background: PRIMARY_BG }}>
          <h2 className="text-xl font-bold font-playfair" style={{ color: ACCENT }}>Design Editor</h2>
          <p className="text-sm mt-1" style={{ color: '#555' }}>{selectedSize ? `${selectedSize.name || selectedSize}` : productType}</p>
        </div>

        {/* Tool Tabs */}
        <div className="grid grid-cols-4 gap-1 p-2" style={{ background: LIGHT_BG, borderBottom: '1px solid #e2e2e0' }}>
          <button
            onClick={() => setActiveTab('upload')}
            className="flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all"
            style={activeTab === 'upload'
              ? { background: PRIMARY_BG, color: ACCENT, boxShadow: '0 2px 6px rgba(0,0,0,0.08)', border: '1px solid #d8d8d6' }
              : { color: '#666' }}
          >
            <span className="text-2xl mb-1">📤</span>
            <span className="text-[10px] font-medium">Upload</span>
          </button>
          <button
            onClick={() => setActiveTab('options')}
            className="flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all"
            style={activeTab === 'options'
              ? { background: PRIMARY_BG, color: ACCENT, boxShadow: '0 2px 6px rgba(0,0,0,0.08)', border: '1px solid #d8d8d6' }
              : { color: '#666' }}
          >
            <span className="text-2xl mb-1">📐</span>
            <span className="text-[10px] font-medium">Options</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className="flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all"
            style={activeTab === 'ai'
              ? { background: PRIMARY_BG, color: ACCENT, boxShadow: '0 2px 6px rgba(0,0,0,0.08)', border: '1px solid #d8d8d6' }
              : { color: '#666' }}
          >
            <span className="text-2xl mb-1">✨</span>
            <span className="text-[10px] font-medium">AI</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className="flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all"
            style={activeTab === 'preview'
              ? { background: PRIMARY_BG, color: ACCENT, boxShadow: '0 2px 6px rgba(0,0,0,0.08)', border: '1px solid #d8d8d6' }
              : { color: '#666' }}
          >
            <span className="text-2xl mb-1">👁️</span>
            <span className="text-[10px] font-medium">Preview</span>
          </button>
        </div>

        {/* Tool Content */}
        <div className="flex-1 overflow-y-auto p-4" style={{ background: PRIMARY_BG }}>
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-[#d8d8d6] rounded-xl p-8 text-center" style={{ background: LIGHT_BG }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="design-upload"
                />
                <label
                  htmlFor="design-upload"
                  className="inline-block px-6 py-3 rounded-full font-semibold cursor-pointer transition-all"
                  style={{ background: ACCENT, color: '#fff' }}
                >
                  Upload Image
                </label>
                <p className="text-xs mt-2" style={{ color: '#666' }}>JPG, PNG up to 10MB</p>
              </div>
              {uploadedImage && (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded design"
                    className="w-full rounded-lg border border-[#d8d8d6]"
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'options' && (
            <div className="space-y-4">
              <Section title="Size">
                <OptionGrid
                  options={options.sizes}
                  selected={selectedSize}
                  onSelect={setSelectedSize}
                />
              </Section>
              <Section title="Material">
                <OptionGrid
                  options={options.materials}
                  selected={selectedMaterial}
                  onSelect={setSelectedMaterial}
                />
              </Section>
              <Section title="Frame">
                <OptionGrid
                  options={options.frames}
                  selected={selectedFrame}
                  onSelect={setSelectedFrame}
                />
              </Section>
              <button
                onClick={handleCalculate}
                className="w-full py-3 rounded-lg font-semibold transition-all"
                style={{ background: ACCENT, color: '#fff' }}
              >
                {calculating ? 'Calculating...' : 'Update Price'}
              </button>
              {price !== null && (
                <div className="text-lg font-semibold text-center" style={{ color: ACCENT }}>
                  Estimated: ${price}
                </div>
              )}
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <Section title="AI Studio">
                <ButtonRow label="Background Removal" />
                <div className="mt-3">
                  <h4 className="text-sm font-semibold mb-2" style={{ color: ACCENT }}>Art Styles</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['Van Gogh', 'Monet', 'Picasso', 'Warhol', 'Pencil', 'Watercolor', 'Cartoonify', 'Rotoscope'].map((style) => (
                      <div key={style} className="px-3 py-2 rounded-lg border border-[#d8d8d6] text-sm text-center" style={{ background: PRIMARY_BG, color: ACCENT }}>
                        {style}
                      </div>
                    ))}
                  </div>
                </div>
                <ButtonRow label="Face Detection" />
              </Section>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-2 text-sm" style={{ color: '#555' }}>
              <p>Preview your design on the right. Use Upload and Options to adjust.</p>
              {gelatoApiKey ? (
                <p className="text-green-700">Gelato API key detected.</p>
              ) : (
                <p className="text-amber-700">Gelato API key not set. Add it in the plugin settings.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#e2e2e0]" style={{ background: LIGHT_BG }}>
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-lg font-semibold transition-all"
            style={{ background: ACCENT, color: '#fff' }}
          >
            Save Design
          </button>
          <button
            onClick={() => window.history.back()}
            className="w-full mt-2 py-2 rounded-lg transition-all"
            style={{ border: '1px solid #d8d8d6', color: '#555', background: PRIMARY_BG }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Right: Preview Canvas */}
      <div className="flex-1 flex items-center justify-center" style={{ background: LIGHT_BG }}>
        <div className="rounded-lg shadow-2xl p-6 border border-[#d8d8d6]" style={{ background: PRIMARY_BG }}>
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Design preview"
              className="max-w-full max-h-[80vh] object-contain rounded"
              style={{ background: '#f8f8f6' }}
            />
          ) : (
            <div className="w-[480px] h-[480px] flex items-center justify-center border-2 border-dashed border-[#d8d8d6] rounded-lg" style={{ background: '#f8f8f6' }}>
              <p className="text-gray-500">Upload an image to preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e2e2e0] p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-3" style={{ color: ACCENT }}>{title}</h3>
      {children}
    </div>
  );
}

function OptionGrid({ options = [], selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt, idx) => {
        const label = opt.label || opt.name || opt;
        const isSelected = selected && (selected.value === opt.value || selected === opt);
        return (
          <button
            key={idx}
            onClick={() => onSelect(opt)}
            className="px-3 py-2 rounded-lg border text-sm text-left transition-all"
            style={isSelected
              ? { borderColor: ACCENT, background: '#f5f5f3', color: ACCENT, boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }
              : { borderColor: '#d8d8d6', color: '#555', background: PRIMARY_BG }}
          >
            {label}
            {opt.price !== undefined && (
              <span className="block text-xs" style={{ color: '#777' }}>
                ${opt.price}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ButtonRow({ label }) {
  return (
    <button
      className="w-full py-3 rounded-xl font-semibold transition-all"
      style={{ background: ACCENT, color: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}
    >
      {label}
    </button>
  );
}

