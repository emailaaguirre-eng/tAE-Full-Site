export default function CoCreators() {
  return (
    <section id="cocreators" className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            CoCreators
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
          <p className="text-lg text-brand-darkest max-w-2xl mx-auto">
            Meet the talented artists and creators who make The Artful Experience possible
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* CoCreator profiles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Kimber */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-brand-light to-brand-medium h-48 flex items-center justify-center">
                <div className="text-7xl">👤</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-darkest mb-2">
                  Kimber
                </h3>
                <p className="text-brand-darkest mb-4">
                  Bio and description will go here
                </p>
                <button className="text-brand-medium font-semibold hover:text-brand-dark transition-colors">
                  Learn More →
                </button>
              </div>
            </div>

            {/* Add more CoCreator cards as needed */}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
              <h3 className="text-2xl font-bold text-brand-dark mb-4">
                Interested in Becoming a CoCreator?
              </h3>
              <p className="text-brand-darkest mb-6">
                Join our community of talented artists and creators
              </p>
              <button className="bg-brand-medium text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-dark transition-all shadow-lg">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

