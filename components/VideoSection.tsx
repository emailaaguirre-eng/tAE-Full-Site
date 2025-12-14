"use client";

import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Welcome to The Artful Experience Gallery and Upload Center
          </h1>
          <h2 className="text-2xl md:text-3xl font-normal text-brand-dark mb-4">
            Where soul-stirring art and images become a living portal.
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-6"></div>
          <div className="text-lg text-brand-darkest max-w-3xl mx-auto space-y-4">
            <p>
              Give a gift that will never be forgotten, even if that gift is for you.
            </p>
            <p>
              Discover our ArtKey technology that allows you to upload videos, music and time-released gift certificates that are embedded in the art.
            </p>
            <p>
              When the giftee scans the ArtKey/QR Code, they will be surprised by the unique message, video, song, or gift certificate you have uploaded for them.
            </p>
          </div>
        </div>

        {/* Three-Column Layout: Physical Items | ArtKey Portal | Options */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16 items-start">
          {/* Left: Physical Items Stack */}
          <div className="flex flex-col items-center lg:items-end space-y-0 relative">
            <div className="relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl p-6 w-52 h-72 flex flex-col items-center justify-center border-2 border-amber-300">
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center shadow-md">
                    <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <p className="text-amber-900 text-3xl mt-12 font-playfair italic">Invitation</p>
              </div>
            </div>
            <div className="relative z-20 transform -rotate-2 hover:rotate-0 transition-transform duration-300 -mt-6">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow-2xl p-6 w-52 h-72 flex flex-col items-center justify-center border-2 border-pink-300">
                <div className="absolute inset-6 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full border-4 border-pink-400 flex items-center justify-center shadow-inner">
                    <p className="text-pink-800 text-2xl font-playfair italic">Thank You</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-30 transform rotate-1 hover:rotate-0 transition-transform duration-300 -mt-6">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg shadow-2xl w-52 h-56 overflow-hidden border-2 border-slate-400">
                <div className="w-full h-full bg-gradient-to-br from-orange-300 via-pink-300 to-purple-300 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-80">
                    <div className="w-full h-1/3 bg-gradient-to-b from-orange-500/50 to-transparent"></div>
                    <div className="w-full h-1/3 bg-gradient-to-b from-transparent via-pink-500/30 to-transparent"></div>
                    <div className="w-full h-1/3 bg-gradient-to-t from-purple-500/50 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-800/60 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Center: ArtKey Portal Smartphone */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl max-w-[280px] w-full">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
              
              {/* Phone Screen */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden pt-10 pb-6 px-5 min-h-[500px] relative">
                <h3 className="text-2xl font-bold text-brand-darkest mb-6 text-center font-playfair">
                  ArtKey Portal
                </h3>
                
                {/* Portal Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-brand-dark text-white py-4 px-6 rounded-2xl font-semibold hover:bg-brand-darkest transition-all shadow-md hover:shadow-lg text-left">
                    Share Your Interests
                  </button>
                  <button className="w-full bg-brand-dark text-white py-4 px-6 rounded-2xl font-semibold hover:bg-brand-darkest transition-all shadow-md hover:shadow-lg text-left">
                    Playlist
                  </button>
                  <button className="w-full bg-brand-dark text-white py-4 px-6 rounded-2xl font-semibold hover:bg-brand-darkest transition-all shadow-md hover:shadow-lg text-left">
                    Sign Guestbook
                  </button>
                  <button className="w-full bg-brand-dark text-white py-4 px-6 rounded-2xl font-semibold hover:bg-brand-darkest transition-all shadow-md hover:shadow-lg text-left">
                    Video Greeting
                  </button>
                  <button className="w-full bg-brand-dark text-white py-4 px-6 rounded-2xl font-semibold hover:bg-brand-darkest transition-all shadow-md hover:shadow-lg text-left">
                    Image Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Purchase and Upload Options */}
          <div className="space-y-8">
            {/* Purchase Options */}
            <div className="bg-gradient-to-br from-brand-lightest to-white rounded-2xl shadow-lg p-6 border border-brand-light">
              <h3 className="text-2xl font-bold text-brand-darkest mb-4">
                Here Are Your Two Purchase Options:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-brand-medium">1.</span>
                  <div className="flex-1">
                    <p className="text-brand-darkest font-semibold mb-2">
                      Either upload your own image
                    </p>
                    <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center gap-2">
                      <div className="flex-1 h-8 bg-gray-100 rounded"></div>
                      <div className="flex gap-1">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl font-bold text-brand-medium">2.</span>
                  <div className="flex-1">
                    <p className="text-brand-darkest font-semibold mb-2">
                      Select from our gallery
                    </p>
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center border-2 border-brand-medium mx-auto">
                      <span className="text-3xl text-brand-medium">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Options */}
            <div className="bg-gradient-to-br from-brand-lightest to-white rounded-2xl shadow-lg p-6 border border-brand-light">
              <h3 className="text-2xl font-bold text-brand-darkest mb-4">
                Upload Options:
              </h3>
              <ul className="space-y-3 text-brand-darkest">
                <li className="flex items-start gap-3">
                  <span className="text-brand-medium text-xl mt-1">•</span>
                  <span>Short video</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-medium text-xl mt-1">•</span>
                  <span>Music/Playlist (Apple/Spotify)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-medium text-xl mt-1">•</span>
                  <span>You can even upload an e-gift certificate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-br from-brand-lightest to-white rounded-2xl shadow-lg p-8 border border-brand-light">
            <p className="text-brand-darkest text-lg mb-6">
              Ready to create your own personalized products?
            </p>
            <a
              href="#products"
              className="inline-block bg-brand-dark text-white px-10 py-4 rounded-full font-semibold hover:bg-brand-darkest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Creating Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
