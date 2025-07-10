import React from 'react';
import { assets } from '../assets/assets';

const Sustainability = () => {
  return (
    <section id="sustainability" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-purple-600"></div>
            <p className="font-medium text-sm text-purple-600">
              GREEN NIGERIA INITIATIVE
            </p>
          </div>
          <h2 className="prata-regular text-4xl text-purple-900 mb-4">
            Sustainable Perfumery
          </h2>
          <p className="text-xl text-gray-600">
            Committed to environmental stewardship and community empowerment
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-purple-50 p-8 rounded-2xl shadow-lg border border-purple-100">
            <h3 className="prata-regular text-3xl font-bold mb-6 text-purple-900">
              Our Environmental Commitments
            </h3>
            <div className="space-y-8">
              {[
                {
                  title: "Reforestation Projects",
                  content: "Planted 50,000 scent trees across 12 states",
                  progress: 80
                },
                {
                  title: "Plastic Neutral Program",
                  content: "Recycled 12 tons of ocean plastic from Niger Delta",
                  progress: 65
                },
                {
                  title: "Solar Energy Transition",
                  content: "60% of Ibadan HQ powered by solar energy",
                  progress: 45
                }
              ].map((item, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between">
                    <h4 className="text-xl font-semibold text-purple-900">{item.title}</h4>
                    <span className="text-purple-600">{item.progress}%</span>
                  </div>
                  <p className="text-gray-600 mb-2">{item.content}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-900 text-white p-12 rounded-2xl shadow-2xl relative overflow-hidden">
            <img 
              src={assets.class1} 
              alt="Community impact"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative">
              <h3 className="prata-regular text-3xl font-bold mb-8">Community Impact</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    stat: "Millions",
                    label: "Paid to Rural Harvesters (2023)"
                  },
                  {
                    stat: "120+",
                    label: "Cooperative Partnerships"
                  },
                  // {
                  //   stat: "15",
                  //   label: "Local Language Training Manuals"
                  // },
                  {
                    stat: "7",
                    label: "State Partnerships"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 p-6 rounded-xl">
                    <p className="text-4xl font-bold mb-2">{item.stat}</p>
                    <p className="text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Ethical Sourcing",
              description: "Direct partnerships with 80+ farming communities across Nigeria",
              image: assets.ing1
            },
            {
              title: "Zero Waste Production",
              description: "98% of production waste recycled or repurposed",
              image: assets.ing2
            },
            {
              title: "Community Training",
              description: "250+ women trained in sustainable harvesting techniques",
              image: assets.ing3
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-purple-50 rounded-2xl overflow-hidden shadow-lg border border-purple-100"
            >
              <div className="h-64">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="prata-regular text-xl font-bold mb-2 text-purple-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div> */}

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="prata-regular text-3xl font-bold mb-6 text-purple-900">
              Our Certifications
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              <img 
                src={assets.nafdac} 
                alt="NAFDAC Certified" 
                className="h-16 w-auto opacity-80"
              />
              {/* <img 
                src={assets.son} 
                alt="SON Certified" 
                className="h-16 w-auto opacity-80"
              />
              <img 
                src={assets.iso} 
                alt="ISO Certified" 
                className="h-16 w-auto opacity-80"
              /> */}
            </div>
            <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
              All our products meet international quality standards while preserving traditional Nigerian craftsmanship
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;