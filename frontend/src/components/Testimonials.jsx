import React from 'react';
import { FaStar } from 'react-icons/fa';
import { assets } from '../assets/assets';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Chioma Nwokeke",
      location: "Ibadan",
      role: "Luxury Retailer",
      text: "Scent Design's Bespoke Fragrances has become our top-selling fragrance at our Ikoyi boutique. Our GCC clients appreciate the authentic Fragrance in each bottle.",
      image: assets.cs3
    },
    {
      name: "Divine Bello",
      location: "Abuja",
      role: "Customer",
      text: "We've adopted it as the official gift for foreign dignitaries visiting Our Establishment.",
      image: assets.cs2
    },
    {
      name: "Adaobi Uche",
      location: "Lagos",
      role: "Perfume Academy Graduate",
      text: "The 6-month training program transformed me from a local herb seller to a certified perfumer. I now supply major hotels in South-East with custom scents.",
      image: assets.cs4
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-purple-600"></div>
            <p className="font-medium text-sm text-purple-600">
              CUSTOMER STORIES
            </p>
          </div>
          <h2 className="prata-regular text-4xl text-purple-900 mb-4">
            Naija Customer Stories
          </h2>
          <p className="text-xl text-gray-600">
            Why Nigeria's elite choose Scent Design NG
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-600"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-purple-900">{testimonial.name}</h3>
                  <p className="text-gray-600">
                    {testimonial.role}, {testimonial.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-6 border-l-2 border-purple-600 pl-4">
                "{testimonial.text}"
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-amber-500" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-purple-900 text-white rounded-2xl p-8 shadow-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="prata-regular text-3xl font-bold mb-6">Featured In</h3>
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white/10 p-6 rounded-xl">
                <p className="text-l font-bold">Vanguard</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <p className="text-l font-bold">ThisDay</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <p className="text-l font-bold">BellaNaija</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <p className="text-l font-bold">Guardian</p>
              </div>
            </div> */}
            <p className="mt-8 text-lg max-w-2xl mx-auto">
              "Scent Design NG is revolutionizing African perfumery with its commitment to quality and cultural authenticity"
              <span className="block mt-2 text-amber-500">- BuzinessDay Nigeria</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;