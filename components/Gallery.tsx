"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import galleryData from "@/content/gallery.json";

interface WooCommerceProduct {
  id: number;
  name: string;
  price: string;
  regular_price?: string;
  sale_price?: string;
  images?: Array<{ src: string; alt: string }>;
  description?: string;
  short_description?: string;
  average_rating?: string;
  rating_count?: number;
  on_sale?: boolean;
  permalink?: string;
}

export default function Gallery() {
  const { title, subtitle, featuredArtist, comingSoon } = galleryData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wooProducts, setWooProducts] = useState<WooCommerceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from WooCommerce API (excluding collage)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=100');
        if (response.ok) {
          const data = await response.json();
          // Filter out products with "collage" in the name (case-insensitive)
          const filteredProducts = data.filter((product: WooCommerceProduct) => 
            !product.name.toLowerCase().includes('collage')
          );
          setWooProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-20" style={{ backgroundColor: '#ecece9' }}>
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

        {/* Featured Artist: Deanna Lankin */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Artist Profile Picture */}
              <div className="relative h-96 md:h-auto min-h-[400px]">
                <Image
                  src={featuredArtist.image}
                  alt={featuredArtist.name}
                  fill
                  className="object-contain"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              
              {/* Artist Bio */}
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
                <p className="text-base text-brand-dark leading-relaxed mb-6">
                  {featuredArtist.description}
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-brand-medium text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-dark transition-all shadow-lg w-fit"
                >
                  {featuredArtist.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Deanna Lankin's Artwork for Sale */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-brand-darkest mb-8 text-center">
            Artwork by {featuredArtist.name}
          </h3>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-brand-dark">Loading artwork...</p>
            </div>
          ) : wooProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brand-dark">No artwork available at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wooProducts.map((product) => {
                const productImage = product.images && product.images.length > 0 
                  ? product.images[0].src 
                  : '/images/placeholder.jpg';
                const price = product.sale_price || product.price || '0.00';
                
                return (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                        style={{ objectPosition: 'center' }}
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-brand-darkest mb-2">
                        {product.name}
                      </h4>
                      <p className="text-brand-dark mb-2">
                        by {featuredArtist.name}
                      </p>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-brand-medium">
                          ${price}
                        </span>
                        {product.on_sale && product.regular_price && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.regular_price}
                          </span>
                        )}
                      </div>
                      {product.short_description && (
                        <p className="text-sm text-brand-darkest mb-4 line-clamp-2">
                          {product.short_description}
                        </p>
                      )}
                      <a 
                        href={product.permalink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-brand-medium text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-dark transition-all text-center"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

      {/* Deanna Lankin Artist Modal */}
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
              <div className="relative h-96 md:h-[500px] bg-gray-50">
                <Image
                  src="/images/deanna-lankin-artist.jpg"
                  alt={`${featuredArtist.name} - Artist at work`}
                  fill
                  className="object-contain rounded-t-2xl"
                  style={{ objectPosition: 'center top' }}
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
