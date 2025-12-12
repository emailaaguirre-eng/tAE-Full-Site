"use client";

import { useState } from "react";

export default function CardsSection() {
  const [uploadMethod, setUploadMethod] = useState<"upload" | "gallery" | null>(null);

  return (
    <section id="cards" className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">💌</div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Cards
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Upload or Gallery */}
          <div className="bg-brand-lightest rounded-2xl p-8 mb-8 shadow-lg">
            <h3 className="text-2xl font-bold text-brand-darkest mb-6 text-center">
              Step 1: Choose Your Image Source
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setUploadMethod("upload")}
                className={`p-8 rounded-xl border-2 transition-all ${
                  uploadMethod === "upload"
                    ? "border-brand-dark bg-brand-medium text-white shadow-xl scale-105"
                    : "border-brand-light bg-white hover:border-brand-medium"
                }`}
              >
                <div className="text-5xl mb-4">📤</div>
                <div className="font-bold text-xl mb-2">Upload Image</div>
                <p className={uploadMethod === "upload" ? "text-white" : "text-brand-darkest"}>
                  Choose from your device
                </p>
              </button>
              <button
                onClick={() => setUploadMethod("gallery")}
                className={`p-8 rounded-xl border-2 transition-all ${
                  uploadMethod === "gallery"
                    ? "border-brand-dark bg-brand-medium text-white shadow-xl scale-105"
                    : "border-brand-light bg-white hover:border-brand-medium"
                }`}
              >
                <div className="text-5xl mb-4">🖼️</div>
                <div className="font-bold text-xl mb-2">Choose From Gallery</div>
                <p className={uploadMethod === "gallery" ? "text-white" : "text-brand-darkest"}>
                  Browse our collection
                </p>
              </button>
            </div>
          </div>

          {uploadMethod && (
            <>
              {/* Step 2: Personalize */}
              <div className="bg-gradient-to-br from-brand-light to-brand-medium rounded-2xl p-8 mb-8 shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Step 2: Personalize
                </h3>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-brand-darkest mb-4 text-center">
                    Use the designer to customize your card
                  </p>
                  <button className="w-full bg-brand-dark text-white py-4 rounded-full font-semibold hover:bg-brand-darkest transition-all shadow-lg text-lg">
                    🎨 Open ArtKey Designer
                  </button>
                  <div className="mt-4 text-sm text-brand-darkest text-center">
                    Add text, stickers, filters, and more!
                  </div>
                </div>
              </div>

              {/* Card Type Options */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-brand-light">
                <h3 className="text-2xl font-bold text-brand-darkest mb-6 text-center">
                  Step 3: Choose Card Type
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border-2 border-brand-light rounded-xl p-6 hover:border-brand-medium hover:shadow-lg transition-all cursor-pointer text-center">
                    <div className="text-3xl mb-2">🎄</div>
                    <div className="font-semibold text-brand-darkest">Holiday Cards</div>
                    <div className="text-brand-medium font-bold mt-2">$19.99</div>
                  </div>
                  <div className="border-2 border-brand-light rounded-xl p-6 hover:border-brand-medium hover:shadow-lg transition-all cursor-pointer text-center">
                    <div className="text-3xl mb-2">🎂</div>
                    <div className="font-semibold text-brand-darkest">Birthday Cards</div>
                    <div className="text-brand-medium font-bold mt-2">$15.99</div>
                  </div>
                  <div className="border-2 border-brand-light rounded-xl p-6 hover:border-brand-medium hover:shadow-lg transition-all cursor-pointer text-center">
                    <div className="text-3xl mb-2">💝</div>
                    <div className="font-semibold text-brand-darkest">Thank You Cards</div>
                    <div className="text-brand-medium font-bold mt-2">$14.99</div>
                  </div>
                </div>
                <button 
                  className="w-full mt-6 bg-brand-dark text-white py-4 rounded-full font-semibold hover:bg-brand-darkest transition-all shadow-lg text-lg"
                  onClick={() => {
                    const params = new URLSearchParams({
                      product_type: 'card',
                    });
                    window.location.href = `/artkey/editor?${params}`;
                  }}
                >
                  🎨 Personalize with ArtKey
                </button>
                <button className="w-full mt-3 bg-brand-medium text-white py-4 rounded-full font-semibold hover:bg-brand-dark transition-all shadow-lg text-lg">
                  Add to Cart 🛒
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

