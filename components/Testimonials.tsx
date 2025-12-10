"use client";

import { useState } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      text: "Absolutely love my photo book! The quality is outstanding and the design process was so easy. I've already ordered three more for family gifts!",
      product: "Premium Photo Book",
      image: "👩‍💼"
    },
    {
      name: "Michael Chen",
      location: "San Francisco, CA",
      rating: 5,
      text: "The holiday cards turned out perfect! Everyone at our party was asking where we got them. The print quality is amazing and shipping was super fast.",
      product: "Holiday Cards",
      image: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      location: "Austin, TX",
      rating: 5,
      text: "I ordered a canvas print for my living room and it's stunning! The colors are vibrant and it arrived perfectly packaged. Highly recommend!",
      product: "Canvas Wall Print",
      image: "👩‍🎨"
    },
    {
      name: "David Thompson",
      location: "Seattle, WA",
      rating: 5,
      text: "Made a custom calendar with family photos and it's the best gift I've ever given. My parents loved it! Will definitely be ordering again next year.",
      product: "Photo Calendar",
      image: "👨‍🏫"
    },
    {
      name: "Jennifer Lee",
      location: "Boston, MA",
      rating: 5,
      text: "The photo mugs are adorable and great quality! I made a set for my team at work and everyone was thrilled. Perfect for personalized gifts.",
      product: "Photo Mug Set",
      image: "👩‍⚕️"
    },
    {
      name: "Robert Martinez",
      location: "Miami, FL",
      rating: 5,
      text: "Ordered prints for our wedding and they exceeded expectations. The colors are true to life and the finish is professional grade. A+ service!",
      product: "Wedding Prints",
      image: "👨‍✈️"
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
          <p className="text-lg text-brand-darkest max-w-2xl mx-auto">
            Join thousands of happy customers who trust us with their memories
          </p>
        </div>

        {/* Main Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-brand-lightest to-brand-light rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">{testimonials[currentIndex].image}</div>
              <div>
                <h3 className="text-2xl font-bold text-brand-darkest">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-brand-darkest">{testimonials[currentIndex].location}</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-lg text-brand-darkest mb-4 leading-relaxed italic">
              &quot;{testimonials[currentIndex].text}&quot;
            </p>
            <div className="text-brand-medium font-semibold">
              Product: {testimonials[currentIndex].product}
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="bg-brand-dark text-white w-12 h-12 rounded-full hover:bg-brand-darkest transition-colors flex items-center justify-center text-xl"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-brand-dark w-8"
                        : "bg-brand-medium hover:bg-brand-dark"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="bg-brand-dark text-white w-12 h-12 rounded-full hover:bg-brand-darkest transition-colors flex items-center justify-center text-xl"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center bg-brand-lightest rounded-xl p-6">
            <div className="text-4xl font-bold text-brand-dark mb-2">4.9/5</div>
            <div className="text-brand-darkest font-semibold">Average Rating</div>
            <div className="flex justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
          </div>
          <div className="text-center bg-brand-lightest rounded-xl p-6">
            <div className="text-4xl font-bold text-brand-dark mb-2">50K+</div>
            <div className="text-brand-darkest font-semibold">Happy Customers</div>
          </div>
          <div className="text-center bg-brand-lightest rounded-xl p-6">
            <div className="text-4xl font-bold text-brand-dark mb-2">100K+</div>
            <div className="text-brand-darkest font-semibold">Products Created</div>
          </div>
          <div className="text-center bg-brand-lightest rounded-xl p-6">
            <div className="text-4xl font-bold text-brand-dark mb-2">99%</div>
            <div className="text-brand-darkest font-semibold">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  );
}

