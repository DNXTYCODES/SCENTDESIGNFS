import React from 'react';
import { Link } from 'react-router-dom';
import AboutUs from '../components/AboutUs';
import { assets } from '../assets/assets';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600/10 to-amber-50 rounded-b-3xl overflow-hidden">
        <div className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-purple-600"></div>
              <p className="font-medium text-sm text-purple-600">
                ABOUT SCENT DESIGN
              </p>
            </div>
            
            <h1 className="prata-regular text-5xl md:text-6xl text-purple-900 mb-6 leading-tight">
              Crafting <span className="text-amber-600">African</span> Fragrance Excellence
            </h1>
            
            <p className="text-xl text-gray-700 mb-8">
              Discover the passion, heritage, and craftsmanship behind Nigeria's premier perfumery house.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Explore Collections
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <img 
                src={assets.sdlab} 
                alt="Scent Design Laboratory" 
                className="w-full h-auto rounded-2xl shadow-xl border-4 border-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-purple-100">
                <p className="prata-regular text-purple-900">Since 1997</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AboutUs Component */}
      <AboutUs />
      
      {/* Mission Section */}
      <section className="py-20 bg-purple-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-purple-600"></div>
              <p className="font-medium text-sm text-purple-600">
                OUR MISSION
              </p>
            </div>
            <h2 className="prata-regular text-4xl text-purple-900 dark:text-white mb-4">
              Preserving Heritage, Innovating Scents
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cultural Preservation",
                description: "Documenting and preserving traditional Nigerian fragrance techniques and formulas",
                icon: "📜"
              },
              {
                title: "Sustainable Sourcing",
                description: "Ethically sourcing botanicals from local communities across Nigeria",
                icon: "🌱"
              },
              {
                title: "Global Recognition",
                description: "Putting African perfumery on the global luxury fragrance map",
                icon: "🌍"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-purple-100 text-center"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-purple-600"></div>
              <p className="font-medium text-sm text-purple-600">
                MASTER PERFUMERS
              </p>
            </div>
            <h2 className="prata-regular text-4xl text-purple-900 dark:text-white mb-4">
              The Noses Behind Our Scents
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our team of expert perfumers blends tradition with innovation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Amina Adebayo",
                role: "Lead Perfumer",
                bio: "Descendant of Yoruba herbalists with 20 years in fragrance design",
                image: assets.cs1
              },
              {
                name: "Chike Obi",
                role: "Botanical Expert",
                bio: "PhD in Ethnobotany, specialist in Nigerian aromatic plants",
                image: assets.cs1
              },
              {
                name: "Zainab Mohammed",
                role: "Creative Director",
                bio: "Blending Northern Nigerian traditions with modern aesthetics",
                image: assets.cs1
              },
              {
                name: "Emeka Nwankwo",
                role: "Training Director",
                bio: "Certified master perfumer trained in Paris and Grasse",
                image: assets.cs4
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className="bg-purple-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative h-64">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold dark:text-white">{member.name}</h3>
                  <p className="text-purple-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="prata-regular text-4xl mb-6">Experience Nigerian Luxury</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Discover our exclusive collections crafted with Nigerian botanicals and expertise
          </p>
          <Link 
            to="/products" 
            className="px-8 py-4 bg-amber-500 text-purple-900 rounded-lg font-medium hover:bg-amber-400 transition-colors inline-block"
          >
            Explore Fragrances
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
















// import React from 'react';
// import { FaUtensils, FaLeaf, FaHeart, FaUsers } from 'react-icons/fa';

// const About = () => {
//   const features = [
//     {
//       icon: <FaUtensils size={36} />,
//       title: "Authentic Recipes",
//       description: "Traditional recipes passed down through generations"
//     },
//     {
//       icon: <FaLeaf size={36} />,
//       title: "Fresh Ingredients",
//       description: "Locally sourced, organic ingredients daily"
//     },
//     {
//       icon: <FaHeart size={36} />,
//       title: "Made with Love",
//       description: "Every dish prepared with care and passion"
//     },
//     {
//       icon: <FaUsers size={36} />,
//       title: "Community Focused",
//       description: "Supporting local farmers and producers"
//     }
//   ];

//   const team = [
//     { name: "Chioma Adebayo", role: "Head Chef" },
//     { name: "Emeka Nwankwo", role: "Sous Chef" },
//     { name: "Amina Suleiman", role: "Pastry Chef" },
//     { name: "Tunde Okafor", role: "Restaurant Manager" }
//   ];

//   return (
//     <div className="min-h-screen bg-amber-50 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-[#008753]/10 to-amber-50 rounded-3xl overflow-hidden mb-16">
//           <div className="grid grid-cols-1 md:grid-cols-2">
//             <div className="p-8 md:p-12 flex items-center">
//               <div>
//                 <div className="inline-flex items-center gap-2 mb-4">
//                   <div className="w-8 h-[2px] bg-[#008753]"></div>
//                   <p className="font-medium text-sm text-[#008753]">OUR STORY</p>
//                 </div>
//                 <h1 className="prata-regular text-4xl md:text-5xl text-[#008753] mb-4">
//                   Taste of <span className="text-amber-600">Nigeria</span>
//                 </h1>
//                 <p className="text-gray-700 mb-6 text-lg">
//                   Bringing authentic Nigerian flavors to your table since 2010
//                 </p>
//               </div>
//             </div>
//             <div className="h-80 md:h-auto bg-gray-200 flex items-center justify-center">
//               <p className="text-gray-500">Restaurant image</p>
//             </div>
//           </div>
//         </div>

//         {/* Our Story */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
//           <h2 className="prata-regular text-3xl text-[#008753] mb-6 text-center">Our Journey</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//             <div className="space-y-4">
//               <p className="text-gray-700">
//                 Founded in 2010 by Chef Chioma Adebayo, Taste of Nigeria began as a small family kitchen 
//                 sharing authentic Nigerian dishes with the local community. What started as a passion project 
//                 quickly grew into a beloved culinary destination.
//               </p>
//               <p className="text-gray-700">
//                 Our mission is simple: to preserve and celebrate Nigeria's rich culinary heritage while 
//                 creating a warm, welcoming space for everyone to experience the vibrant flavors of West Africa.
//               </p>
//               <p className="text-gray-700">
//                 Every dish tells a story - from our signature Jollof Rice to our perfectly spiced Suya. 
//                 We source ingredients locally whenever possible and stay true to traditional cooking methods.
//               </p>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               {[1, 2, 3, 4].map((item) => (
//                 <div key={item} className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
//                   <p className="text-gray-500">Food Image</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Features */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {features.map((feature, index) => (
//             <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
//               <div className="text-[#008753] mb-4 flex justify-center">
//                 {feature.icon}
//               </div>
//               <h3 className="prata-regular text-xl text-[#008753] mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Team Section */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
//           <h2 className="prata-regular text-3xl text-[#008753] mb-8 text-center">Meet Our Team</h2>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {team.map((member, index) => (
//               <div key={index} className="text-center">
//                 <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
//                   <p className="text-gray-500">Photo</p>
//                 </div>
//                 <h3 className="prata-regular text-xl text-[#008753]">{member.name}</h3>
//                 <p className="text-gray-600">{member.role}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Values */}
//         <div className="bg-gradient-to-r from-[#008753]/10 to-amber-50 rounded-3xl p-8">
//           <h2 className="prata-regular text-3xl text-[#008753] mb-6 text-center">Our Values</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="prata-regular text-xl text-[#008753] mb-3">Authenticity</h3>
//               <p className="text-gray-700">
//                 We stay true to traditional recipes and cooking techniques, ensuring every dish is a genuine taste of Nigeria.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="prata-regular text-xl text-[#008753] mb-3">Quality</h3>
//               <p className="text-gray-700">
//                 From sourcing ingredients to final preparation, we maintain the highest standards in every step.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="prata-regular text-xl text-[#008753] mb-3">Community</h3>
//               <p className="text-gray-700">
//                 We believe in building relationships with our customers and supporting our local community.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;