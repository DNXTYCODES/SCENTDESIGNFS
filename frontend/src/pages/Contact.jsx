import React from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiCalendar, FiMessageSquare, FiFacebook, FiInstagram, FiTwitter, FiChevronDown } from 'react-icons/fi';
import { assets } from '../assets/assets';

const Contact = () => {
  // Mock assets - in a real app, these would be imported
  // const assets = {
  //   carousel3: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  // };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600/10 to-amber-50 rounded-b-3xl overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-purple-600"></div>
              <p className="font-medium text-sm text-purple-600">
                GET IN TOUCH
              </p>
            </div>
            
            <h1 className="prata-regular text-4xl md:text-5xl lg:text-6xl text-purple-900 mb-6 leading-tight">
              We'd Love to <span className="text-amber-600">Hear</span> From You
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Have questions about our fragrances, training programs, or wholesale opportunities? 
              Our team is ready to assist you.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="tel:+2348028293058" 
                className="px-6 py-3 md:px-8 md:py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm md:text-base"
              >
                <FiPhone className="text-xl" />
                Call Us
              </a>
              <a 
                href="mailto:scentdesign@gmail.com" 
                className="px-6 py-3 md:px-8 md:py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center gap-2 text-sm md:text-base"
              >
                <FiMail className="text-xl" />
                Email Us
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img 
                src={assets.cs4} 
                alt="Scent Design Customer Service" 
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-purple-900/80 text-white p-4 text-center">
                <p className="prata-regular">Our fragrance experts are waiting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: <FiMapPin className="text-3xl text-purple-600" />,
              title: "Visit Us",
              details: [
                "7 oyesina close, opposite 7 ibikunle avenue",
                "Old Bodija, Ibadan, Nigeria"
              ],
              action: {
                text: "Get Directions",
                link: "https://maps.google.com/?q=7+oyesina+close+ibadan"
              }
            },
            {
              icon: <FiPhone className="text-3xl text-purple-600" />,
              title: "Call Us",
              details: [
                "Customer Service: +234 802 829 3058",
                "Wholesale Inquiries: +234 802 829 3058",
                "Training Academy: +234 802 829 3058"
              ],
              action: {
                text: "Call Now",
                link: "tel:+2348028293058"
              }
            },
            {
              icon: <FiClock className="text-3xl text-purple-600" />,
              title: "Business Hours",
              details: [
                "Monday-Friday: 9:00 AM - 6:00 PM",
                "Saturday: 10:00 AM - 4:00 PM",
                "Sunday: Closed"
              ],
              action: {
                text: "Book Appointment",
                link: "/appointment"
              }
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-purple-100 text-center hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="prata-regular text-xl md:text-2xl font-bold mb-4 text-purple-900">{item.title}</h3>
              
              <div className="space-y-2 mb-6">
                {item.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm md:text-base">{detail}</p>
                ))}
              </div>
              
              <a 
                href={item.action.link} 
                className="inline-block px-5 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm md:text-base"
              >
                {item.action.text}
              </a>
            </div>
          ))}
        </div>
      </div>
      
      {/* Contact Form and Map */}
      <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-purple-100">
            <div className="flex items-center gap-2 mb-6">
              <FiMessageSquare className="text-2xl text-purple-600" />
              <h2 className="prata-regular text-2xl md:text-3xl text-purple-900">Send Us a Message</h2>
            </div>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600 focus:outline-none" 
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600 focus:outline-none" 
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600 focus:outline-none" 
                  placeholder="080X XXX XXXX"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600 focus:outline-none">
                  <option value="">Select a subject</option>
                  <option value="product">Product Inquiry</option>
                  <option value="wholesale">Wholesale Partnership</option>
                  <option value="training">Training Program</option>
                  <option value="workshop">Workshop Booking</option>
                  <option value="appointment">Store Appointment</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea 
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600 focus:outline-none" 
                  placeholder="How can we assist you?"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className="h-full rounded-2xl overflow-hidden shadow-lg border border-purple-100">
            <iframe 
              title="Scent Design Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.538973073345!2d3.896468214794002!3d7.064618318366624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039f2f5d9f3c6d5%3A0x7c0f0d4b7f4d4b7d!2sOld%20Bodija%2C%20Ibadan%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="min-h-[400px] md:min-h-[500px]"
            ></iframe>
          </div>
        </div>
      </div>
      
      {/* FAQ Section - Moved to its own dedicated section */}
      <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="prata-regular text-3xl text-purple-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          </div>
          
          <div className="bg-purple-900 text-white rounded-2xl p-6 md:p-8">
            <div className="space-y-4">
              {[
                {
                  question: "What are your opening hours?",
                  answer: "We're open Monday to Friday from 9:00 AM to 6:00 PM and Saturday from 10:00 AM to 4:00 PM. Closed on Sundays."
                },
                {
                  question: "Do you offer international shipping?",
                  answer: "Currently, we only ship within Nigeria. We're working on expanding our shipping options."
                },
                {
                  question: "Can I visit your store to test fragrances?",
                  answer: "Absolutely! Visit us at our Ibadan location to experience our full fragrance collection. Appointments are recommended."
                },
                {
                  question: "How long does delivery take within Nigeria?",
                  answer: "Delivery typically takes 3-5 business days within major cities and 5-7 business days to other locations."
                },
                {
                  question: "Do you offer gift wrapping services?",
                  answer: "Yes, we offer complimentary gift wrapping for all orders. You can add a gift message during checkout."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, bank transfers, and cash on delivery within Ibadan."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-white/20 pb-4 last:border-0">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span className="text-lg">{faq.question}</span>
                      <FiChevronDown className="text-xl transform group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-3 text-gray-300">{faq.answer}</p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Proof Section */}
      <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="prata-regular text-3xl text-purple-900 mb-4">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-8"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Tolu Adeyemi",
                role: "Fragrance Enthusiast",
                comment: "Scent Design transformed my understanding of perfumery. Their bespoke fragrance service is exceptional!",
                rating: "★★★★★"
              },
              {
                name: "Chinedu Okonkwo",
                role: "Wholesale Partner",
                comment: "Working with Scent Design has been a game-changer for my business. Their products are premium quality.",
                rating: "★★★★★"
              },
              {
                name: "Amina Bello",
                role: "Training Graduate",
                comment: "The perfumery training program was life-changing. I now run my own successful fragrance business!",
                rating: "★★★★★"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                <div className="text-amber-500 mb-3">{testimonial.rating}</div>
                <p className="text-gray-700 italic mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-bold text-purple-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-purple-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="prata-regular text-3xl md:text-4xl mb-6">Join Our Fragrance Community</h2>
            <p className="text-lg md:text-xl mb-8">
              Subscribe to our newsletter for exclusive offers, new product launches, 
              and fragrance insights
            </p>
            
            <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 md:px-6 md:py-4 rounded-lg text-purple-900 focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-amber-500 text-purple-900 px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold hover:bg-amber-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <div className="mt-8 flex justify-center gap-6">
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <FiFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <FiInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <FiTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-white hover:text-amber-400 transition-colors">
                <FiCalendar className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;




























// import React from 'react';
// import { FiMapPin, FiPhone, FiMail, FiClock, FiCalendar, FiMessageSquare, FiFacebook, FiInstagram, FiTwitter, FiChevronDown } from 'react-icons/fi';
// import { assets } from '../assets/assets';

// const Contact = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-purple-600/10 to-amber-50 rounded-b-3xl overflow-hidden">
//         <div className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 mb-12 md:mb-0">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-[2px] bg-purple-600"></div>
//               <p className="font-medium text-sm text-purple-600">
//                 GET IN TOUCH
//               </p>
//             </div>
            
//             <h1 className="prata-regular text-5xl md:text-6xl text-purple-900 mb-6 leading-tight">
//               We'd Love to <span className="text-amber-600">Hear</span> From You
//             </h1>
            
//             <p className="text-xl text-gray-700 mb-8">
//               Have questions about our fragrances, training programs, or wholesale opportunities? 
//               Our team is ready to assist you.
//             </p>
            
//             <div className="flex flex-wrap gap-4">
//               <a 
//                 href="tel:+2348028293058" 
//                 className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
//               >
//                 <FiPhone className="text-xl" />
//                 Call Us
//               </a>
//               <a 
//                 href="mailto:info@scentdesign.ng" 
//                 className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center gap-2"
//               >
//                 <FiMail className="text-xl" />
//                 Email Us
//               </a>
//             </div>
//           </div>
          
//           <div className="md:w-1/2 flex justify-center">
//             <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl border-4 border-white">
//               <img 
//                 src={assets.carousel3} 
//                 alt="Scent Design Customer Service" 
//                 className="w-full h-auto"
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-purple-900/80 text-white p-4 text-center">
//                 <p className="prata-regular">Our fragrance experts are waiting</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Contact Information */}
//       <div className="container mx-auto px-6 py-20">
//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             {
//               icon: <FiMapPin className="text-3xl text-purple-600" />,
//               title: "Visit Us",
//               details: [
//                 "7 oyesina close, opposite 7 ibikunle avenue",
//                 "Old Bodija, Ibadan, Nigeria"
//               ],
//               action: {
//                 text: "Get Directions",
//                 link: "https://maps.google.com/?q=7+oyesina+close+ibadan"
//               }
//             },
//             {
//               icon: <FiPhone className="text-3xl text-purple-600" />,
//               title: "Call Us",
//               details: [
//                 "Customer Service: +234 802 829 3058",
//                 "Wholesale Inquiries: +234 802 829 3058",
//                 "Training Academy: +234 802 829 3058"
//               ],
//               action: {
//                 text: "Call Now",
//                 link: "tel:+2348028293058"
//               }
//             },
//             {
//               icon: <FiClock className="text-3xl text-purple-600" />,
//               title: "Business Hours",
//               details: [
//                 "Monday-Friday: 9:00 AM - 6:00 PM",
//                 "Saturday: 10:00 AM - 4:00 PM",
//                 "Sunday: Closed"
//               ],
//               action: {
//                 text: "Book Appointment",
//                 link: "/appointment"
//               }
//             }
//           ].map((item, index) => (
//             <div 
//               key={index} 
//               className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 text-center hover:shadow-xl transition-shadow"
//             >
//               <div className="mb-4">{item.icon}</div>
//               <h3 className="prata-regular text-2xl font-bold mb-4 text-purple-900">{item.title}</h3>
              
//               <div className="space-y-2 mb-6">
//                 {item.details.map((detail, i) => (
//                   <p key={i} className="text-gray-600">{detail}</p>
//                 ))}
//               </div>
              
//               <a 
//                 href={item.action.link} 
//                 className="inline-block px-6 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
//               >
//                 {item.action.text}
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Contact Form and Map */}
//       <div className="container mx-auto px-6 pb-20">
//         <div className="grid lg:grid-cols-2 gap-12">
//           <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
//             <div className="flex items-center gap-2 mb-6">
//               <FiMessageSquare className="text-2xl text-purple-600" />
//               <h2 className="prata-regular text-3xl text-purple-900">Send Us a Message</h2>
//             </div>
            
//             <form className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 mb-2">Full Name</label>
//                   <input 
//                     type="text" 
//                     className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
//                     placeholder="Your name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Email Address</label>
//                   <input 
//                     type="email" 
//                     className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
//                     placeholder="your@email.com"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-gray-700 mb-2">Phone Number</label>
//                 <input 
//                   type="tel" 
//                   className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
//                   placeholder="080X XXX XXXX"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-gray-700 mb-2">Subject</label>
//                 <select className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600">
//                   <option value="">Select a subject</option>
//                   <option value="product">Product Inquiry</option>
//                   <option value="wholesale">Wholesale Partnership</option>
//                   <option value="training">Training Program</option>
//                   <option value="workshop">Workshop Booking</option>
//                   <option value="appointment">Store Appointment</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-gray-700 mb-2">Message</label>
//                 <textarea 
//                   rows="5"
//                   className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
//                   placeholder="How can we assist you?"
//                   required
//                 ></textarea>
//               </div>
              
//               <button 
//                 type="submit"
//                 className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
          
//           <div>
//             <div className="h-full rounded-2xl overflow-hidden shadow-lg border border-purple-100">
//               <iframe 
//                 title="Scent Design Location"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.538973073345!2d3.896468214794002!3d7.064618318366624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039f2f5d9f3c6d5%3A0x7c0f0d4b7f4d4b7d!2sOld%20Bodija%2C%20Ibadan%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 className="min-h-[500px]"
//               ></iframe>
//             </div>
            
//             <div className="mt-6 bg-purple-900 text-white rounded-2xl p-6">
//               <h3 className="prata-regular text-xl font-bold mb-4">Frequently Asked Questions</h3>
//               <div className="space-y-4">
//                 {[
//                   {
//                     question: "What are your opening hours?",
//                     answer: "We're open Monday to Friday from 9:00 AM to 6:00 PM and Saturday from 10:00 AM to 4:00 PM. Closed on Sundays."
//                   },
//                   {
//                     question: "Do you offer international shipping?",
//                     answer: "Currently, we only ship within Nigeria. We're working on expanding our shipping options."
//                   },
//                   {
//                     question: "Can I visit your store to test fragrances?",
//                     answer: "Absolutely! Visit us at our Ibadan location to experience our full fragrance collection. Appointments are recommended."
//                   },
//                   {
//                     question: "How long does delivery take within Nigeria?",
//                     answer: "Delivery typically takes 3-5 business days within major cities and 5-7 business days to other locations."
//                   },
//                   {
//                     question: "Do you offer gift wrapping services?",
//                     answer: "Yes, we offer complimentary gift wrapping for all orders. You can add a gift message during checkout."
//                   },
//                   {
//                     question: "What payment methods do you accept?",
//                     answer: "We accept all major credit cards, bank transfers, and cash on delivery within Ibadan."
//                   }
//                 ].map((faq, index) => (
//                   <div key={index} className="border-b border-white/20 pb-4 last:border-0">
//                     <details className="group">
//                       <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
//                         <span>{faq.question}</span>
//                         <FiChevronDown className="text-xl transform group-open:rotate-180 transition-transform" />
//                       </summary>
//                       <p className="mt-2 text-sm text-gray-300">{faq.answer}</p>
//                     </details>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Social Proof Section */}
//       <div className="container mx-auto px-6 pb-20">
//         <div className="text-center max-w-3xl mx-auto">
//           <h2 className="prata-regular text-3xl text-purple-900 mb-4">What Our Customers Say</h2>
//           <div className="w-20 h-1 bg-amber-500 mx-auto mb-8"></div>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Tolu Adeyemi",
//                 role: "Fragrance Enthusiast",
//                 comment: "Scent Design transformed my understanding of perfumery. Their bespoke fragrance service is exceptional!",
//                 rating: "★★★★★"
//               },
//               {
//                 name: "Chinedu Okonkwo",
//                 role: "Wholesale Partner",
//                 comment: "Working with Scent Design has been a game-changer for my business. Their products are premium quality.",
//                 rating: "★★★★★"
//               },
//               {
//                 name: "Amina Bello",
//                 role: "Training Graduate",
//                 comment: "The perfumery training program was life-changing. I now run my own successful fragrance business!",
//                 rating: "★★★★★"
//               }
//             ].map((testimonial, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
//                 <div className="text-amber-500 mb-3">{testimonial.rating}</div>
//                 <p className="text-gray-700 italic mb-4">"{testimonial.comment}"</p>
//                 <div>
//                   <p className="font-bold text-purple-900">{testimonial.name}</p>
//                   <p className="text-sm text-gray-600">{testimonial.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       {/* CTA Section */}
//       <div className="bg-purple-900 text-white py-16">
//         <div className="container mx-auto px-6 text-center">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="prata-regular text-3xl md:text-4xl mb-6">Join Our Fragrance Community</h2>
//             <p className="text-xl mb-8">
//               Subscribe to our newsletter for exclusive offers, new product launches, 
//               and fragrance insights
//             </p>
            
//             <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-2">
//               <input 
//                 type="email" 
//                 placeholder="Your email address" 
//                 className="flex-1 px-6 py-4 rounded-lg text-purple-900 focus:outline-none"
//               />
//               <button 
//                 type="submit"
//                 className="bg-amber-500 text-purple-900 px-8 py-4 rounded-lg font-bold hover:bg-amber-400 transition-colors"
//               >
//                 Subscribe
//               </button>
//             </form>
            
//             <div className="mt-8 flex justify-center gap-6">
//               <a href="#" className="text-white hover:text-amber-400 transition-colors">
//                 <FiFacebook className="text-2xl" />
//               </a>
//               <a href="#" className="text-white hover:text-amber-400 transition-colors">
//                 <FiInstagram className="text-2xl" />
//               </a>
//               <a href="#" className="text-white hover:text-amber-400 transition-colors">
//                 <FiTwitter className="text-2xl" />
//               </a>
//               <a href="#" className="text-white hover:text-amber-400 transition-colors">
//                 <FiCalendar className="text-2xl" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


























// import React from 'react';
// import { FiMapPin, FiPhone, FiMail, FiClock, FiCalendar, FiMessageSquare, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
// import { assets } from '../assets/assets';

// const Contact = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-purple-600/10 to-amber-50 rounded-b-3xl overflow-hidden">
//         <div className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 mb-12 md:mb-0">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-[2px] bg-purple-600"></div>
//               <p className="font-medium text-sm text-purple-600">
//                 GET IN TOUCH
//               </p>
//             </div>
            
//             <h1 className="prata-regular text-5xl md:text-6xl text-purple-900 mb-6 leading-tight">
//               We'd Love to <span className="text-amber-600">Hear</span> From You
//             </h1>
            
//             <p className="text-xl text-gray-700 mb-8">
//               Have questions about our fragrances, training programs, or wholesale opportunities? 
//               Our team is ready to assist you.
//             </p>
            
//             <div className="flex flex-wrap gap-4">
//               <a 
//                 href="tel:+2349012345678" 
//                 className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
//               >
//                 <FiPhone className="text-xl" />
//                 Call Us
//               </a>
//               <a 
//                 href="mailto:info@scentdesign.ng" 
//                 className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center gap-2"
//               >
//                 <FiMail className="text-xl" />
//                 Email Us
//               </a>
//             </div>
//           </div>
          
//           <div className="md:w-1/2 flex justify-center">
//             <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl border-4 border-white">
//               <img 
//                 src={assets.scentdesignlogo} 
//                 alt="Scent Design Customer Service" 
//                 className="w-full h-auto"
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-purple-900/80 text-white p-4 text-center">
//                 <p className="prata-regular">Our fragrance experts are waiting</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Contact Information */}
//       <div className="container mx-auto px-6 py-20">
//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             {
//               icon: <FiMapPin className="text-3xl text-purple-600" />,
//               title: "Visit Us",
//               details: [
//                 "7 oyesina close, opposite 7 ibikunle avenue",
//                 "Old Bodija, Ibadan, Nigeria"
//               ],
//               action: {
//                 text: "Get Directions",
//                 link: "https://maps.google.com/?q=7+oyesina+close+ibadan"
//               }
//             },
//             {
//               icon: <FiPhone className="text-3xl text-purple-600" />,
//               title: "Call Us",
//               details: [
//                 "Customer Service: +234 901 234 5678",
//                 "Wholesale Inquiries: +234 902 345 6789",
//                 "Training Academy: +234 903 456 7890"
//               ],
//               action: {
//                 text: "Call Now",
//                 link: "tel:+2349012345678"
//               }
//             },
//             {
//               icon: <FiClock className="text-3xl text-purple-600" />,
//               title: "Business Hours",
//               details: [
//                 "Monday-Friday: 9:00 AM - 6:00 PM",
//                 "Saturday: 10:00 AM - 4:00 PM",
//                 "Sunday: Closed"
//               ],
//               action: {
//                 text: "Book Appointment",
//                 link: "/appointment"
//               }
//             }
//           ].map((item, index) => (
//             <div 
//               key={index} 
//               className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 text-center hover:shadow-xl transition-shadow"
//             >
//               <div className="mb-4">{item.icon}</div>
//               <h3 className="prata-regular text-2xl font-bold mb-4 text-purple-900">{item.title}</h3>
              
//               <div className="space-y-2 mb-6">
//                 {item.details.map((detail, i) => (
//                   <p key={i} className="text-gray-600">{detail}</p>
//                 ))}
//               </div>
              
//               <a 
//                 href={item.action.link} 
//                 className="inline-block px-6 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
//               >
//                 {item.action.text}
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Contact Form and Map */}
//       <div className="container mx-auto px-6 pb-20">
//         <div className="grid lg:grid-cols-2 gap-12">
//           <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
//             <div className="flex items-center gap-2 mb-6">
//               <FiMessageSquare className="text-2xl text-purple-600" />
//               <h2 className="prata-regular text-3xl text-purple-900">Send Us a Message</h2>
//             </div>
            
