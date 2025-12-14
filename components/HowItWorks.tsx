import Image from "next/image";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20" style={{ backgroundColor: '#ecece9' }}>
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

        {/* Steps 1-5 */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <Image
                src="/images/design-editor-screenshot.jpg"
                alt="Upload Your Image or Choose from Library"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-brand-medium text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h4 className="text-xl font-bold text-brand-darkest mb-2">
                Upload Your Image or Choose from our Library
              </h4>
              <p className="text-brand-darkest">
                Upload a photo from your device or choose from our gallery of artist-created pieces.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <Image
                src="/images/design-editor-screenshot.jpg"
                alt="Design Editor"
                fill
                className="object-cover"
                style={{ top: 0 }}
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-brand-medium text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h4 className="text-xl font-bold text-brand-darkest mb-2">
                Use Our Design Editor (Optional)
              </h4>
              <p className="text-brand-darkest">
                Customize your image with our easy-to-use design tools, add text, filters, and effects.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <Image
                src="/images/upload-media-screenshot.jpg"
                alt="Create Your ArtKey Portal"
                fill
                className="object-cover"
                style={{ top: 0 }}
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-brand-medium text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h4 className="text-xl font-bold text-brand-darkest mb-2">
                Create Your ArtKey Portal (upload images, videos, playlists)
              </h4>
              <p className="text-brand-darkest">
                Upload images, videos, and playlists to personalize your ArtKey. This creates a unique digital experience linked to your physical art.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <Image
                src="/images/send-gift-boxes.jpg"
                alt="Send The Gift"
                fill
                className="object-cover"
                style={{ top: 0 }}
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-brand-medium text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                4
              </div>
              <h4 className="text-xl font-bold text-brand-darkest mb-2">
                Send The Gift
              </h4>
              <p className="text-brand-darkest">
                We print and ship your personalized art product, ready to be displayed and enjoyed.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all md:col-start-2">
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <Image
                src="/images/couch.jpg"
                alt="Interact with the ArtKey"
                fill
                className="object-cover"
                style={{ top: 0 }}
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-brand-medium text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-4">
                5
              </div>
              <h4 className="text-xl font-bold text-brand-darkest mb-2">
                Interact with the ArtKey
              </h4>
              <p className="text-brand-darkest">
                Recipients scan the ArtKey QR code to access all the special content you&apos;ve created.
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
