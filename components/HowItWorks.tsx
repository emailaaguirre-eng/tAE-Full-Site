export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Choose Your Product",
      description: "Browse our extensive collection of photo books, cards, prints, and gifts. Select the perfect item for your needs.",
      icon: "🎯",
    },
    {
      number: "2",
      title: "Upload Your Photos",
      description: "Easily upload photos from your computer, phone, or social media. Our smart editor makes arrangement simple.",
      icon: "📤",
    },
    {
      number: "3",
      title: "Customize & Design",
      description: "Use our intuitive design tools to personalize your product. Add text, filters, and creative layouts.",
      icon: "🎨",
    },
    {
      number: "4",
      title: "Review & Order",
      description: "Preview your creation, make final adjustments, and place your order. We'll handle the rest!",
      icon: "✅",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-brand-lightest to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
          <p className="text-lg text-brand-darkest max-w-2xl mx-auto">
            Creating your personalized products is easy! Follow these simple steps:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center h-full">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {step.number}
                </div>
                <div className="text-6xl mb-6 mt-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-brand-darkest mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-darkest leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-brand-medium text-3xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-bold text-brand-dark text-lg mb-2">Fast Shipping</h4>
              <p className="text-brand-darkest">Get your order in 3-5 business days</p>
            </div>
            <div>
              <div className="text-4xl mb-3">💯</div>
              <h4 className="font-bold text-brand-dark text-lg mb-2">Quality Guarantee</h4>
              <p className="text-brand-darkest">100% satisfaction or your money back</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-bold text-brand-dark text-lg mb-2">Free Design Tools</h4>
              <p className="text-brand-darkest">Professional design tools at no extra cost</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#products"
            className="inline-block bg-brand-medium text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Creating Now
          </a>
        </div>
      </div>
    </section>
  );
}

