"use client";

import { useState, useEffect, useRef } from "react";

interface HeroContent {
  headline1: string;
  headline2: string;
  subtitle: string;
  description: string;
}

export default function Hero() {
  const [selectedOption, setSelectedOption] = useState<"upload" | "gallery" | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [shareMessage, setShareMessage] = useState("I wanted to share moments with you");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  
  const [heroContent, setHeroContent] = useState<HeroContent>({
    headline1: 'Every image has a story.',
    headline2: 'Embedded within is a treasure.',
    subtitle: 'Where soul-stirring art and images become a living portal.',
    description: 'Give a gift that will never be forgotten—even if that gift is for you.\nUpload a photo or choose from our gallery and layer in video, music, or time-released messages.',
  });

  // Fetch hero content from WordPress
  useEffect(() => {
    fetch('/api/hero-content')
      .then(res => res.json())
      .then(data => setHeroContent(data))
      .catch(err => console.error('Error fetching hero content:', err));
  }, []);

  // Generate QR code when images are selected
  useEffect(() => {
    if (selectedImages.length > 0) {
      // Generate QR code URL (you can use a QR code API or library)
      const shareUrl = `${window.location.origin}/share/${Date.now()}`;
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`);
    }
  }, [selectedImages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...imageUrls].slice(0, 3)); // Max 3 images
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section
      id="home"
      className="relative pt-16 min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#f3f3f3' }}
    >
      {/* Organic background shapes - more artistic */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-light/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-medium/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-brand-dark/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Typography with more personality */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-7xl md:text-9xl font-normal text-brand-dark leading-[0.9] tracking-tight font-playfair">
                {heroContent.headline1}
              </h1>
              <h2 className="text-[3.15rem] md:text-[5.6rem] font-normal text-brand-darkest leading-[0.85] tracking-tighter font-playfair">
                {heroContent.headline2}
              </h2>
            </div>
            
            <div className="pl-2 border-l-4 border-brand-medium space-y-4">
              <p className="text-lg md:text-xl text-brand-darkest leading-relaxed font-light">
                {heroContent.subtitle.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < heroContent.subtitle.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
              <p className="text-base md:text-lg text-brand-dark leading-relaxed">
                {heroContent.description.split('\n').map((line, i) => (
                  <span key={i}>
                    {i === 0 && line.includes('ArtKey') ? (
                      <>
                        {line.split('ArtKey')[0]}
                        <span className="font-bold text-brand-darkest">ArtKey</span>
                        {line.split('ArtKey')[1]}
                      </>
                    ) : (
                      line
                    )}
                    {i < heroContent.description.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>

            {/* Action buttons - more refined */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => setSelectedOption("upload")}
                className="group relative bg-brand-dark text-white px-8 py-4 text-base font-medium hover:bg-brand-darkest transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Image
                </span>
                <div className="absolute inset-0 bg-brand-darkest transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
              <button
                onClick={() => setSelectedOption("gallery")}
                className="group relative bg-white text-brand-dark px-8 py-4 text-base font-medium border-2 border-brand-dark hover:bg-brand-lightest transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Browse Gallery
                </span>
              </button>
            </div>
          </div>

          {/* Right side - Upload interface or placeholder */}
          <div className="relative">
            {selectedOption === "upload" ? (
              <div className="bg-brand-lightest/95 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-brand-light animate-fade-in min-h-[500px]">
                <h3 className="text-lg font-bold text-brand-darkest mb-6 font-playfair">Select and Photos</h3>
                
                <div className="grid grid-cols-12 gap-4 h-full">
                  {/* Left: Action buttons sidebar */}
                  <div className="col-span-3 space-y-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-brand-medium text-white px-4 py-3 rounded-xl font-medium hover:bg-brand-dark transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Select
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <button
                      onClick={() => setSelectedOption(null)}
                      className="w-full bg-white text-brand-dark px-4 py-3 rounded-xl font-medium border border-brand-light hover:bg-brand-lightest transition-colors"
                    >
                      Back
                    </button>
                  </div>

                  {/* Center: Image thumbnails (stacked vertically) */}
                  <div className="col-span-5 space-y-3 flex flex-col">
                    {selectedImages.length > 0 ? (
                      selectedImages.map((img, index) => (
                        <div key={index} className="relative group flex-shrink-0">
                          <img
                            src={img}
                            alt={`Selected ${index + 1}`}
                            className="w-full h-36 object-cover rounded-lg border-2 border-white shadow-md"
                          />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-3 flex-1 flex flex-col">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex-1 min-h-[120px] bg-white border-2 border-brand-light rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-brand-dark/20 text-xs">Photo {i}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Share section with QR code */}
                  <div className="col-span-4 bg-brand-lightest/60 rounded-lg p-4 space-y-4 flex flex-col">
                    <textarea
                      value={shareMessage}
                      onChange={(e) => setShareMessage(e.target.value)}
                      className="w-full bg-transparent text-brand-darkest text-sm resize-none border-none focus:outline-none font-playfair flex-1"
                      rows={3}
                      placeholder="I wanted to share moments with you"
                    />
                    {selectedImages.length > 0 && qrCodeUrl && (
                      <div className="flex flex-col items-center space-y-2 mt-auto">
                        <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40 bg-white p-3 rounded-lg shadow-md" />
                        <p className="text-xs text-brand-dark/60 text-center font-playfair">
                          Scan to explore
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : selectedOption === "gallery" ? (
              <div className="bg-white/90 backdrop-blur-md p-8 shadow-2xl border border-brand-light/50 animate-fade-in">
                <p className="text-brand-dark font-medium mb-6 text-sm uppercase tracking-wide">
                  Select Product Type
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="#cards"
                    className="group relative bg-gradient-to-br from-brand-light to-brand-medium p-8 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-white/20 rounded mb-4 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="text-white font-bold text-lg">Cards</div>
                    </div>
                    <div className="absolute inset-0 bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </a>
                  <a
                    href="#prints"
                    className="group relative bg-gradient-to-br from-brand-medium to-brand-dark p-8 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-white/20 rounded mb-4 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-white font-bold text-lg">Prints</div>
                    </div>
                    <div className="absolute inset-0 bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </a>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-brand-light/50 to-brand-medium/30 border-2 border-brand-dark/10 flex items-center justify-center overflow-hidden rounded-lg">
                <img 
                  src="/images/tAE_Holiday_Hero.png" 
                  alt="TheAE Hero" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Organic wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80L48 75C96 70 192 60 288 55C384 50 480 50 576 52.5C672 55 768 60 864 62.5C960 65 1056 65 1152 60C1248 55 1344 45 1392 40L1440 35V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
            className="opacity-90"
          />
        </svg>
      </div>
    </section>
  );
}

