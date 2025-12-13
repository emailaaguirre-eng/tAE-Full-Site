import Image from "next/image";
import cocreatorsData from "@/content/cocreators.json";

export default function CoCreators() {
  const { title, subtitle, cocreators, cta } = cocreatorsData;

  return (
    <section id="cocreators" className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
          <p className="text-lg text-brand-darkest max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* CoCreator profiles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cocreators.map((cocreator) => (
              <div key={cocreator.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                <div className="relative h-48 bg-gradient-to-br from-brand-light to-brand-medium overflow-hidden">
                  <Image
                    src={cocreator.image}
                    alt={cocreator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-darkest mb-2">
                    {cocreator.name}
                  </h3>
                  <p className="text-brand-darkest mb-4">
                    {cocreator.bio}
                  </p>
                  <button className="text-brand-medium font-semibold hover:text-brand-dark transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
              <h3 className="text-2xl font-bold text-brand-dark mb-4">
                {cta.title}
              </h3>
              <p className="text-brand-darkest mb-6">
                {cta.description}
              </p>
              <button className="bg-brand-medium text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-dark transition-all shadow-lg">
                {cta.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

