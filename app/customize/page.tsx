"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import GelatoEditor from "@/components/GelatoEditor";

interface DesignData {
  designId: string;
  previewUrl: string;
  productUid: string;
  variants: any[];
}

function CustomizeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const productId = searchParams.get("product_id") || "";
  const productType = searchParams.get("product_type") || "print";
  const productName = searchParams.get("product_name") || "Product";
  const basePrice = parseFloat(searchParams.get("price") || "0");

  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);
  
  // Design data from Gelato editor
  const [designData, setDesignData] = useState<DesignData | null>(null);

  // State for customization options
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [isFramed, setIsFramed] = useState<boolean | null>(null);
  const [frameColor, setFrameColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleDesignComplete = (data: DesignData) => {
    setDesignData(data);
    setCurrentStep(2); // Move to product options
  };

  // Product-specific options
  const printSizes = [
    { name: "5x7", price: 9.99, gelatoUid: "prints_pt_cl" },
    { name: "8x10", price: 14.99, gelatoUid: "prints_pt_cl" },
    { name: "11x14", price: 24.99, gelatoUid: "prints_pt_cl" },
    { name: "16x20", price: 39.99, gelatoUid: "canvas_print_gallery_wrap" },
    { name: "20x24", price: 59.99, gelatoUid: "canvas_print_gallery_wrap" },
    { name: "24x36", price: 89.99, gelatoUid: "canvas_print_gallery_wrap" },
  ];

  const materials = [
    { name: "Glossy Paper", price: 0, gelatoUid: "prints_pt_cl" },
    { name: "Matte Paper", price: 2.00, gelatoUid: "prints_pt_cl" },
    { name: "Canvas", price: 15.00, gelatoUid: "canvas_print_gallery_wrap" },
    { name: "Metal", price: 35.00, gelatoUid: "metal_prints" },
  ];

  const frameColors = [
    { name: "Black", price: 0 },
    { name: "White", price: 5.00 },
    { name: "Silver", price: 6.00 },
  ];

  const cardTypes = [
    { name: "Holiday Cards", price: 19.99, gelatoUid: "cards_cl_dtc_prt_pt" },
    { name: "Birthday Cards", price: 15.99, gelatoUid: "cards_cl_dtc_prt_pt" },
    { name: "Thank You Cards", price: 14.99, gelatoUid: "cards_cl_dtc_prt_pt" },
  ];

  const calculateTotal = () => {
    let total = basePrice;
    
    if (productType === "print") {
      if (selectedSize) {
        const size = printSizes.find(s => s.name === selectedSize);
        if (size) total = size.price;
      }
      if (selectedMaterial) {
        const material = materials.find(m => m.name === selectedMaterial);
        if (material) total += material.price;
      }
      if (isFramed && frameColor) {
        const frame = frameColors.find(f => f.name === frameColor);
        if (frame) total += frame.price + 20; // Base frame cost
      }
    } else if (productType === "card") {
      // Card pricing handled by card type selection
    }
    
    return (total * quantity).toFixed(2);
  };

  const handleContinueToArtKey = () => {
    // Save customization to session/cart
    const customization = {
      productId,
      productType,
      productName,
      designData: designData, // Include the uploaded image/design
      customizations: {
        size: selectedSize,
        material: selectedMaterial,
        frame: isFramed ? frameColor : null,
        isFramed,
        quantity,
      },
      basePrice: parseFloat(calculateTotal()) / quantity,
      totalPrice: parseFloat(calculateTotal()),
    };

    // Store in sessionStorage
    sessionStorage.setItem("productCustomization", JSON.stringify(customization));

    // Navigate to ArtKey Editor
    const params = new URLSearchParams({
      product_id: productId,
      product_type: productType,
      from_customize: "true",
    });
    router.push(`/artkey/editor?${params}`);
  };

  const canProceed = () => {
    if (productType === "print") {
      return selectedSize && selectedMaterial && isFramed !== null && (!isFramed || frameColor);
    } else if (productType === "card") {
      return true; // Cards have simpler requirements
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-brand-lightest pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-brand-darkest mb-2 font-playfair">
            Customize Your {productName}
          </h1>
          <p className="text-brand-dark">
            Upload your image, choose options, then personalize with ArtKey
          </p>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center mt-6 gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentStep >= 1 ? 'bg-brand-medium text-white' : 'bg-gray-200 text-gray-500'}`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</span>
              <span className="hidden sm:inline">Upload Image</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentStep >= 2 ? 'bg-brand-medium text-white' : 'bg-gray-200 text-gray-500'}`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</span>
              <span className="hidden sm:inline">Product Options</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentStep >= 3 ? 'bg-brand-medium text-white' : 'bg-gray-200 text-gray-500'}`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">3</span>
              <span className="hidden sm:inline">ArtKey</span>
            </div>
          </div>
        </div>

        {/* Step 1: Image Upload / Gelato Editor */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <GelatoEditor
              productUid={productType === 'card' ? 'cards_cl_dtc_prt_pt' : 'prints_pt_cl'}
              onDesignComplete={handleDesignComplete}
            />
          </div>
        )}

        {/* Step 2: Product Options */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Image Preview */}
            {designData?.previewUrl && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-brand-darkest font-playfair">Your Design</h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-brand-medium hover:text-brand-dark underline text-sm"
                  >
                    Change Image
                  </button>
                </div>
                <div className="flex justify-center">
                  <img 
                    src={designData.previewUrl} 
                    alt="Your design" 
                    className="max-h-48 rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}

        {/* Customization Options */}
        <div className="space-y-6">
          {/* Print-specific options */}
          {productType === "print" && (
            <>
              {/* Size Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-brand-darkest mb-4 font-playfair">
                  Choose Size
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {printSizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedSize === size.name
                          ? "border-brand-dark bg-brand-light shadow-lg scale-105"
                          : "border-brand-light hover:border-brand-medium"
                      }`}
                    >
                      <div className="font-bold text-lg text-brand-darkest mb-1">
                        {size.name}&quot;
                      </div>
                      <div className="text-brand-medium font-semibold">
                        ${size.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-brand-darkest mb-4 font-playfair">
                  Choose Material
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {materials.map((material) => (
                    <button
                      key={material.name}
                      onClick={() => setSelectedMaterial(material.name)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        selectedMaterial === material.name
                          ? "border-brand-dark bg-brand-light shadow-lg scale-105"
                          : "border-brand-light hover:border-brand-medium"
                      }`}
                    >
                      <div className="font-bold text-lg text-brand-darkest mb-1">
                        {material.name}
                      </div>
                      <div className="text-brand-medium font-semibold">
                        {material.price === 0 ? "Included" : `+$${material.price.toFixed(2)}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-brand-darkest mb-4 font-playfair">
                  Framed or Unframed?
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <button
                    onClick={() => {
                      setIsFramed(false);
                      setFrameColor(null);
                    }}
                    className={`p-8 rounded-xl border-2 transition-all ${
                      isFramed === false
                        ? "border-brand-dark bg-brand-light shadow-lg scale-105"
                        : "border-brand-light hover:border-brand-medium"
                    }`}
                  >
                    <div className="text-4xl mb-3">🖼️</div>
                    <div className="font-bold text-xl text-brand-darkest mb-2">Unframed</div>
                    <div className="text-brand-darkest">Print only</div>
                  </button>
                  <button
                    onClick={() => setIsFramed(true)}
                    className={`p-8 rounded-xl border-2 transition-all ${
                      isFramed === true
                        ? "border-brand-dark bg-brand-light shadow-lg scale-105"
                        : "border-brand-light hover:border-brand-medium"
                    }`}
                  >
                    <div className="text-4xl mb-3">🖼️</div>
                    <div className="font-bold text-xl text-brand-darkest mb-2">Framed</div>
                    <div className="text-brand-darkest">With professional frame</div>
                  </button>
                </div>

                {isFramed && (
                  <div className="border-t-2 border-brand-light pt-6">
                    <h3 className="font-bold text-lg text-brand-darkest mb-4 text-center">
                      Choose Frame Color:
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {frameColors.map((frame) => (
                        <button
                          key={frame.name}
                          onClick={() => setFrameColor(frame.name)}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            frameColor === frame.name
                              ? "border-brand-dark bg-brand-medium text-white shadow-lg scale-105"
                              : "border-brand-light hover:border-brand-medium"
                          }`}
                        >
                          <div
                            className={`w-12 h-12 mx-auto mb-3 rounded-full border-2 ${
                              frame.name === "Black"
                                ? "bg-gray-900 border-gray-700"
                                : frame.name === "White"
                                ? "bg-white border-gray-300"
                                : "bg-gray-400 border-gray-500"
                            }`}
                          ></div>
                          <div className={`font-bold ${frameColor === frame.name ? "text-white" : "text-brand-darkest"}`}>
                            {frame.name}
                          </div>
                          <div className={`text-sm mt-2 ${frameColor === frame.name ? "text-white" : "text-brand-medium"}`}>
                            {frame.price === 0 ? "+$0.00" : `+$${frame.price.toFixed(2)}`}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Card-specific options */}
          {productType === "card" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-brand-darkest mb-4 font-playfair">
                Choose Card Type
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {cardTypes.map((card) => (
                  <button
                    key={card.name}
                    className="p-6 rounded-xl border-2 border-brand-light hover:border-brand-medium hover:shadow-lg transition-all text-center"
                  >
                    <div className="font-bold text-lg text-brand-darkest mb-2">
                      {card.name}
                    </div>
                    <div className="text-brand-medium font-semibold">
                      ${card.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-brand-darkest mb-4 font-playfair">
              Quantity
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-brand-light text-brand-dark rounded-lg font-bold hover:bg-brand-medium transition-colors"
              >
                −
              </button>
              <span className="text-2xl font-bold text-brand-darkest w-16 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 bg-brand-light text-brand-dark rounded-lg font-bold hover:bg-brand-medium transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-br from-brand-dark to-brand-darkest rounded-2xl p-8 shadow-2xl text-white">
            <h2 className="text-2xl font-bold mb-6 text-center font-playfair">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Product:</span>
                <span className="font-semibold">{productName}</span>
              </div>
              {selectedSize && (
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="font-semibold">{selectedSize}&quot;</span>
                </div>
              )}
              {selectedMaterial && (
                <div className="flex justify-between">
                  <span>Material:</span>
                  <span className="font-semibold">{selectedMaterial}</span>
                </div>
              )}
              {isFramed !== null && (
                <div className="flex justify-between">
                  <span>Frame:</span>
                  <span className="font-semibold">
                    {isFramed ? `${frameColor || "Select color"}` : "Unframed"}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span className="font-semibold">{quantity}</span>
              </div>
              <div className="border-t border-brand-light pt-3 mt-4">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total:</span>
                  <span className="text-brand-light">${calculateTotal()}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleContinueToArtKey}
              disabled={!canProceed()}
              className={`w-full py-4 rounded-full font-bold text-lg transition-all shadow-lg ${
                canProceed()
                  ? "bg-brand-medium text-white hover:bg-brand-light"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              🎨 Continue to ArtKey Editor
            </button>
          </div>
        </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default function CustomizePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-lightest flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
      <CustomizeContent />
    </Suspense>
  );
}
