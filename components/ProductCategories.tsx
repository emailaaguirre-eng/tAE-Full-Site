export default function ProductCategories() {
  const categories = [
    {
      title: "Photo Books",
      description: "Preserve your memories in beautifully crafted photo books",
      image: "📚",
      items: ["Hardcover Books", "Softcover Books", "Layflat Books", "Mini Books"],
      color: "from-brand-light to-brand-medium"
    },
    {
      title: "Cards & Stationery",
      description: "Send heartfelt messages with custom cards",
      image: "💌",
      items: ["Holiday Cards", "Birthday Cards", "Thank You Cards", "Invitations"],
      color: "from-brand-medium to-brand-dark"
    },
    {
      title: "Wall Art & Prints",
      description: "Transform your space with stunning photo prints",
      image: "🖼️",
      items: ["Canvas Prints", "Framed Prints", "Photo Panels", "Metal Prints"],
      color: "from-brand-light to-brand-medium"
    },
    {
      title: "Home Decor",
      description: "Personalize your home with custom decor",
      image: "🏠",
      items: ["Pillows", "Blankets", "Mugs", "Calendars"],
      color: "from-brand-medium to-brand-dark"
    },
    {
      title: "Gifts",
      description: "Create unique personalized gifts for loved ones",
      image: "🎁",
      items: ["Photo Gifts", "Ornaments", "Puzzles", "Phone Cases"],
      color: "from-brand-light to-brand-medium"
    },
    {
      title: "Photo Prints",
      description: "High-quality prints in various sizes",
      image: "📸",
      items: ["Standard Prints", "Large Prints", "Photo Strips", "Retro Prints"],
      color: "from-brand-medium to-brand-dark"
    },
  ];

  return (
    <section id="products" className="py-20 bg-brand-lightest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Our Products
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
          <p className="text-lg text-brand-darkest max-w-2xl mx-auto">
            Explore our wide range of personalized photo products and gifts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${category.color} p-8 text-center`}>
                <div className="text-6xl mb-4">{category.image}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-brand-darkest mb-4">
                  {category.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-brand-darkest flex items-center gap-2">
                      <span className="text-brand-medium">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-brand-medium text-white py-3 rounded-full font-semibold hover:bg-brand-dark transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-brand-darkest text-lg mb-4">
              🎉 <strong>Special Offer:</strong> Get 25% off your first order!
            </p>
            <button className="bg-brand-dark text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-darkest transition-colors">
              Claim Your Discount
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

