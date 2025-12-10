export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Placeholder for existing content */}
          <div className="bg-brand-lightest rounded-2xl p-8 md:p-12 shadow-lg mb-8">
            <p className="text-lg text-brand-darkest leading-relaxed mb-6">
              {/* Add your existing About Us content here */}
              At The Artful Experience, we believe every image tells a story. Our mission is to help you 
              transform your precious memories and artistic visions into beautiful, tangible products that 
              you can treasure for a lifetime.
            </p>
            <p className="text-lg text-brand-darkest leading-relaxed">
              With our innovative ArtKey technology and commitment to quality, we make it easy to turn 
              your photos and art into personalized masterpieces.
            </p>
          </div>

          {/* Placeholder for images/videos from existing site */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-brand-light to-brand-medium rounded-xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
              <p className="text-white">
                {/* Add your vision statement */}
                Making personal expression accessible through art and technology
              </p>
            </div>
            <div className="bg-gradient-to-br from-brand-medium to-brand-dark rounded-xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-white">
                {/* Add your mission statement */}
                Empowering creativity with quality products and innovative tools
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

