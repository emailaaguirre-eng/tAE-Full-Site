"use client";

import { useState, useEffect } from "react";
import ArtKeyHoverPreview from "./ArtKeyHoverPreview";
import Image from "next/image";

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

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("bestsellers");
  const [wooProducts, setWooProducts] = useState<WooCommerceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from WordPress/WooCommerce
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=20');
        if (response.ok) {
          const data = await response.json();
          setWooProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fallback products if WooCommerce API fails
  const fallbackProducts = {
    bestsellers: [
      {
        name: "Upload Your Own Image(s)",
        price: "$14.99",
        image: "🖼️",
        rating: 5,
        reviews: 2847,
        description: "Upload your photos or create a stunning collage with your favorite memories"
      },
      {
        name: "Choose from Our Gallery",
        price: "$14.99",
        image: "🎭",
        rating: 5,
        reviews: 1654,
        description: "Browse beautiful stock images or artist-designed templates (coming soon)"
      },
      {
        name: "Canvas Wall Print",
        price: "$49.99",
        image: "🎨",
        rating: 5,
        reviews: 1876,
        description: "Gallery-wrapped canvas in multiple sizes"
      },
      {
        name: "Classic Photo Book",
        price: "$29.99",
        image: "📕",
        rating: 5,
        reviews: 1253,
        description: "8x8 inch hardcover with premium quality paper"
      },
    ],
    new: [
      {
        name: "Layflat Photo Book",
        price: "$39.99",
        image: "📘",
        rating: 5,
        reviews: 234,
        description: "12x12 inch seamless layflat design"
      },
      {
        name: "Acrylic Print",
        price: "$89.99",
        image: "💎",
        rating: 5,
        reviews: 167,
        description: "Stunning museum-quality acrylic display"
      },
      {
        name: "Photo Puzzle",
        price: "$24.99",
        image: "🧩",
        rating: 4,
        reviews: 89,
        description: "500-piece custom photo puzzle"
      },
      {
        name: "Wood Print",
        price: "$59.99",
        image: "🪵",
        rating: 5,
        reviews: 312,
        description: "Rustic wood panel with your photo"
      },
    ],
    sale: [
      {
        name: "Photo Calendar 2025",
        price: "$12.99",
        originalPrice: "$19.99",
        image: "📅",
        rating: 5,
        reviews: 543,
        description: "12-month wall calendar"
      },
      {
        name: "Throw Pillow",
        price: "$22.99",
        originalPrice: "$34.99",
        image: "🛋️",
        rating: 5,
        reviews: 321,
        description: "18x18 inch premium pillow with insert"
      },
      {
        name: "Photo Ornament Set",
        price: "$16.99",
        originalPrice: "$24.99",
        image: "🎄",
        rating: 5,
        reviews: 789,
        description: "Set of 4 ceramic photo ornaments"
      },
      {
        name: "Fleece Blanket",
        price: "$29.99",
        originalPrice: "$49.99",
        image: "🧸",
        rating: 5,
        reviews: 456,
        description: "50x60 inch ultra-soft fleece"
      },
    ],
    cards: [
      {
        name: "Holiday Cards",
        price: "$19.99",
        image: "🎄",
        rating: 5,
        reviews: 1892,
        description: "Christmas, Hanukkah, New Year & seasonal designs - Pack of 25"
      },
      {
        name: "Birthday Cards",
        price: "$17.99",
        image: "🎂",
        rating: 5,
        reviews: 1456,
        description: "Fun & elegant birthday templates for all ages"
      },
      {
        name: "Wedding Invitations",
        price: "$49.99",
        image: "💒",
        rating: 5,
        reviews: 987,
        description: "Elegant save-the-dates, invitations & thank you cards"
      },
      {
        name: "Birth Announcements",
        price: "$24.99",
        image: "👶",
        rating: 5,
        reviews: 1234,
        description: "Welcome your new arrival with beautiful photo cards"
      },
      {
        name: "Graduation Announcements",
        price: "$22.99",
        image: "🎓",
        rating: 5,
        reviews: 876,
        description: "High school, college & milestone graduation designs"
      },
      {
        name: "Bar & Bat Mitzvah",
        price: "$29.99",
        image: "✡️",
        rating: 5,
        reviews: 543,
        description: "Elegant invitations & thank you cards for your celebration"
      },
      {
        name: "Thank You Cards",
        price: "$14.99",
        image: "💌",
        rating: 5,
        reviews: 2341,
        description: "Express gratitude with personalized photo thank you cards"
      },
      {
        name: "Sympathy Cards",
        price: "$16.99",
        image: "🕊️",
        rating: 5,
        reviews: 432,
        description: "Thoughtful memorial & condolence cards"
      },
    ],
  };

  // Transform WooCommerce products to our format
  const transformWooProduct = (product: WooCommerceProduct) => {
    const price = product.sale_price || product.price || '0.00';
    const originalPrice = product.on_sale && product.regular_price ? product.regular_price : null;
    const imageUrl = product.images?.[0]?.src || null;
    const description = product.short_description || product.description || '';
    
    // Extract description (remove HTML tags)
    const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 100);
    
    return {
      id: product.id,
      name: product.name,
      price: `$${parseFloat(price).toFixed(2)}`,
      originalPrice: originalPrice ? `$${parseFloat(originalPrice).toFixed(2)}` : null,
      image: imageUrl,
      rating: parseFloat(product.average_rating || '4.5'),
      reviews: product.rating_count || Math.floor(Math.random() * 500) + 50,
      description: cleanDescription || 'Premium quality product',
      permalink: product.permalink,
      onSale: product.on_sale || false,
    };
  };

