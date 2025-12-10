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
    <section className="py-20 bg-gradient-to-br from-brand-lightest to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            See How It Works
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
          <p className="text-lg text-brand-darkest max-w-2xl mx-auto">
            Watch our videos to learn how The Artful Experience makes creating personalized products simple and fun
          </p>
        </div>

        {/* Main Video Player */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-brand-dark to-brand-darkest rounded-2xl shadow-2xl overflow-hidden">
            {/* Video Player Container */}
            <div className="relative aspect-video bg-black">
              {/* Placeholder - Replace with actual video element */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-medium/50 to-brand-dark/50">
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">{videos[activeVideo].thumbnail}</div>
                  <p className="text-xl mb-4">Video Player</p>
                  <p className="text-sm opacity-75">Replace with actual video embed</p>
                  {/* 
                    When you provide the video files, this will be replaced with:
                    <video controls className="w-full h-full">
                      <source src={videos[activeVideo].videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  */}
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-8 bg-white">
              <h3 className="text-2xl font-bold text-brand-dark mb-3">
                {videos[activeVideo].title}
              </h3>
              <p className="text-brand-darkest leading-relaxed">
                {videos[activeVideo].description}
              </p>
            </div>
          </div>
        </div>

        {/* Video Selection Buttons */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(index)}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                activeVideo === index
                  ? "border-brand-dark bg-brand-light shadow-xl scale-105"
                  : "border-brand-light bg-white hover:border-brand-medium hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="text-5xl">{video.thumbnail}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-brand-darkest mb-1">
                    {video.title}
                  </h4>
                  <div className="text-brand-medium text-sm font-semibold">
                    {activeVideo === index ? "▶ Now Playing" : "▷ Click to Play"}
                  </div>
                </div>
              </div>
              <p className="text-brand-darkest text-sm">
                {video.description}
              </p>
            </button>
          ))}
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

