import React from 'react';
import { FiCheckCircle, FiGlobe, FiPackage, FiUsers } from 'react-icons/fi';
import { FaHandshake, FaShippingFast } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';

const WholesaleProgram = () => {
  const tiers = [
    {
      name: "Basic Partner",
      minOrder: 500000,
      discount: "5%",
      features: [
        "10+ fragrance options",
        "Monthly inventory refresh",
        "Basic marketing materials",
        "Email support"
      ],
      icon: <FiPackage className="text-4xl" />
    },
    {
      name: "Professional Partner",
      minOrder: 1500000,
      discount: "10%",
      features: [
        "25+ exclusive fragrances",
        "Bi-weekly inventory updates",
        "Custom branding options",
        "Priority shipping",
        "Dedicated account manager"
      ],
      icon: <FaHandshake className="text-4xl" />
    },
    {
      name: "Enterprise Partner",
      minOrder: 5000000,
      discount: "15%",
      features: [
        "Full product catalog access",
        "Weekly new releases",
        "White-label solutions",
        "24/7 VIP support",
        "Market development funds",
        "Co-branded marketing campaigns"
      ],
      icon: <FiGlobe className="text-4xl" />
    }
  ];

  const benefits = [
    { 
      icon: <GiReceiveMoney className="text-4xl text-purple-600" />,
      title: "Bulk Discounts",
      text: "Enjoy volume-based pricing with discounts up to 15%"
    },
    {
      icon: <FaShippingFast className="text-4xl text-purple-600" />,
      title: "Direct Shipping",
      text: "We handle logistics with door-to-door delivery across Nigeria"
    },
    {
      icon: <FiUsers className="text-4xl text-purple-600" />,
      title: "Dedicated Support",
      text: "Personal account managers and 24/7 business support"
    },
    {
      icon: <FiCheckCircle className="text-4xl text-purple-600" />,
      title: "Quality Guarantee",
      text: "NAFDAC-certified products with 100% satisfaction guarantee"
    }
  ];

  return (
    <section id="wholesale" className="py-20 bg-purple-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-purple-600"></div>
            <p className="font-medium text-sm text-purple-600">
              BUSINESS PARTNERSHIPS
            </p>
          </div>
          <h2 className="prata-regular text-4xl text-purple-900 mb-4">
            Wholesale Partnership Program
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Grow your business with premium Nigerian fragrances at exclusive wholesale rates
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 text-center hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.text}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-shadow"
            >
              <div className="bg-purple-600 text-white p-8 text-center">
                <div className="mb-4">{tier.icon}</div>
                <h3 className="prata-regular text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-2">{tier.discount}</div>
                <p className="text-sm">Minimum Order: ₦{tier.minOrder.toLocaleString('en-NG')}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <FiCheckCircle className="text-purple-600 mr-2 mt-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
                  <a href="https://wa.me/+2348028293058">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors">
                  Join {tier.name}
                </button>
                  </a>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="bg-purple-900 text-white rounded-2xl p-8 shadow-xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="prata-regular text-3xl font-bold mb-2">Become a Wholesale Partner</h3>
              <p className="text-gray-200">Complete the form below to start your wholesale journey</p>
            </div>
            
            <form className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Business Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20" />
              </div>
              <div>
                <label className="block mb-2">Business Location</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20" />
              </div>
              <div>
                <label className="block mb-2">Preferred Tier</label>
                <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20">
                  {tiers.map((tier, i) => (
                    <option key={i} value={tier.name}>{tier.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Monthly Order Estimate (₦)</label>
                <input type="number" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Additional Requirements</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20"
                  placeholder="Special packaging needs, custom formulations, etc."
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-amber-500 hover:bg-amber-400 text-purple-900 py-3 rounded-lg font-bold transition-colors">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div> */}

        <div className="mt-20 text-center">
          <h3 className="prata-regular text-2xl font-bold text-purple-900 mb-8">
            Why Partner With Us?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg border border-purple-100">
              <div className="text-purple-600 text-4xl mb-4">55+</div>
              <p className="text-gray-600">Successful Retail Partners Across Nigeria</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg border border-purple-100">
              <div className="text-purple-600 text-4xl mb-4">₦17M+</div>
              <p className="text-gray-600">Annual Wholesale Revenue Generated</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg border border-purple-100">
              <div className="text-purple-600 text-4xl mb-4">100%</div>
              <p className="text-gray-600">Partner Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleProgram;