export default function AboutUs() {
  return (
    <section id="about" className="py-20" style={{ backgroundColor: '#ecece9' }}>
      <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-8 text-center font-playfair">
        About Us
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Hero Section */}
        <div className="relative mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative w-full aspect-video bg-brand-darkest">
            {/* Collage image - fits perfectly inside the container */}
            <img
              src="/images/collage (1).png"
              alt="About Us collage"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* About content */}
          <div className="bg-brand-lightest rounded-2xl p-8 md:p-12 shadow-lg mb-8 space-y-4">
            <p className="text-lg text-brand-darkest leading-relaxed">
              Welcome to The Artful Experience Gallery and Upload Center—where soul-stirring art and images become a living portal.
              Give a gift that will never be forgotten, even if that gift is for you.
            </p>
            <p className="text-lg text-brand-darkest leading-relaxed">
              Discover our “Art Key” technology that lets you upload videos, music, and time-released gift certificates embedded in the art.
              When the recipient scans the Art Key or QR code, they unlock your message, video, song, or surprise.
            </p>
            <p className="text-lg text-brand-darkest leading-relaxed">
              Choose your path: upload your own image and personalize it, or select art from our gallery of internationally recognized artists.
              Every option supports layered media so your story travels with the piece.
            </p>
          </div>

          {/* Vision card */}
          <div className="grid md:grid-cols-1 gap-6">
            <div className="bg-gradient-to-br from-brand-light to-brand-medium rounded-xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
              <p className="text-white">
                Making personal expression accessible through art and technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