// Get products based on active tab
  const getCurrentProducts = () => {
    if (wooProducts.length > 0) {
      const transformed = wooProducts.map(transformWooProduct);

      if (activeTab === 'sale') {
        return transformed.filter(p => p.onSale).slice(0, 8);
      } else if (activeTab === 'new') {
        // For new, show first 8 products (you can sort by date if available)   
        return transformed.slice(0, 8);
      } else if (activeTab === 'cards') {
        // Filter products that contain "card" or "invitation" in name
        const cardProducts = transformed.filter(p => 
          p.name.toLowerCase().includes('card') || 
          p.name.toLowerCase().includes('invitation') ||
          p.name.toLowerCase().includes('announcement')
        );
        // If no card products from WooCommerce, use fallback
        if (cardProducts.length === 0) {
          return fallbackProducts.cards;
        }
        return cardProducts.slice(0, 8);
      } else {
        // For bestsellers, show products with highest ratings
        return transformed
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8);
      }
    }

    // Fallback to static products
    return fallbackProducts[activeTab as keyof typeof fallbackProducts] || [];  
  };

  const currentProducts = getCurrentProducts();

  return (
    <section
      id="shop" className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Featured Products
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto"></div>
        </div>

{/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab("bestsellers")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${  
              activeTab === "bestsellers"
                ? "bg-brand-dark text-white shadow-lg"
                : "bg-brand-lightest text-brand-darkest hover:bg-brand-light"   
            }`}
          >
            ⭐ Bestsellers
          </button>
          <button
            onClick={() => setActiveTab("cards")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${  
              activeTab === "cards"
                ? "bg-brand-dark text-white shadow-lg"
                : "bg-brand-lightest text-brand-darkest hover:bg-brand-light"   
            }`}
          >
            💌 Cards &amp; Invitations
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${  
              activeTab === "new"
                ? "bg-brand-dark text-white shadow-lg"
                : "bg-brand-lightest text-brand-darkest hover:bg-brand-light"   
            }`}
          >
            ✨ New Arrivals
          </button>
          <button
            onClick={() => setActiveTab("sale")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${  
              activeTab === "sale"
                ? "bg-brand-dark text-white shadow-lg"
                : "bg-brand-lightest text-brand-darkest hover:bg-brand-light"   
            }`}
          >
            🔥 On Sale
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
            <p className="mt-4 text-brand-darkest">Loading products...</p>
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-darkest">No products found. Showing sample products.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product, index) => {
              // Image with ArtKey signature in corner
              const ProductImage = (
                <div className="bg-gradient-to-br from-brand-light to-brand-medium h-48 flex items-center justify-center group-hover:scale-105 transition-transform relative overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <span className="text-7xl">🖼️</span>
                  )}
                </div>
              );
              
              const ProductCard = (
                <div
                  key={'id' in product ? product.id : index}
                  className="bg-brand-lightest rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer group"
                >
                {/* Image with ArtKey signature overlay */}
                <ArtKeyHoverPreview
                  productName={product.name}
                  productId={'id' in product ? product.id : `product-${index}`}
                  productInfo={{
                    description: product.description,
                    price: product.price,
                    image: typeof product.image === 'string' ? product.image : undefined,
                  }}
                >
                  {ProductImage}
                </ArtKeyHoverPreview>
              <div className="p-5">
                <h3 className="text-lg font-bold text-brand-darkest mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-brand-darkest mb-3">
                  {product.description}
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-brand-darkest ml-2">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {'originalPrice' in product && product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through mr-2">
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="text-xl font-bold text-brand-dark">
                      {product.price}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      // Determine product type
                      const productType = product.name.toLowerCase().includes('card') ? 'card' :
                                         product.name.toLowerCase().includes('print') || product.name.toLowerCase().includes('canvas') || product.name.toLowerCase().includes('art') ? 'print' :
                                         'print'; // default
                      
                      const params = new URLSearchParams({
                        product_id: (product as any).id?.toString() || `product-${index}`,
                        product_type: productType,
                        product_name: product.name,
                        price: product.price.replace('$', ''),
                        tab: activeTab,
                      });
                      window.location.href = `/customize?${params}`;
                    }}
                    className="bg-brand-medium text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
            );
            
              // Wrap first 2 products of each tab with Mini ArtKey
              if (index < 2) {
                return (
                  <ArtKeyHoverPreview
                    key={'id' in product ? product.id : index}
                    productName={product.name}
                    productId={'id' in product ? product.id : `product-${index}`}
                  >
                    {ProductCard}
                  </ArtKeyHoverPreview>
                );
              }
              return ProductCard;
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="bg-brand-dark text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-brand-darkest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
}

