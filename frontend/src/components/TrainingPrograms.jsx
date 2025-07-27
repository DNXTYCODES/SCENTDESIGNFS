import React from 'react';
import { FaCoins } from 'react-icons/fa';
import {  FiBookOpen } from 'react-icons/fi';
import { GiPlantRoots } from 'react-icons/gi';
import { assets } from '../assets/assets';

const TrainingPrograms = () => {
  const courses = [
    {
      title: "Traditional Nigerian Perfumery",
      duration: "3 Months",
      price: 250000,
      curriculum: [
        "History of Nigerian scent traditions",
        "Ethnic botanical knowledge",
        "Clay pot distillation methods",
        "Cultural significance of fragrances"
      ],
      outcome: "NAFDAC-certified Perfumer",
      icon: <GiPlantRoots className="text-4xl text-purple-600" />,
      image: assets.class1
    },
    {
      title: "Luxury Perfume Business",
      duration: "2 Months",
      price: 180000,
      curriculum: [
        "Nigerian export regulations",
        "Luxury brand positioning",
        "E-commerce strategies",
        "Scent marketing psychology"
      ],
      outcome: "Perfume Business Certification",
      icon: <FaCoins className="text-4xl text-purple-600" />,
      image: assets.class2
    }
  ];

  return (
    <section id="training" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-purple-600"></div>
            <p className="font-medium text-sm text-purple-600">
              PERFUMERY ACADEMY
            </p>
          </div>
          <h2 className="prata-regular text-4xl text-purple-900 mb-4">
            Master the Art of Fragrance
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Preserving Nigerian fragrance heritage while building global competitiveness
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="bg-purple-50 p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
              </div>
              
              <div className="mb-4">{course.icon}</div>
              <h3 className="prata-regular text-2xl font-bold mb-4 text-purple-900">{course.title}</h3>
              
              {/* <div className="mb-6">
                <span className="text-3xl font-bold text-purple-600">
                  ₦{course.price.toLocaleString('en-NG')}
                </span>
                <span className="text-gray-600 ml-2">/{course.duration}</span>
              </div> */}

              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3">Curriculum Highlights:</h4>
                <ul className="space-y-2">
                  {course.curriculum.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-100 p-4 rounded-lg mb-6">
                <p className="text-sm font-semibold text-purple-600">
                  Certification Outcome:
                </p>
                <p className="text-purple-900">{course.outcome}</p>
              </div>

                  
            <a href="wa.me/8028293058">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors">
                Enroll Now
              </button>
            </a>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 bg-purple-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <img 
            src={assets.class1} 
            alt="Scholarship workshop"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <h3 className="prata-regular text-3xl font-bold mb-4">Nigerian Artisan Scholarship</h3>
            <p className="text-xl mb-6">
              Full sponsorship for 20 exceptional candidates from Nigerian rural communities
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h4 className="text-lg font-bold mb-2">Eligibility Criteria</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Nigerian citizenship</li>
                  <li>Background in traditional herbal medicine</li>
                  <li>Letter from community leader</li>
                  <li>Passion for cultural preservation</li>
                </ul>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h4 className="text-lg font-bold mb-2">Program Benefits</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Full tuition coverage</li>
                  <li>Monthly stipend (₦50,000)</li>
                  <li>International certification</li>
                  <li>Startup seed funding</li>
                </ul>
              </div>
            </div>
            <a href="wa.me/8028293058">
            <button className="mt-8 px-8 py-3 bg-amber-500 text-purple-900 rounded-full hover:bg-amber-400 transition-colors font-bold">
              Apply Now
            </button>
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TrainingPrograms;