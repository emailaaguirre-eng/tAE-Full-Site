"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductFormData {
  name: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  sku: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  manage_stock: boolean;
  stock_quantity: string;
  categories: string[];
  tags: string[];
  images: string[];
  type: "simple" | "variable" | "grouped";
  status: "draft" | "publish";
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    short_description: "",
    price: "",
    regular_price: "",
    sale_price: "",
    sku: "",
    stock_status: "instock",
    manage_stock: false,
    stock_quantity: "",
    categories: [],
    tags: [],
    images: [],
    type: "simple",
    status: "draft",
  });

  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const preview = URL.createObjectURL(file);
      newPreviews.push(preview);

      // Upload to server/Gelato
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/gelato/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          newImages.push(result.fileUrl);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }

    setImagePreview([...imagePreview, ...newPreviews]);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create product in WooCommerce
      const response = await fetch("/api/woocommerce/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          status: formData.status,
          description: formData.description,
          short_description: formData.short_description,
          sku: formData.sku,
          price: formData.price || formData.regular_price,
          regular_price: formData.regular_price,
          sale_price: formData.sale_price || "",
          stock_status: formData.stock_status,
          manage_stock: formData.manage_stock,
          stock_quantity: formData.stock_quantity || null,
          images: formData.images.map((url) => ({ src: url })),
          categories: formData.categories.map((id) => ({ id: parseInt(id) })),
        }),
      });

      if (response.ok) {
        const product = await response.json();
        router.push(`/admin/products?success=true&id=${product.id}`);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to create product"}`);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Basic Info", icon: "📝" },
    { number: 2, title: "Pricing", icon: "💰" },
    { number: 3, title: "Images", icon: "🖼️" },
    { number: 4, title: "Review", icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-brand-lightest">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-dark to-brand-darkest text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-3xl font-bold font-playfair">Add New Product</h1>
              <p className="text-white/80 mt-1">Create a new product for your store</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <button
                    onClick={() => setStep(s.number)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step === s.number
                        ? "bg-brand-dark text-white scale-110"
                        : step > s.number
                        ? "bg-brand-medium text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > s.number ? "✓" : s.number}
                  </button>
                  <div className="mt-2 text-xs font-semibold text-center">{s.title}</div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded ${
                      step > s.number ? "bg-brand-medium" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-brand-darkest font-playfair">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-semibold text-brand-darkest mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                  placeholder="e.g., Custom Photo Print - 8x10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-darkest mb-2">
                  Short Description
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) => handleInputChange("short_description", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                  placeholder="Brief description shown in product listings"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-darkest mb-2">
                  Full Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                  placeholder="Detailed product description"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    SKU (Stock Keeping Unit)
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                    placeholder="e.g., PRINT-8X10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    Product Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                  >
                    <option value="simple">Simple Product</option>
                    <option value="variable">Variable Product</option>
                    <option value="grouped">Grouped Product</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-brand-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-darkest transition-all"
                >
                  Next: Pricing →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Pricing */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-brand-darkest font-playfair">Pricing & Inventory</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    Regular Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={formData.regular_price}
                      onChange={(e) => {
                        handleInputChange("regular_price", e.target.value);
                        if (!formData.price) {
                          handleInputChange("price", e.target.value);
                        }
                      }}
                      className="w-full pl-8 pr-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    Sale Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.sale_price}
                      onChange={(e) => handleInputChange("sale_price", e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    Stock Status
                  </label>
                  <select
                    value={formData.stock_status}
                    onChange={(e) => handleInputChange("stock_status", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                  >
                    <option value="instock">In Stock</option>
                    <option value="outofstock">Out of Stock</option>
                    <option value="onbackorder">On Backorder</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-brand-lightest rounded-lg">
                <input
                  type="checkbox"
                  id="manage_stock"
                  checked={formData.manage_stock}
                  onChange={(e) => handleInputChange("manage_stock", e.target.checked)}
                  className="w-5 h-5 text-brand-dark"
                />
                <label htmlFor="manage_stock" className="font-semibold text-brand-darkest">
                  Manage Stock Quantity
                </label>
              </div>

              {formData.manage_stock && (
                <div>
                  <label className="block text-sm font-semibold text-brand-darkest mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock_quantity}
                    onChange={(e) => handleInputChange("stock_quantity", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-brand-light rounded-lg focus:border-brand-medium focus:outline-none"
                    placeholder="0"
                  />
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border-2 border-brand-light text-brand-dark rounded-full font-semibold hover:bg-brand-lightest transition-all"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-brand-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-darkest transition-all"
                >
                  Next: Images →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Images */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-brand-darkest font-playfair">Product Images</h2>
              
              <div className="border-2 border-dashed border-brand-light rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">📤</div>
                <p className="text-brand-darkest mb-4 font-semibold">Upload Product Images</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block bg-brand-medium text-white px-6 py-3 rounded-full font-semibold cursor-pointer hover:bg-brand-dark transition-all"
                >
                  Choose Images
                </label>
                <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 10MB each</p>
              </div>

              {imagePreview.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-brand-light"
                      />
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-brand-dark text-white text-xs px-2 py-1 rounded">
                          Main
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(imagePreview.filter((_, i) => i !== index));
                          setFormData((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index),
                          }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border-2 border-brand-light text-brand-dark rounded-full font-semibold hover:bg-brand-lightest transition-all"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 bg-brand-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-darkest transition-all"
                >
                  Next: Review →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-brand-darkest font-playfair">Review & Publish</h2>
              
              <div className="bg-brand-lightest rounded-xl p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-brand-darkest mb-2">Product Name</h3>
                  <p className="text-brand-dark">{formData.name || "Not set"}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-brand-darkest mb-2">Description</h3>
                  <p className="text-brand-dark">{formData.short_description || "No description"}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-brand-darkest mb-2">Regular Price</h3>
                    <p className="text-brand-dark text-xl font-bold">${formData.regular_price || "0.00"}</p>
                  </div>
                  {formData.sale_price && (
                    <div>
                      <h3 className="font-semibold text-brand-darkest mb-2">Sale Price</h3>
                      <p className="text-brand-dark text-xl font-bold text-red-600">${formData.sale_price}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-brand-darkest mb-2">Images</h3>
                  <p className="text-brand-dark">{imagePreview.length} image(s) uploaded</p>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 p-4 bg-brand-lightest rounded-lg">
                  <input
                    type="radio"
                    checked={formData.status === "draft"}
                    onChange={() => handleInputChange("status", "draft")}
                    className="w-5 h-5 text-brand-dark"
                  />
                  <div>
                    <div className="font-semibold text-brand-darkest">Save as Draft</div>
                    <div className="text-sm text-gray-600">Product won&apos;t be visible to customers</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-brand-lightest rounded-lg mt-2">
                  <input
                    type="radio"
                    checked={formData.status === "publish"}
                    onChange={() => handleInputChange("status", "publish")}
                    className="w-5 h-5 text-brand-dark"
                  />
                  <div>
                    <div className="font-semibold text-brand-darkest">Publish Now</div>
                    <div className="text-sm text-gray-600">Product will be visible to customers immediately</div>
                  </div>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 border-2 border-brand-light text-brand-dark rounded-full font-semibold hover:bg-brand-lightest transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-brand-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-darkest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "✅ Create Product"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

