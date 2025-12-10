"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  images: Array<{ src: string }>;
  status: string;
}

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      // Show success message
      setTimeout(() => {
        router.replace("/admin/products");
      }, 3000);
    }
    fetchProducts();
  }, [filter, searchParams, router]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const status = filter === "all" ? undefined : filter;
      const response = await fetch(`/api/woocommerce/products?per_page=50${status ? `&status=${status}` : ""}`);
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: number) => {
    if (!confirm(`Are you sure you want to delete this product?`)) {
      return;
    }

    try {
      // Delete via WooCommerce API
      const WC_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
      const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
      const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

      if (!WC_URL || !WC_KEY || !WC_SECRET) {
        alert("WooCommerce API not configured");
        return;
      }

      const authString = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");

      const response = await fetch(`${WC_URL}/wp-json/wc/v3/products/${productId}?force=true`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${authString}`,
        },
      });

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== productId));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-brand-lightest">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-dark to-brand-darkest text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin")}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                ← Back to Dashboard
              </button>
              <div>
                <h1 className="text-3xl font-bold font-playfair">Products</h1>
                <p className="text-white/80 mt-1">Manage your product catalog</p>
              </div>
            </div>
            <Link
              href="/admin/products/new"
              className="bg-white text-brand-dark px-6 py-3 rounded-full font-semibold hover:bg-brand-lightest transition-all shadow-lg"
            >
              ➕ Add New Product
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {searchParams.get("success") === "true" && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
            ✅ Product created successfully! (ID: {searchParams.get("id")})
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                filter === "all"
                  ? "bg-brand-dark text-white"
                  : "bg-brand-lightest text-brand-darkest hover:bg-brand-light"
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilter("published")}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                filter === "published"
                  ? "bg-brand-dark text-white"
                  : "bg-brand-lightest text-brand-darkest hover:bg-brand-light"
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                filter === "draft"
                  ? "bg-brand-dark text-white"
                  : "bg-brand-lightest text-brand-darkest hover:bg-brand-light"
              }`}
            >
              Drafts
            </button>
          </div>
        </div>

        {/* Products List */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
            <p className="mt-4 text-brand-darkest">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-brand-darkest mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first product!</p>
            <Link
              href="/admin/products/new"
              className="inline-block bg-brand-dark text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-darkest transition-all shadow-lg"
            >
              ➕ Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="relative h-48 bg-gradient-to-br from-brand-light to-brand-medium">
                  {product.images?.[0]?.src ? (
                    <Image
                      src={product.images[0].src}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      🖼️
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === "publish"
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-brand-darkest mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    {product.sale_price ? (
                      <>
                        <span className="text-xl font-bold text-brand-dark">
                          ${product.sale_price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ${product.regular_price}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-brand-dark">
                        ${product.regular_price || product.price || "0.00"}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                      className="flex-1 bg-brand-light text-brand-darkest px-4 py-2 rounded-lg font-semibold hover:bg-brand-medium hover:text-white transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-lightest flex items-center justify-center"><div className="text-xl">Loading products...</div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
