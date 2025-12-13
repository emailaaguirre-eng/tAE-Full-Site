"use client";

import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "River",
      location: "Madinah's Living Farmacy",
      text: "There was an image of me where I felt totally empowered. I uploaded it with my intentions and music—now it's living imagery I use forever.",
      image: "/images/river-1.jpg"
    },
    {
      name: "Morgan",
      location: "Rio de Janeiro",
      text: "Rio de Janeiro has a special place in my heart. When I visited Ipanema Beach in Rio, it captivated me and made me feel alive. I wanted to memorialize this special moment, so I uploaded my picture to theAE. My image was artfully enhanced by world renowned artist, Deanna Lankin, and now I can relive that memory every time I see it. I also enjoyed the interactivity of the art key, being able to preview Deanna's other works, suggested play list and other fun things like the mediative ideas and images. It's an image that has been captured for a lifetime.",
      image: "/images/morgantestimonial.jpeg"
    },
    {
      name: "Grant A",
      location: "Russ Lyon's Sotheby's International",
      text: "I wanted memorable gifts for my real estate clients. The art was amazing and the Art Keys let me deliver time-released messages and e-gift cards—perfect for VIPs. The customization options and the ability to add personalized content made each gift truly special.",
      image: "/images/grantatestimonial.jpeg"
    },
    {
      name: "Connie Upham",
      location: "Broker at Harcourts The Garner Group Real Estate, Bend, Oregon",
      text: "The Artful Experience transforms a simple image into a gift that feels truly meaningful and made especially for your client. The ordering process is simple and seamless, yet delivers remarkable impact - thoughtful, creative, entirely unique, and sure to leave a lasting impression. The accompanying Spotify playlist is the perfect finishing touch.",
      image: "/images/connietestimonial.png"
    },
    {
      name: "Mary H",
      location: "Family Keepsake",
      text: "I wanted to capture a special moment of time with my daughter. I found the perfect picture of us on my iPhone, uploaded the image to theAE site, and described the feeling that I was after. When I received the art in the mail, it was better than I had imagined. I now have something that symbolizes that special moment of time with my daughter that I will cherish forever.",
      image: "/images/maryhtestimonial.jpeg"
    },
  ];

  return (
    <section id="testimonials" className="py-20" style={{ backgroundColor: '#ecece9' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            What Our Clients & Friends Say
          </h2>
          <div className="w-24 h-1 bg-brand-medium mx-auto mb-4"></div>
          <p className="text-lg text-brand-darkest max-w-2xl mx-auto">
            Real stories from people who have experienced the magic of personalized art
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-lg overflow-visible hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 relative z-0 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden rounded-t-2xl">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: 'center' }}
                />
              </div>
              
              {/* Content - expands on hover */}
              <div className="p-6 transition-all duration-500 group-hover:p-8 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-brand-darkest mb-1 group-hover:text-2xl transition-all duration-500">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-brand-dark group-hover:text-base transition-all duration-500">
                    {testimonial.location}
                  </p>
                </div>
                
                <div className="flex gap-1 mb-4 group-hover:mb-6 transition-all duration-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg group-hover:text-xl transition-all duration-500">★</span>
                  ))}
                </div>
                
                <p className="text-brand-darkest leading-relaxed italic text-sm group-hover:text-base group-hover:leading-loose transition-all duration-500 flex-1">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>
              
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-brand-dark mb-2">4.9/5</div>
            <div className="text-brand-darkest font-semibold text-sm">Average Rating</div>
            <div className="flex justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-brand-dark mb-2">50K+</div>
            <div className="text-brand-darkest font-semibold text-sm">Happy Customers</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-brand-dark mb-2">100K+</div>
            <div className="text-brand-darkest font-semibold text-sm">Products Created</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-brand-dark mb-2">99%</div>
            <div className="text-brand-darkest font-semibold text-sm">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  );
}
