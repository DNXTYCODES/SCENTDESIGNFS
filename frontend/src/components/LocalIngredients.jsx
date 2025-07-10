import React from 'react';
import { FaCoins } from 'react-icons/fa';
import { FiAward, FiUsers } from 'react-icons/fi';
import { assets } from '../assets/assets';

const LocalIngredients = () => {
  const ingredients = [
    {
      name: "Ewe Rinrin",
      origin: "Yoruba Land",
      use: "Top Note",
      description: "Rare citrus leaf used in royal coronation rituals",
      image: assets.rinrin
    },
    {
      name: "Uda Seed",
      origin: "Igbo Land",
      use: "Base Note", 
      description: "Pungent spice central to New Yam festival celebrations",
      image: assets.uda
    },
    {
      name: "Lemon Grass",
      origin: "Yoruba Land",
      use: "Heart Note",
      description: "Smoked chili pepper used in masculine fragrances",
      image: assets.lemongrass
    },
    {
      name: "Nsang",
      origin: "Efik Land",
      use: "Fixative",
      description: "Sacred tree resin burned in purification ceremonies",
      image: assets.resin
    }
  ];

  return (
    <section id="ingredients" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-purple-600"></div>
            <p className="font-medium text-sm text-purple-600">
              NATURAL INGREDIENTS
            </p>
          </div>
          <h2 className="prata-regular text-4xl text-purple-900 mb-4">
            Nigerian Scent Elements
          </h2>
          <p className="text-xl text-gray-600">
            Sustainably sourced botanicals from Nigeria's diverse ecosystems
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((ingredient, index) => (
            <div 
              key={index}
              className="bg-purple-50 rounded-2xl overflow-hidden shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
            >
              <img 
                src={ingredient.image}
                alt={ingredient.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-purple-900">
                    {ingredient.name}
                  </h3>
                  <span className="text-sm bg-purple-600 text-white px-2 py-1 rounded">
                    {ingredient.origin}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {ingredient.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600">
                    Usage: {ingredient.use}
                  </span>
                  <span className="text-gray-500">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
          <h3 className="prata-regular text-3xl font-bold mb-8 text-purple-900">
            Ethical Sourcing Network
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Community Partnerships",
                content: "Direct trade with 120+ rural cooperatives",
                icon: <FiUsers className="text-4xl text-purple-600" />
              },
              {
                title: "Wild Harvest Certification",
                content: "NAFDAC-approved sustainable collection",
                icon: <FiAward className="text-4xl text-purple-600" />
              },
              {
                title: "Price Transparency",
                content: "40% premium over market rates paid to harvesters",
                icon: <FaCoins className="text-4xl text-purple-600" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-2 text-purple-900">
                  {item.title}
                </h4>
                <p className="text-gray-600">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalIngredients;