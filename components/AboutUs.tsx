export default function AboutUs() {
  return (
    <section id="about" className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-8 text-center font-playfair">
        About Us
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Side-by-side layout: Image and Text */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative w-full aspect-square bg-brand-darkest">
              {/* Collage image - fits perfectly inside the container */}
              <img
                src="/images/collage (1).png"
                alt="About Us collage"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* About content */}
          <div className="bg-brand-lightest rounded-2xl p-8 md:p-12 shadow-lg space-y-4">
            <p className="text-lg text-brand-darkest leading-relaxed">
              Welcome to The Artful Experience Gallery and Upload Center—where soul-stirring art and images become a living portal.
              Give a gift that will never be forgotten, even if that gift is for you.
            </p>
            <p className="text-lg text-brand-darkest leading-relaxed">
              Discover our "Art Key" technology that lets you upload videos, music, and time-released gift certificates embedded in the art.
              When the recipient scans the Art Key or QR code, they unlock your message, video, song, or surprise.
            </p>
            <p className="text-lg text-brand-darkest leading-relaxed">
              Choose your path: upload your own image and personalize it, or select art from our gallery of internationally recognized artists.
              Every option supports layered media so your story travels with the piece.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

