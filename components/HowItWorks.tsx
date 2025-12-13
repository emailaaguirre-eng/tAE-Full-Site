import Image from "next/image";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
          <p className="text-lg text-brand-darkest max-w-2xl mx-auto">
            Create personalized art with embedded memories in just a few simple steps
          </p>
        </div>

        {/* Step 1 - Two Options */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Option 1: Upload Your Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {/* Design Editor Preview - Show multiple images in a grid */}
                <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2">
                  <div className="relative rounded overflow-hidden">
                    <Image
                      src="/images/uploadyourprint.png"
                      alt="Design editor preview 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded overflow-hidden">
                    <Image
                      src="/images/doginthepark.png"
                      alt="Design editor preview 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded overflow-hidden">
                    <Image
                      src="/images/forweddings.jpeg"
                      alt="Design editor preview 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded overflow-hidden bg-brand-light flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">+</div>
                      <div className="text-sm text-brand-dark">Upload</div>
                    </div>
                  </div>
                </div>
                {/* Overlay with design tools icon */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-medium rounded flex items-center justify-center">
                      <span className="text-white text-sm">✎</span>
                    </div>
                    <span className="text-xs font-semibold text-brand-darkest">Design Editor</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="inline-block bg-brand-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                  1
                </div>
                <h4 className="text-xl font-bold text-brand-darkest mb-2">
                  Upload Your Image
                </h4>
                <p className="text-brand-darkest">
                  Personalize your art with a message. Upload your own photo and transform it into a beautiful piece of art using our design editor.
                </p>
              </div>
            </div>

            {/* OR Divider */}
            <div className="flex items-center justify-center">
              <div className="bg-brand-medium text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shadow-lg">
                OR
              </div>
            </div>

            {/* Option 2: Choose from Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <Image
                  src="/images/buyanexistingprint.jpg"
                  alt="Choose art from gallery"
                  fill
                  className="object-cover"
                  style={{ top: 0 }}
                />
              </div>
              <div className="p-6">
                <div className="inline-block bg-brand-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                  1
                </div>
                <h4 className="text-xl font-bold text-brand-darkest mb-2">
                  Choose Art from Our Online Gallery
                </h4>
                <p className="text-brand-darkest">
                  Explore our unique art collection. Select from curated pieces by internationally recognized artists.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps 2-4 */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <Image
                src="/images/uploadyourprint.png"
                alt="Upload your media"
                fill
                className="object-cover"
                style={{ top: 0 }}
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-brand-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h4 className="text-xl font-bold text-brand-darkest mb-2">
                Upload Your Media
              </h4>
              <p className="text-brand-darkest">
                Images, videos, music, gift certificate, or a time-released message. Add all the personal touches that make your gift unique.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <Image
                src="/images/chair-and-artwork.jpg"
                alt="Send the gift"
                fill
                className="object-cover"
                style={{ top: 0 }}
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-brand-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h4 className="text-xl font-bold text-brand-darkest mb-2">
                Send the Gift
              </h4>
              <p className="text-brand-darkest">
                We&apos;ll carefully package and ship your personalized art. Your gift will arrive ready to be displayed and enjoyed.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <Image
                src="/images/couch.jpg"
                alt="Find the perfect place"
                fill
                className="object-cover"
                style={{ top: 0 }}
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-brand-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                4
              </div>
              <h4 className="text-xl font-bold text-brand-darkest mb-2">
                Interact with the Art Key
              </h4>
              <p className="text-brand-darkest">
                Find the perfect place for your art and interact with the key. Scan the discreetly placed QR code to unlock all the personalized content.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#customize"
            className="inline-block bg-brand-medium text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Creating Your Art
          </a>
        </div>
      </div>
    </section>
  );
}
