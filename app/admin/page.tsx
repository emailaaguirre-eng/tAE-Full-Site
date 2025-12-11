"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
    router.refresh();
  };

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-brand-lightest flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-brand-darkest mb-2">Loading...</div>
          <div className="text-gray-600">Checking authentication...</div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated (though middleware should handle this)
  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-brand-lightest">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-brand-dark to-brand-darkest text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold font-playfair">Admin Dashboard</h1>
              <p className="text-white/80 mt-1">Manage your store and products</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all border border-white/30"
              >
                👁️ View Website
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all border border-white/30"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6">
          <div className="flex border-b border-brand-light">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-4 font-semibold transition-all border-b-2 ${
                activeTab === "overview"
                  ? "border-brand-dark text-brand-dark"
                  : "border-transparent text-gray-600 hover:text-brand-dark"
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-4 font-semibold transition-all border-b-2 ${
                activeTab === "products"
                  ? "border-brand-dark text-brand-dark"
                  : "border-transparent text-gray-600 hover:text-brand-dark"
              }`}
            >
              📦 Products
            </button>
            <Link
              href="/admin/artkey-config"
              className={`px-6 py-4 font-semibold transition-all border-b-2 border-transparent text-gray-600 hover:text-brand-dark`}
            >
              ✨ ArtKey Config
            </Link>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-4 font-semibold transition-all border-b-2 ${
                activeTab === "orders"
                  ? "border-brand-dark text-brand-dark"
                  : "border-transparent text-gray-600 hover:text-brand-dark"
              }`}
            >
              🛒 Orders
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-4 font-semibold transition-all border-b-2 ${
                activeTab === "settings"
                  ? "border-brand-dark text-brand-dark"
                  : "border-transparent text-gray-600 hover:text-brand-dark"
              }`}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-brand-darkest font-playfair">Dashboard Overview</h2>
              
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-brand-light to-brand-medium rounded-xl p-6 text-white">
                  <div className="text-3xl font-bold">0</div>
                  <div className="text-sm opacity-90 mt-1">Total Products</div>
                </div>
                <div className="bg-gradient-to-br from-brand-medium to-brand-dark rounded-xl p-6 text-white">
                  <div className="text-3xl font-bold">0</div>
                  <div className="text-sm opacity-90 mt-1">Total Orders</div>
                </div>
                <div className="bg-gradient-to-br from-brand-dark to-brand-darkest rounded-xl p-6 text-white">
                  <div className="text-3xl font-bold">$0</div>
                  <div className="text-sm opacity-90 mt-1">Total Revenue</div>
                </div>
                <div className="bg-gradient-to-br from-brand-lightest to-brand-light rounded-xl p-6 border-2 border-brand-medium">
                  <div className="text-3xl font-bold text-brand-darkest">0</div>
                  <div className="text-sm text-brand-darkest mt-1">Pending Orders</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-brand-darkest mb-4">Quick Actions</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link
                    href="/admin/products/new"
                    className="bg-brand-medium text-white p-6 rounded-xl hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">➕</div>
                    <div className="font-bold text-lg">Add New Product</div>
                    <div className="text-sm opacity-90 mt-1">Create a new product listing</div>
                  </Link>
                  <Link
                    href="/admin/products"
                    className="bg-brand-light text-brand-darkest p-6 rounded-xl hover:bg-brand-medium hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">📦</div>
                    <div className="font-bold text-lg">Manage Products</div>
                    <div className="text-sm opacity-90 mt-1">Edit or delete products</div>
                  </Link>
                  <Link
                    href="/admin/artkey-config"
                    className="bg-brand-lightest border-2 border-brand-medium text-brand-darkest p-6 rounded-xl hover:border-brand-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">✨</div>
                    <div className="font-bold text-lg">ArtKey Config</div>
                    <div className="text-sm opacity-90 mt-1">Configure mini ArtKey hover</div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-brand-darkest font-playfair">Products</h2>
                <Link
                  href="/admin/products/new"
                  className="bg-brand-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-darkest transition-all shadow-lg"
                >
                  ➕ Add New Product
                </Link>
              </div>
              <p className="text-gray-600 mb-4">Click &quot;Add New Product&quot; to get started, or manage existing products below.</p>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold text-brand-darkest font-playfair mb-6">Orders</h2>
              <p className="text-gray-600">Order management coming soon...</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-2xl font-bold text-brand-darkest font-playfair mb-6">Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">🔑 API Configuration</h3>
                  <p className="text-sm text-blue-800 mb-2">Configure your WooCommerce and Gelato API keys in your environment variables.</p>
                  <Link href="/WOOCOMMERCE-REST-API-SETUP.md" className="text-blue-600 hover:underline text-sm">
                    View Setup Guide →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