//             <form className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 mb-2">Full Name</label>
//                   <input 
//                     type="text" 
//                     className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
//                     placeholder="Your name"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Email Address</label>
//                   <input 
//                     type="email" 
//                     className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
//                     placeholder="your@email.com"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-gray-700 mb-2">Phone Number</label>
//                 <input 
//                   type="tel" 
//                   className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
//                   placeholder="080X XXX XXXX"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-gray-700 mb-2">Subject</label>
//                 <select className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600">
//                   <option value="">Select a subject</option>
//                   <option value="product">Product Inquiry</option>
//                   <option value="wholesale">Wholesale Partnership</option>
//                   <option value="training">Training Program</option>
//                   <option value="workshop">Workshop Booking</option>
//                   <option value="appointment">Store Appointment</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-gray-700 mb-2">Message</label>
//                 <textarea 
//                   rows="5"
//                   className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600" 
//                   placeholder="How can we assist you?"
//                   required
//                 ></textarea>
//               </div>
              
//               <button 
//                 type="submit"
//                 className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
          
//           <div>
//             <div className="h-full rounded-2xl overflow-hidden shadow-lg border border-purple-100">
//               <iframe 
//                 title="Scent Design Location"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.538973073345!2d3.896468214794002!3d7.064618318366624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039f2f5d9f3c6d5%3A0x7c0f0d4b7f4d4b7d!2sOld%20Bodija%2C%20Ibadan%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 className="min-h-[500px]"
//               ></iframe>
//             </div>
            
