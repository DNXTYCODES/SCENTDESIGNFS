import React from 'react';
import { GiAfrica, GiFlowerEmblem, GiPlantRoots } from 'react-icons/gi';

const NigerianHeritage = () => {
  const timeline = [
    {
      year: "Pre-1500s",
      title: "Ancient Scent Traditions",
      content: "Indigenous communities using local botanicals for ceremonial oils and healing fragrances"
    },
    {
      year: "1890",
      title: "Colonial Influence",
      content: "Introduction of European distillation techniques blending with traditional methods"
    },
    {
      year: "1972",
      title: "First Modern Perfumery",
      content: "Establishment of Lagos-based fragrance house using Nigerian oils for export"
    },
    {
      year: "1997",
      title: "Scent Design NG Founding",
      content: "Launch of contemporary Nigerian perfume brand combining heritage and innovation"
    }
  ];

  return (
    <section id="heritage" className="py-20 bg-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-purple-600"></div>
            <p className="font-medium text-sm text-purple-600">
              OLFACTORY HERITAGE
            </p>
          </div>
          <h2 className="prata-regular text-4xl text-purple-900 mb-4">
            Nigerian Perfume Legacy
          </h2>
          <p className="text-xl text-gray-600">
            600+ years of fragrance craftsmanship across Nigerian civilizations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div 
                key={index}
                className="relative pl-8 border-l-4 border-purple-600"
              >
                <div className="absolute w-4 h-4 bg-purple-600 rounded-full -left-[10px] top-0" />
                <h3 className="prata-regular text-2xl font-bold mb-2 text-purple-900">
                  {item.year}: {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          {/* <div className="bg-white p-8 rounded-2xl shadow-xl border border-purple-100">
            <h3 className="prata-regular text-3xl font-bold mb-6 text-purple-900">
              Regional Fragrance Styles
            </h3>
            <div className="space-y-6">
              {[
                {
                  region: "South-West",
                  characteristics: ["Yoruba floral blends", "Palm wine accords", "Ooni royal scents"],
                  icon: <GiFlowerEmblem className="text-2xl text-purple-600" />
                },
                {
                  region: "North",
                  characteristics: ["Leather & spice notes", "Islamic-inspired attars", "Sahelian dry woods"],
                  icon: <GiAfrica className="text-2xl text-purple-600" />
                },
                {
                  region: "South-East",
                  characteristics: ["Igbo earthy tones", "New yam festival scents", "Rainforest resins"],
                  icon: <GiPlantRoots className="text-2xl text-purple-600" />
                }
              ].map((region, index) => (
                <div key={index} className="p-6 bg-purple-50 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="mr-3">
                      {region.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-purple-900">
                      {region.region} Style
                    </h4>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {region.characteristics.map((char, i) => (
                      <li key={i}>{char}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* <div className="mt-16 bg-purple-900 text-white rounded-2xl p-12 shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-5xl mb-6">🌿</div>
            <h3 className="prata-regular text-3xl font-bold mb-4">
              Preserving Nigeria's Olfactory Heritage
            </h3>
            <p className="text-xl mb-8">
              Partnership with National Museum Lagos to archive 200+ traditional fragrance formulas
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { number: "47", label: "Endangered Botanicals Preserved" },
                { number: "12", label: "Ethnic Groups Represented" },
                { number: "800+", label: "Ancient Recipes Digitized" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-xl">
                  <p className="text-4xl font-bold mb-2">{stat.number}</p>
                  <p className="text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default NigerianHeritage;