"use client";

import Image from "next/image";
import { useState } from "react";
import galleryData from "@/content/gallery.json";

export default function Gallery() {
  const { title, subtitle, featuredArtist, artworks, comingSoon } = galleryData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="gallery" className="py-20" style={{ backgroundColor: '#ecece9' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
          <p className="text-lg text-brand-darkest max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Featured Artist Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Artist Image */}
              <div className="relative h-96 md:h-auto">
                <Image
                  src={featuredArtist.image}
                  alt={featuredArtist.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Artist Info */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="text-sm uppercase tracking-wide text-brand-medium font-semibold">
                    {featuredArtist.title}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-brand-darkest mb-4">
                  {featuredArtist.name}
                </h3>
                <p className="text-lg text-brand-darkest leading-relaxed mb-4">
                  {featuredArtist.bio}
                </p>
                <p className="text-base text-brand-dark leading-relaxed">
                  {featuredArtist.description}
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 bg-brand-medium text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-dark transition-all shadow-lg w-fit"
                >
                  {featuredArtist.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-brand-darkest mb-2">
                  {artwork.title}
                </h4>
                <p className="text-brand-dark">
                  by {artwork.artist}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-brand-dark mb-4">
              {comingSoon.title}
            </h3>
            <p className="text-brand-darkest mb-6">
              {comingSoon.description}
            </p>
          </div>
        </div>
      </div>

      {/* Deanna Lankin Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src="/images/deanna-lankin-artist.jpg"
                  alt={`${featuredArtist.name} - Artist at work`}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-brand-darkest mb-4">
                  {featuredArtist.name}
                </h3>
                <p className="text-lg text-brand-darkest leading-relaxed mb-4">
                  {featuredArtist.bio}
                </p>
                <p className="text-base text-brand-dark leading-relaxed">
                  {featuredArtist.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