//             <div className="mt-6 bg-purple-900 text-white rounded-2xl p-6">
//               <h3 className="prata-regular text-xl font-bold mb-4">Frequently Asked Questions</h3>
//               <div className="space-y-4">
//                 {[
//                   {
//                     question: "Do you offer international shipping?",
//                     answer: "Yes, we ship globally through DHL and FedEx."
//                   },
//                   {
//                     question: "Can I visit your perfumery?",
//                     answer: "Yes, by appointment only. Book a tour through our contact form."
//                   },
//                   {
//                     question: "How long does training last?",
//                     answer: "Programs range from 2 weeks intensive to 6 months comprehensive."
//                   }
//                 ].map((faq, index) => (
//                   <div key={index} className="border-b border-white/20 pb-4 last:border-0">
//                     <p className="font-medium">{faq.question}</p>
//                     <p className="text-sm text-gray-300">{faq.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* CTA Section */}
//       <div className="bg-purple-900 text-white py-16">
//         <div className="container mx-auto px-6 text-center">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="prata-regular text-3xl md:text-4xl mb-6">Join Our Fragrance Community</h2>
//             <p className="text-xl mb-8">
//               Subscribe to our newsletter for exclusive offers, new product launches, 
//               and fragrance insights
//             </p>
            
//             <form className="flex max-w-xl mx-auto">
//               <input 
//                 type="email" 
//                 placeholder="Your email address" 
//                 className="flex-1 px-6 py-4 rounded-l-lg text-purple-900 focus:outline-none"
//               />
//               <button 
//                 type="submit"
//                 className="bg-amber-500 text-purple-900 px-8 py-4 rounded-r-lg font-bold hover:bg-amber-400 transition-colors"
//               >
//                 Subscribe
//               </button>
//             </form>
            
