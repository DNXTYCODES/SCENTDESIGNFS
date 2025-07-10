import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  const slides = [
    { type: "image", src: assets.ceowpeople, caption: "Nigerian Craftsmanship" },
    { type: "image", src: assets.carouselmodel1, caption: "Premium Fragrances" },
    { type: "image", src: assets.carouselbw, caption: "Scent Design Expertise" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="bg-purple-gradient rounded-3xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="text-center md:text-left max-w-md">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-8 h-[2px] bg-purple-primary"></div>
              <p className="font-medium text-sm text-purple-primary">
                AUTHENTIC FRAGRANCES
              </p>
            </div>

            <h1 className="prata-regular text-4xl md:text-5xl lg:text-6xl text-purple-primary mb-4 leading-tight">
              Nigerian Craftsmanship in <span className="text-gold-500">Every Bottle</span>
            </h1>

            <p className="text-gray-700 mb-8 text-lg">
              Scent Design Nigeria, where fragrance is our passion. Experience the rich olfactory heritage of Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/products"
                className="px-8 py-3 bg-purple-primary text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <button>Explore Collections</button>
              </Link>
              <a
                href="wa.me/8028293058"
                className="px-8 py-3 border-2 border-purple-primary text-purple-primary rounded-lg font-medium hover:bg-purple-50 transition-colors"
              >
                <button>Talk to Us</button>
              </a>
            </div>

            <div className="mt-10 flex justify-center md:justify-start">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-primary"></div>
                  <p className="text-sm">Premium Ingredients</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-primary"></div>
                  <p className="text-sm">Traditional Recipes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Slideshow */}
        <div className="w-full md:w-1/2 h-[500px] relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-full w-full">
                <img
                  className="w-full h-full object-cover"
                  src={slide.src}
                  alt="Scent Design Perfumes"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="prata-regular text-white text-2xl text-center">
                    {slide.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-purple-primary" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;























// import React, { useState, useEffect } from "react";
// import { assets } from "../assets/assets";
// import { Link, NavLink } from "react-router-dom";

// const Hero = () => {
//   const slides = [
//     { type: "image", src: assets.jollof, caption: "Our Signature Jollof Rice" },
//     { type: "image", src: assets.pe, caption: "Freshly Pounded Yam & Soup" },
//     { type: "image", src: assets.sp, caption: "Suya Platter with Spices" },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="bg-gradient-to-r from-[#008753]/10 to-amber-50 rounded-3xl overflow-hidden">
//       <div className="flex flex-col md:flex-row">
//         {/* Left Content */}
//         <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
//           <div className="text-center md:text-left max-w-md">
//             <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
//               <div className="w-8 h-[2px] bg-[#008753]"></div>
//               <p className="font-medium text-sm text-[#008753]">
//                 AUTHENTIC FLAVORS
//               </p>
//             </div>

//             <h1 className="prata-regular text-4xl md:text-5xl lg:text-6xl text-[#008753] mb-4 leading-tight">
//               Taste of <span className="text-amber-600">Nigeria</span>
//             </h1>

//             <p className="text-gray-700 mb-8 text-lg">
//               Experience the rich culinary heritage of Africa with our freshly
//               prepared traditional meals
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//               <Link
//                 to="/orders"
//                 className="px-8 py-3 bg-[#008753] text-white rounded-lg font-medium hover:bg-[#006641] transition-colors"
//               >
//                 <button>Order Now</button>
//               </Link>
//               <Link
//                 to="/menu"
//                 className="px-8 py-3 border-2 border-[#008753] text-[#008753] rounded-lg font-medium hover:bg-[#008753]/10 transition-colors"
//               >
//                 <button>View Menu</button>{" "}
//               </Link>
//             </div>

//             <div className="mt-10 flex justify-center md:justify-start">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-full bg-[#008753]"></div>
//                   <p className="text-sm">Fresh Ingredients</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-full bg-[#008753]"></div>
//                   <p className="text-sm">Traditional Recipes</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Slideshow */}
//         <div className="w-full md:w-1/2 h-[500px] relative">
//           {slides.map((slide, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-1000 ${
//                 index === currentIndex ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <div className="relative h-full w-full">
//                 <img
//                   className="w-full h-full object-cover"
//                   src={slide.src}
//                   alt="Nigerian cuisine"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
//                   <p className="prata-regular text-white text-2xl text-center">
//                     {slide.caption}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Slide Indicators */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-3 h-3 rounded-full ${
//                   index === currentIndex ? "bg-[#008753]" : "bg-white/50"
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;


















// import React, { useState, useEffect } from 'react';
// import { assets } from '../assets/assets';

// const Hero = () => {
//   const slides = [
//     { src: assets.a1, alt: "Latest iPhones in Nigeria" },
//     { src: assets.a12, alt: "Premium Laptops Collection" },
//     { src: assets.b6, alt: "Tech Accessories" },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-gradient-to-r from-blue-900 to-purple-800 z-1">
//       {/* Text Overlay */}
//       <div className="absolute inset-0 z-10 flex items-center px-4 md:px-12 lg:px-24 text-white">
//         <div className="max-w-2xl space-y-4 md:space-y-6">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-1 bg-green-500"></div>
//             <p className="font-semibold text-sm md:text-lg">Nigeria's Leading Tech Store</p>
//           </div>
//           <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//             Premium Gadgets & Tech Essentials
//           </h1>
//           <p className="text-lg md:text-xl">
//             Get the Latest Laptops, iPhones & Accessories at Best Prices
//           </p>
//           <div className="flex gap-4 mt-6">
//             <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-sm md:text-base transition-all">
//               Shop Now
//             </button>
//             <button className="border border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full text-sm md:text-base transition-all">
//               View Deals
//             </button>
//           </div>
//           <p className="text-sm mt-4 opacity-80">
//             ₦ Best Price Guarantee • 100% Genuine Products • Free Lagos Delivery
//           </p>
//         </div>
//       </div>

//       {/* Image Carousel */}
//       <div className="relative w-full h-full">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentIndex ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <img
//               src={slide.src}
//               alt={slide.alt}
//               className="w-full h-full object-cover object-right"
//             />
//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-800/50"></div>
//           </div>
//         ))}
//       </div>

//       {/* Carousel Dots */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full transition-all ${
//               index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Hero;

// import React, { useState, useEffect } from 'react';
// import { assets } from '../assets/assets';

// const Hero = () => {
//   const slides = [
//     { type: 'image', src: assets.e1 }, // Replace with your video path
//     { type: 'image', src: assets.a12 }, // Replace with your first image path
//     { type: 'image', src: assets.b6 },  // Replace with your second image path
//   ];
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Automatically change slides every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="flex flex-col sm:flex-row border border-gray-700 rounded-3xl bg-golden-brown bg-clip-text text-transparent bg-to-b">
//       {/* Hero Left Side */}
//       <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
//         <div>
//           <div className="flex items-center gap-2">
//             <p className="w-8 md:w-11 h-[2px] bg-white"></p>
//             <p className="font-medium text-sm">TIMELESS ELEGANCE</p>
//           </div>
//           <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
//             LUXURY WATCHES
//           </h1>
//           <div className="flex items-center gap-2">
//             <p className="font-semibold text-sm md:text-base">EXCLUSIVE DESIGNS</p>
//             <p className="w-8 md:w-11 h-[1px] bg-white"></p>
//           </div>
//         </div>
//       </div>

//       {/* Hero Right Side - Slideshow */}
//       <div className="w-full sm:w-1/2 h-[500px] rounded-3xl relative overflow-hidden z-[0]">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute w-full h-full transition-opacity duration-1000 ${
//               index === currentIndex ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             {slide.type === 'video' ? (
//               <video
//                 className="w-full h-full object-cover rounded-3xl"
//                 src={slide.src}
//                 autoPlay
//                 loop
//                 muted
//               />
//             ) : (
//               <img
//                 className="w-full h-full object-cover rounded-3xl z-[0]"
//                 src={slide.src}
//                 alt="LUXURY WRISTWATCH with GOLD and DIAMOND accents"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Hero;

// import React from 'react'
// import { assets } from '../assets/assets'

// const Hero = () => {
//   return (
//     <div className='flex flex-col sm:flex-row border rounded-3xl bg-golden-brown bg-clip-text text-transparent bg-to-b'>
//       {/* Hero Left Side */}
//       <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
//             <div>
//                 <div className='flex items-center gap-2'>
//                     <p className='w-8 md:w-11 h-[2px] bg-white'></p>
//                     <p className=' font-medium text-sm md:'>OUR BESTSELLERS</p>
//                 </div>
//                 <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
//                 <div className='flex items-center gap-2'>
//                     <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
//                     <p className='w-8 md:w-11 h-[1px] bg-white'></p>
//                 </div>
//             </div>
//       </div>
//       {/* Hero Right Side */}
//       <img className='w-full sm:w-1/2 rounded-3xl' src={assets.b6} alt="" />
//     </div>
//   )
// }

// export default Hero
