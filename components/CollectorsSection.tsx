"use client";

import Image from "next/image";

export default function CollectorsSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3 font-playfair">
            For Collectors, Boutique Hotels, Restaurants & Special Spaces
          </h2>
          <p className="text-lg text-brand-medium">
            Please contact us to talk about these options
          </p>
        </div>

        {/* Central Hero Image */}
        <div className="mb-16">
          <div className="relative w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/collectors-commissioned.jpeg"
              alt="Collectors and commissioned art showcase"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Two Column Layout: Original Paintings & Commissions */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Original Paintings Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-3xl font-bold text-brand-darkest mb-2 font-playfair">
                Original Paintings
              </h3>
              <p className="text-brand-medium text-lg mb-6">
                Unique, handcrafted art pieces.
              </p>
              <p className="text-brand-darkest leading-relaxed mb-6">
                Our collection of original paintings represents the finest in contemporary and traditional art. 
                Each piece is carefully crafted by internationally recognized artists, bringing emotional resonance 
                and aesthetic beauty to any space. Whether you&apos;re a collector seeking investment pieces or 
                looking for the perfect artwork to enhance your home decor, our original paintings offer timeless 
                elegance and artistic excellence.
              </p>
            </div>
            <div className="relative w-full h-64 md:h-80 bg-brand-lightest">
              {/* Placeholder for ocean wave painting - user will provide actual image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-brand-medium text-lg mb-2">Ocean Wave Painting</p>
                  <p className="text-brand-medium text-sm">(Image to be provided)</p>
                </div>
              </div>
              {/* Uncomment when image is available:
              <Image
                src="/images/ocean-wave-painting.jpg"
                alt="Ocean wave painting"
                fill
                className="object-cover"
              />
              */}
            </div>
          </div>

          {/* Commissions Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-3xl font-bold text-brand-darkest mb-2 font-playfair">
                Commissions
              </h3>
              <p className="text-brand-medium text-lg mb-6">
                Personalized artwork for special occasions.
              </p>
              <p className="text-brand-darkest leading-relaxed mb-6">
                Work directly with our talented artists to create custom, personalized artwork that perfectly 
                captures your vision. Whether you have a specific theme, color palette, or image in mind, 
                our commission service allows you to collaborate with artists to bring your unique ideas to life. 
                Perfect for special occasions, corporate spaces, or one-of-a-kind pieces that tell your story.
              </p>
            </div>
            <div className="relative w-full h-64 md:h-80 bg-brand-lightest">
              {/* Placeholder for living room image - user will provide actual image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-brand-medium text-lg mb-2">Living Room Image</p>
                  <p className="text-brand-medium text-sm">(Image to be provided)</p>
                </div>
              </div>
              {/* Uncomment when image is available:
              <Image
                src="/images/living-room-commission.jpg"
                alt="Living room with commissioned art"
                fill
                className="object-cover"
              />
              */}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block bg-white rounded-2xl shadow-lg p-8">
            <p className="text-brand-darkest text-lg mb-6">
              Interested in original paintings or custom commissions?
            </p>
            <a
              href="#contact"
              className="inline-block bg-brand-dark text-white px-10 py-4 rounded-full font-semibold hover:bg-brand-darkest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