//             <div className="mt-8 flex justify-center gap-6">
//               <a href="#" className="text-white hover:text-amber-400 transition-colors">
//                 <FiFacebook className="text-2xl" />
//               </a>
//               <a href="#" className="text-white hover:text-amber-400 transition-colors">
//                 <FiInstagram className="text-2xl" />
//               </a>
//               <a href="#" className="text-white hover:text-amber-400 transition-colors">
//                 <FiTwitter className="text-2xl" />
//               </a>
//               <a href="#" className="text-white hover:text-amber-400 transition-colors">
//                 <FiCalendar className="text-2xl" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

















// import React, { useState } from 'react';
// import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Form submission logic would go here
//     alert('Message sent successfully!');
//     setFormData({ name: '', email: '', subject: '', message: '' });
//   };

//   return (
//     <div className="min-h-screen bg-amber-50 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center gap-2 mb-4">
//             <div className="w-8 h-[2px] bg-[#008753]"></div>
//             <h1 className="prata-regular text-3xl text-[#008753]">Contact Us</h1>
//             <div className="w-8 h-[2px] bg-[#008753]"></div>
//           </div>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Have questions or feedback? We'd love to hear from you! Reach out to us through any of the channels below.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Contact Information */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="prata-regular text-2xl text-[#008753] mb-6">Get In Touch</h2>
            
