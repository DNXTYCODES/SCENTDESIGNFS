









import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <img src={assets.scentdesignlogo} alt="Scent Design Logo" className="h-16 w-auto opacity-90" />
            </div>
            <p className="text-gray-300 mb-4">
              Nigerian Craftsmanship in Every Bottle
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <FiInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-500 transition-colors">
                <FiLinkedin className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-amber-500 transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-amber-500 transition-colors">Collections</a></li>
              <li><a href="#training" className="hover:text-amber-500 transition-colors">Perfume Academy</a></li>
              <li><a href="#workshops" className="hover:text-amber-500 transition-colors">Workshops</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe for exclusive offers and fragrance insights
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-lg w-full text-purple-900"
              />
              <button 
                type="submit"
                className="bg-amber-500 text-purple-900 px-4 py-2 rounded-r-lg font-bold hover:bg-amber-400 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              © {new Date().getFullYear()} Scent Design Nigeria Limited. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img 
                src={assets.opay} 
                alt="OPay" 
                className="h-8 w-auto opacity-80"
              />
              <img 
                src={assets.palmpay} 
                alt="PalmPay" 
                className="h-8 w-auto opacity-80"
              />
              <img 
                src={assets.verve} 
                alt="Verve" 
                className="h-8 w-auto opacity-80"
              />
              <img 
                src={assets.mastercard} 
                alt="Mastercard" 
                className="h-8 w-auto opacity-80"
              />
            </div>
          </div>
          <div className="mt-4 text-center md:text-left text-sm text-gray-400">
            <p>
              RC Number: 1234567 | VAT: NG-1234-56789 | View our <a href="#" className="text-amber-500 hover:underline">NAFDAC Certification</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



















// import React from "react";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
  
//   return (
//     <footer className="bg-[#008753] text-white">
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Brand Column */}
//           <div className="lg:col-span-2">
//             <h2 className="prata-regular text-3xl mb-4">
//               Ediere <span className="text-amber-400">Chops</span>
//             </h2>
//             <p className="mb-4 max-w-md">
//               Authentic Nigerian cuisine prepared with traditional recipes and fresh ingredients. 
//               Bringing the flavors of Africa to your table since 2025.
//             </p>
//             <div className="flex space-x-4">
//               <a href="https://www.instagram.com/edierechops" 
//                  aria-label="Visit our Instagram page"
//                  className="bg-white/10 p-2 rounded-full hover:bg-amber-500 transition-colors">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//                 </svg>
//               </a>
//               <a href="https://www.facebook.com/edierechops" 
//                  aria-label="Visit our Facebook page"
//                  className="bg-white/10 p-2 rounded-full hover:bg-amber-500 transition-colors">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
//                 </svg>
//               </a>
//               <a href="https://twitter.com/edierechops" 
//                  aria-label="Visit our Twitter page"
//                  className="bg-white/10 p-2 rounded-full hover:bg-amber-500 transition-colors">
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="prata-regular text-xl font-medium mb-5 border-b border-amber-500 pb-2">
//               Quick Links
//             </h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
//               </li>
//               <li>
//                 <Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link>
//               </li>
//               <li>
//                 <Link to="/menu" className="hover:text-amber-400 transition-colors">Our Menu</Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="prata-regular text-xl font-medium mb-5 border-b border-amber-500 pb-2">
//               Contact Us
//             </h3>
//             <ul className="space-y-3">
//               <li className="flex items-start">
//                 <svg className="w-5 h-5 mr-3 mt-0.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
//                 </svg>
//                 <a href="tel:+2348101234567" className="hover:text-amber-400 transition-colors">
//                   +234 810 123 4567
//                 </a>
//               </li>
//               <li className="flex items-start">
//                 <svg className="w-5 h-5 mr-3 mt-0.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                 </svg>
//                 <a href="mailto:info@edierechops.com" className="hover:text-amber-400 transition-colors">
//                   info@edierechops.com
//                 </a>
//               </li>
//               <li className="flex items-start">
//                 <svg className="w-5 h-5 mr-3 mt-0.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                 </svg>
//                 <span>
//                   123 Food Street, Lagos Island<br />
//                   Lagos, Nigeria
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Newsletter */}
//         <div className="mt-12 pt-8 border-t border-white/20">
//           <h3 className="prata-regular text-xl font-medium mb-4">
//             Subscribe to Our Newsletter
//           </h3>
//           <form className="flex flex-col sm:flex-row gap-3 max-w-xl">
//             <input 
//               type="email" 
//               placeholder="Your email address" 
//               className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
//               aria-label="Email for newsletter subscription"
//             />
//             <button 
//               type="submit"
//               className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="bg-[#006641] py-5">
//         <div className="max-w-6xl mx-auto px-4 text-center text-sm">
//           <p>
//             &copy; {currentYear} Ediere Chops. All rights reserved. 
//             <span className="mx-2">|</span>
//             <Link to="/privacy" className="hover:text-amber-400 transition-colors mx-2">Privacy Policy</Link>
//             <span className="mx-2">|</span>
//             <Link to="/terms" className="hover:text-amber-400 transition-colors mx-2">Terms of Service</Link>
//           </p>
//           <p className="mt-2 text-white/80">
//             Authentic Nigerian Cuisine & African Food Specialties
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

















// import React from "react";
// import { assets } from "../assets/assets";

// const Footer = () => {
//   return (
//     <div>
//       <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
//         <div>
//           <img src={assets.flyboylogo} className="mb-5 w-32" alt="" />
//         </div>

//         <div>
//           <p className="prata-regular text-xl font-medium mb-5">COMPANY</p>
//           <ul className="flex flex-col gap-1 text-gray-600">
//             <li>
//               <a href="/">Home</a>
//             </li>
//             <li>
//               <a href="/about">About us</a>
//             </li>
//             <li>
//               <a href="/collection">Collections</a>
//             </li>
//             {/* <li>Delivery</li>
//             <li>Privacy policy</li> */}
//           </ul>
//         </div>

//         <div>
//           <p className="prata-regular text-xl font-medium mb-5">GET IN TOUCH</p>
//           <ul className="flex flex-col gap-1 text-gray-600">
//             <li>
//               <a className="underline" href="tel:501 288 2272">501 288 2272</a>
//               </li>
//             <li>
//               <a className="underline" href="mailto:aflyboyp51@gmail.com">aflyboyp51@gmail.com</a>
//             </li>
//             <li>
//               <a className="underline" href="https://www.instagram.com/flyboy_customs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">instagram</a>
//             </li>
//             <li>
//               <a className="underline" href="https://www.facebook.com/share/12Fk7sQUFcW/">facebook</a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div>
//         <hr />
//         <p className="prata-regular py-5 text-sm text-center">
//           Copyright 2025@ flyboyluxury.com - All Right Reserved.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Footer;
