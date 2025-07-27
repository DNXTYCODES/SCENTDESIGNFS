import React from 'react';
import { FiCalendar, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Contact = () => {
  const offices = [
    {
      city: "IBADAN HQ",
      address: "7 oyesina close, opposite 7 ibikunle avenue, old bodija, Ibadan, Nigeria",
      phone: "+234 802 829 3058",
      hours: "Mon-Fri: 9AM-6PM | Sat: 10AM-4PM"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-purple-600"></div>
            <p className="font-medium text-sm text-purple-600">
              GET IN TOUCH
            </p>
          </div>
          <h2 className="prata-regular text-4xl text-purple-900 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600">
            We'd love to hear from you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
                <h3 className="prata-regular text-2xl font-bold mb-4 text-purple-900">{office.city}</h3>
                <div className="space-y-4">
                  <p className="flex items-start text-gray-600">
                    <FiMapPin className="mr-2 mt-1 text-purple-600" />
                    {office.address}
                  </p>
                  <p className="flex items-start text-gray-600">
                    <FiPhone className="mr-2 mt-1 text-purple-600" />
                    {office.phone}
                  </p>
                  <p className="flex items-start text-gray-600">
                    <FiMail className="mr-2 mt-1 text-purple-600" />
                    lamboparfums@gmail.com
                  </p>
                  <p className="flex items-start text-gray-600">
                    <FiCalendar className="mr-2 mt-1 text-purple-600" />
                    {office.hours}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="bg-purple-900 text-white p-8 rounded-2xl shadow-lg">
              <h3 className="prata-regular text-2xl font-bold mb-4">Business Inquiries</h3>
              <div className="space-y-4">
                <p className="flex items-start">
                  <FiMail className="mr-2 mt-1 text-amber-500" />
                  <span>lamboparfums@gmail.com</span>
                </p>
                <p className="flex items-start">
                  <FiPhone className="mr-2 mt-1 text-amber-500" />
                  <span>+234 802 829 3058 (Whatsapp/Call)</span>
                </p>
                {/* <p className="flex items-start">
                  <FiMail className="mr-2 mt-1 text-amber-500" />
                  <span>lamboparfums@gmail.com (Academy)</span>
                </p> */}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
                  placeholder="080X XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600">
                  <option value="">Select a subject</option>
                  <option value="product">Product Inquiry</option>
                  <option value="wholesale">Wholesale Partnership</option>
                  <option value="training">Training Program</option>
                  <option value="workshop">Workshop Booking</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
                  placeholder="How can we assist you?"
                ></textarea>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;