//             <div className="space-y-6">
//               <div className="flex items-start gap-4">
//                 <div className="mt-1 text-[#008753]">
//                   <FaMapMarkerAlt size={24} />
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-lg mb-1">Address</h3>
//                   <p className="text-gray-600">123 Food Street, Lagos, Nigeria</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-4">
//                 <div className="mt-1 text-[#008753]">
//                   <FaPhone size={24} />
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-lg mb-1">Phone</h3>
//                   <p className="text-gray-600">+234 812 345 6789</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-4">
//                 <div className="mt-1 text-[#008753]">
//                   <FaEnvelope size={24} />
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-lg mb-1">Email</h3>
//                   <p className="text-gray-600">contact@nigeriancuisine.com</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-4">
//                 <div className="mt-1 text-[#008753]">
//                   <FaClock size={24} />
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-lg mb-1">Opening Hours</h3>
//                   <p className="text-gray-600">Monday - Saturday: 10am - 10pm</p>
//                   <p className="text-gray-600">Sunday: 12pm - 8pm</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-8">
//               <h3 className="font-medium text-lg mb-4">Follow Us</h3>
//               <div className="flex gap-4">
//                 {[1, 2, 3, 4].map((item) => (
//                   <div key={item} className="w-10 h-10 rounded-full bg-[#008753]/10 flex items-center justify-center text-[#008753] hover:bg-[#008753] hover:text-white transition-colors cursor-pointer">
//                     <span className="font-bold">f</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="prata-regular text-2xl text-[#008753] mb-6">Send Us a Message</h2>
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
//                 <input 
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   type="text" 
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent" 
//                   placeholder="Your name"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
//                 <input 
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   type="email" 
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent" 
//                   placeholder="your@email.com"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
//                 <input 
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   type="text" 
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent" 
//                   placeholder="Subject"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
//                 <textarea 
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent min-h-[150px]" 
//                   placeholder="Your message"
//                   required
//                 />
//               </div>
              
