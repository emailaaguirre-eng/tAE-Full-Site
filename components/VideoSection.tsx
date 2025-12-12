"use client";

import { useState } from "react";

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<number>(0);

  // Placeholder for video sources - replace with actual video URLs/files
  const videos = [
    {
      id: 1,
      title: "How The Artful Experience Works",
      description: "Discover how easy it is to transform your photos into stunning personalized products with our ArtKey technology.",
      thumbnail: "🎬",
      videoUrl: "/videos/product-overview.mp4", // Replace with actual video path
    },
    {
      id: 2,
      title: "Creating Custom Art with ArtKey",
      description: "Learn how our innovative ArtKey designer brings your images to life with professional artistic effects and customization.",
      thumbnail: "🎨",
      videoUrl: "/videos/artkey-demo.mp4", // Replace with actual video path
    },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Welcome to The Artful Experience Gallery and Upload Center
          </h1>
          <h2 className="text-2xl md:text-3xl font-normal text-brand-dark mb-4">
            Where soul-stirring art and images become a living portal.
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
          <div className="text-lg text-brand-darkest max-w-2xl mx-auto space-y-4 text-left">
            <p>
              Give a gift that will never be forgotten, even if that gift is for you.
            </p>
            <p>
              Discover our "Art Key" technology that allows you to upload videos, music and time-rleeased gift certificates that are embedded in the art.
            </p>
            <p>
              When the giftee scans the "Art Key/QR Code," they will be surprised by the unique message, video, song, or gift certificate you have uploaded for them.
            </p>
          </div>
        </div>

        {/* Two Purchase Options */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Upload Your Image */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <button className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-semibold text-sm">
                  Upload Your Image
                </button>
              </div>
              <div className="aspect-[4/3] bg-gray-100 relative">
                <img 
                  src="/images/uploadyourprint.png" 
                  alt="Upload your image" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <ul className="space-y-2 text-brand-darkest">
                <li className="flex items-start gap-2">
                  <span className="text-brand-medium">•</span>
                  <span>Just upload a photo to create your own art print</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-medium">•</span>
                  <span>Choose from one of our sizes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-medium">•</span>
                  <span>Available on paper or canvas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-medium">•</span>
                  <span>Select unframed, or choose from our framing options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-medium">•</span>
                  <span>Follow our prompts to upload your own media</span>
                </li>
              </ul>
              <p className="text-sm text-brand-dark italic">
                You will have editing options available with our design tool.
              </p>
            </div>
          </div>

          {/* Right: Buy an Existing Print or Painting */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <button className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-semibold text-sm">
                  Buy an Existing Print or Painting
                </button>
              </div>
              <div className="aspect-[4/3] bg-gray-100 relative">
                <img 
                  src="/images/buyanexistingprint.jpg" 
                  alt="Gallery art" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-brand-darkest">
                Or select art and photography from our gallery of internationally recognized artists.
              </p>
              <p className="text-brand-darkest">
                All paintings, photography, and reproductions include the artist's narrative, background, and inspiration behind the piece.
              </p>
              <p className="text-brand-darkest italic">
                This option also allows for the upload of your own media.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-block bg-white rounded-2xl shadow-lg p-8">
            <p className="text-brand-darkest text-lg mb-4">
              Ready to create your own personalized products?
            </p>
            <a
              href="#products"
              className="inline-block bg-brand-dark text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-darkest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Creating Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

