"use client";

import Image from "next/image";

export default function WhatWeAre() {
  return (
    <section className="py-20" style={{ backgroundColor: '#ecece9' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 font-playfair">
            What We Are
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-6"></div>
          <p className="text-xl text-brand-darkest max-w-3xl mx-auto">
            The Artful Experience transforms your images into personalized art products enhanced with ArtKey technology—creating a living, interactive portal for your memories.
          </p>
        </div>

        {/* What We Sell */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="text-3xl font-bold text-brand-darkest mb-6 text-center font-playfair">
              We Sell Art Products
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🖼️</span>
                </div>
                <h4 className="text-xl font-bold text-brand-darkest mb-2">Prints</h4>
                <p className="text-brand-darkest">
                  High-quality prints on paper, canvas, or metal in various sizes
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">💌</span>
                </div>
                <h4 className="text-xl font-bold text-brand-darkest mb-2">Cards</h4>
                <p className="text-brand-darkest">
                  Personalized greeting cards, invitations, and announcements
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎨</span>
                </div>
                <h4 className="text-xl font-bold text-brand-darkest mb-2">Artwork</h4>
                <p className="text-brand-darkest">
                  Original paintings and commissioned pieces from talented artists
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ArtKey Technology */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-brand-dark rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🔑</span>
              </div>
              <h3 className="text-3xl font-bold text-brand-darkest mb-4 font-playfair">
                Every Product Includes ArtKey Technology
              </h3>
              <p className="text-lg text-brand-darkest max-w-2xl mx-auto">
                ArtKey is a discreet QR code embedded in your art that unlocks a personalized digital portal. 
                When scanned, it reveals all the special content you&apos;ve added.
              </p>
            </div>
            
            {/* ArtKey Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">📸</span>
                </div>
                <p className="text-brand-darkest font-semibold">Share Pictures</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🎬</span>
                </div>
                <p className="text-brand-darkest font-semibold">Upload Videos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🎵</span>
                </div>
                <p className="text-brand-darkest font-semibold">Music Playlists</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">✍️</span>
                </div>
                <p className="text-brand-darkest font-semibold">Guestbook</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">💭</span>
                </div>
                <p className="text-brand-darkest font-semibold">Share Interests</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works - Process Flow */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="text-3xl font-bold text-brand-darkest mb-8 text-center font-playfair">
              How It Works
            </h3>
            
            {/* Process Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-dark text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-brand-darkest mb-2">
                    Order Online (PC or Mobile)
                  </h4>
                  <p className="text-brand-darkest text-lg">
                    Visit our website on your computer or smartphone to start your order
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex justify-center">
                <div className="w-1 h-12 bg-brand-medium"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-dark text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-brand-darkest mb-2">
                    Upload Your Image
                  </h4>
                  <p className="text-brand-darkest text-lg">
                    Upload a photo from your device or choose from our gallery of artist-created pieces
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📤</span>
                </div>
              </div>

              {/* Divider */}
              <div className="flex justify-center">
                <div className="w-1 h-12 bg-brand-medium"></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-dark text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-brand-darkest mb-2">
                    Use Our Design Editor (Optional)
                  </h4>
                  <p className="text-brand-darkest text-lg">
                    Customize your image with our easy-to-use design tools, add text, filters, and effects
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
              </div>

              {/* Divider */}
              <div className="flex justify-center">
                <div className="w-1 h-12 bg-brand-medium"></div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-dark text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-brand-darkest mb-2">
                    Create Your ArtKey Portal
                  </h4>
                  <p className="text-brand-darkest text-lg">
                    Personalize your ArtKey by adding pictures, videos, music playlists, a guestbook for signatures, 
                    and share your interests. This creates a unique digital experience linked to your physical art.
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔑</span>
                </div>
              </div>

              {/* Divider */}
              <div className="flex justify-center">
                <div className="w-1 h-12 bg-brand-medium"></div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-brand-dark text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    5
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-brand-darkest mb-2">
                    Receive Your Art
                  </h4>
                  <p className="text-brand-darkest text-lg">
                    We print and ship your personalized art product. Recipients scan the ArtKey QR code 
                    to access all the special content you&apos;ve created.
                  </p>
                </div>
                <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-brand-dark to-brand-darkest rounded-2xl shadow-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4 font-playfair">
              Art + Technology = Living Memories
            </h3>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              We don&apos;t just sell art products—we create interactive experiences that bring your memories to life 
              through the power of ArtKey technology. Every piece tells a story, and every story is accessible with a simple scan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