//               <button 
//                 type="submit" 
//                 className="w-full bg-[#008753] text-white py-3 rounded-lg font-medium hover:bg-[#006641] transition-colors"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
        
//         {/* Map Section */}
//         <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="h-80 w-full bg-gray-200 flex items-center justify-center">
//             <p className="text-gray-500">Map would be displayed here</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


























// import React from "react";
// import Title from "../components/Title";
// import { assets } from "../assets/assets";
// import NewsletterBox from "../components/NewsletterBox";

// const Contact = () => {
//   return (
//     <div>
//       <div className="text-center text-2xl pt-10 border-t">
//         <Title text1={"CONTACT"} text2={"US"} />
//       </div>

//       <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
//         <img
//           className="w-full md:max-w-[480px]"
//           src={assets.contact_img}
//           alt=""
//         />
//         <div className="flex flex-col justify-center items-start gap-6">
//           <p className="prata-regular text-xl  bg-golden-brown bg-clip-text text-transparent bg-to-b">
//             Our Store
//           </p>
//           <p className=" text-gray-500">
//             117 Red Oak Lane <br />, Beebe, Arkansas
//           </p>
//           <div className="w-full flex justify-center">
//             <iframe
//               title="Google Map"
//               style={{
//                 width: "100%",
//                 maxWidth: "480px",
//                 height: "300px",
//                 border: "0",
//               }}
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.299332383841!2d-91.87977332456868!3d35.07003367257451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d28216e3d2d4f7%3A0x8cfb7f556dd86eb4!2s117%20Red%20Oak%20Ln%2C%20Beebe%2C%20AR%2072021%2C%20USA!5e0!3m2!1sen!2sus!4v1705933294885!5m2!1sen!2sus"
//               allowFullScreen
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </div>

//           <p className=" text-gray-500">
//             Tel:{" "}
//             <a className="underline" href="tel:5012982272">
//               5012982272
//             </a>{" "}
//             <br /> Email:{" "}
//             <a className="underline" href="mailto:aflyboyp51@gmail.com">
//               aflyboy51@gmail.com
//             </a>
//           </p>
//           <p className="prata-regular text-xl  bg-golden-brown bg-clip-text text-transparent bg-to-b">
//             Careers at Flyboy
//           </p>
//           <p className=" text-gray-500">
//             Learn more about our teams and job openings.
//           </p>
//           <button className="border border-white text-white px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 bg-[#333333]">
//             <a href="mailto:aflyboyp51@gmail.com">Explore Jobs</a>
//           </button>
//         </div>
//       </div>

//       <NewsletterBox />
//     </div>
//   );
// };

// export default Contact;
