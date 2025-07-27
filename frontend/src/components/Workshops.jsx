import React from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { assets } from '../assets/assets';

const Workshops = () => {
  const events = [
    {
      date: "March 15-17, 2024",
      title: "Ibadan Scent Design Workshop",
      location: "7 oyesina close, opposite 7 ibikunle avenue, old bodija",
      price: 75000,
      highlight: "international Guest Master Perfumer"
    },
    // {
    //   date: "April 5-7, 2024",
    //   title: "Ibadan Scent Design Workshop",
    //   location: "7 oyesina close, opposite 7 ibikunle avenue, old bodija",
    //   price: 45000,
    //   highlight: "Distillation techniques"
    // },
    // {
    //   date: "May 24-26, 2024", 
    //   title: "Ibadan Scent Design Workshop",
    //   location: "7 oyesina close, opposite 7 ibikunle avenue, old bodija",
    //   price: 65000,
    //   highlight: "Perfume business Marketing Classes"
    // }
  ];

  return (
    <section id="workshops" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-purple-600"></div>
            <p className="font-medium text-sm text-purple-600">
              HANDS-ON EXPERIENCES
            </p>
          </div>
          <h2 className="prata-regular text-4xl text-purple-900 mb-4">
            Perfume Workshops
          </h2>
          <p className="text-xl text-gray-600">
            Immersive fragrance creation experiences across Nigeria
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div 
              key={index} 
              className="bg-purple-50 rounded-2xl shadow-lg border border-purple-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={assets.class1} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 border-b border-purple-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {/* <p className="text-sm text-purple-600 flex items-center">
                      <FiCalendar className="mr-2" />
                      {event.date}
                    </p> */}
                    <h3 className="prata-regular text-xl font-bold mt-2 text-purple-900">
                      {event.title}
                    </h3>
                  </div>
                  {/* <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    ₦{event.price.toLocaleString('en-NG')}
                  </span> */}
                </div>
                <p className="text-gray-600 flex items-center">
                  <FiMapPin className="mr-2" />
                  {event.location}
                </p>
              </div>
              <div className="p-6 bg-white">
                <p className="text-sm font-semibold text-purple-600 mb-2">
                  Special Feature:
                </p>
                <p className="text-purple-900">{event.highlight}</p>
                
            <a href="https://wa.me/2348028293058">
                <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  Reserve Spot
                </button>
            </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-purple-900 text-white rounded-2xl p-8 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="prata-regular text-3xl font-bold mb-4">Private Group Workshops</h3>
            <p className="text-xl mb-6">
              Book exclusive sessions for corporate teams, bridal parties, or special occasions
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 p-6 rounded-xl">
                <h4 className="text-lg font-bold mb-2">Corporate Team Building</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Customized scent creation activities</li>
                  <li>Brand-inspired fragrance development</li>
                  <li>Includes lunch and take-home products</li>
                </ul>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h4 className="text-lg font-bold mb-2">Special Celebrations</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Bridal shower perfume parties</li>
                  <li>Birthday fragrance experiences</li>
                  <li>Aniversary scent creation sessions</li>
                </ul>
              </div>
            </div>
            
            <a href="https://wa.me/2348028293058">
            <button className="mt-8 px-8 py-3 bg-amber-500 text-purple-900 rounded-full hover:bg-amber-400 transition-colors font-bold">
              Inquire About Private Workshops
            </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshops;