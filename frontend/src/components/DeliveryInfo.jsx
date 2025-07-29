import React from "react";
import { assets } from "../assets/assets";

const DeliveryInfo = () => {
  return (
    <div id="delivery" className="bg-purple-gradient rounded-3xl p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Address */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-purple-primary"></div>
            <p className="font-medium text-sm text-purple-primary">
              LOGISTICS INFORMATION
            </p>
          </div>

          <h2 className="prata-regular text-3xl text-purple-primary mb-6">
            Delivery & Payment Details
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-purple-primary mb-2">
              Our Office
            </h3>
            <p className="text-gray-700">
              7 Oyesina Close, Opposite 7 Ibikunle Avenue,<br/>
              Old Bodija, Ibadan, Nigeria
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
            <h3 className="text-xl font-semibold text-purple-primary mb-4 flex items-center gap-2">
              <img src={assets.fd} alt="Delivery" className="w-6 h-6" />
              Delivery Estimates & Costs
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-purple-primary mt-2 mr-3"></div>
                <span><strong>Ibadan:</strong> 1-3 business days</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-purple-primary mt-2 mr-3"></div>
                <span>
                  <strong>Outside Ibadan:</strong> 3-10 business days via God is Good Logistics<br/>
                  <span className="text-sm text-purple-700 mt-1 block">(Delivery fee varies by distance)</span>
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-purple-primary mt-2 mr-3"></div>
                <span>
                  <strong>Total Cost:</strong> Product cost + Delivery fee<br/>
                  <span className="text-sm text-purple-700 mt-1 block">(Calculated at checkout)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Payment Methods */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-purple-100">
            <h3 className="text-xl font-semibold text-purple-primary mb-6 flex items-center gap-2">
              Payment Options
            </h3>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="font-medium text-lg text-purple-primary">Payment Before Delivery</h4>
              </div>
              <p className="text-gray-700">
                Full payment required before dispatch.<br/> 
                Includes both product cost and delivery fee.
              </p>
              
              {/* Bank Account Details */}
              <div className="mt-4 bg-purple-50 rounded-lg p-4 border border-purple-100">
                <h5 className="font-semibold text-purple-primary mb-2">Bank Transfer Details:</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="font-medium">Account Name:</span>
                  <span>Scent Design Nigeria Ltd</span>
                  
                  <span className="font-medium">Account Number:</span>
                  <span>0063962854</span>
                  
                  <span className="font-medium">Bank:</span>
                  <span>Access Bank</span>
                </div>
                <p className="mt-3 text-xs text-purple-700">
                  Please send payment proof to our email/WhatsApp after transfer
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <h4 className="font-medium text-lg text-purple-primary">Online Payment</h4>
              </div>
              <p className="text-gray-700">
                Secure payments via cards, bank transfers, or mobile money.<br/>
                <span className="text-gold-500 font-medium">5% discount + priority processing</span>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-purple-100">
              <h4 className="font-semibold text-purple-primary mb-3">Important Notes:</h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 mr-2"></div>
                  <span><strong>Payment required</strong> before order processing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 mr-2"></div>
                  <span>Outside Ibadan deliveries via <strong>God is Good Logistics</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 mr-2"></div>
                  <span>Delivery fee calculated based on <strong>distance + order value</strong></span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 mr-2"></div>
                  <span>Free delivery for orders over ₦100,000 in Ibadan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;






















// import React from "react";
// import { assets } from "../assets/assets";

// const DeliveryInfo = () => {
//   return (
//     <div id="delivery" className="bg-purple-gradient rounded-3xl p-8">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Left Column - Address */}
//         <div className="w-full md:w-1/2">
//           <div className="flex items-center gap-2 mb-4">
//             <div className="w-8 h-[2px] bg-purple-primary"></div>
//             <p className="font-medium text-sm text-purple-primary">
//               LOGISTICS INFORMATION
//             </p>
//           </div>

//           <h2 className="prata-regular text-3xl text-purple-primary mb-6">
//             Delivery & Payment Details
//           </h2>

//           <div className="mb-8">
//             <h3 className="text-xl font-semibold text-purple-primary mb-2">
//               Our Office
//             </h3>
//             <p className="text-gray-700">
//               7 Oyesina Close, Opposite 7 Ibikunle Avenue,<br/>
//               Old Bodija, Ibadan, Nigeria
//             </p>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
//             <h3 className="text-xl font-semibold text-purple-primary mb-4 flex items-center gap-2">
//               <img src={assets.fd} alt="Delivery" className="w-6 h-6" />
//               Delivery Estimates
//             </h3>
//             <ul className="space-y-3 text-gray-700">
//               <li className="flex items-start">
//                 <div className="w-2 h-2 rounded-full bg-purple-primary mt-2 mr-3"></div>
//                 <span><strong>Lagos:</strong> 3-5 business days</span>
//               </li>
//               <li className="flex items-start">
//                 <div className="w-2 h-2 rounded-full bg-purple-primary mt-2 mr-3"></div>
//                 <span><strong>Ibadan:</strong> 1-3 business days</span>
//               </li>
//               <li className="flex items-start">
//                 <div className="w-2 h-2 rounded-full bg-purple-primary mt-2 mr-3"></div>
//                 <span><strong>Other cities:</strong> 5-10 business days</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Right Column - Payment Methods */}
//         <div className="w-full md:w-1/2">
//           <div className="bg-white rounded-xl p-6 h-full shadow-sm border border-purple-100">
//             <h3 className="text-xl font-semibold text-purple-primary mb-6 flex items-center gap-2">
//               <img src={assets.opay} alt="Payment" className="w-6 h-6" />
//               Payment Options
//             </h3>

//             <div className="mb-8">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="bg-purple-100 p-2 rounded-lg">
//                   <img src={assets.palmpay} alt="Cash on delivery" className="w-8 h-8" />
//                 </div>
//                 <h4 className="font-medium text-lg text-purple-primary">Payment on Delivery</h4>
//               </div>
//               <p className="text-gray-700 pl-11">
//                 Pay with cash or card when your order arrives. A ₦500 convenience fee applies to all COD orders.
//               </p>
//             </div>

//             <div>
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="bg-purple-100 p-2 rounded-lg">
//                   <img src={assets.opay} alt="Online payment" className="w-8 h-8" />
//                 </div>
//                 <h4 className="font-medium text-lg text-purple-primary">Online Payment</h4>
//               </div>
//               <p className="text-gray-700 pl-11">
//                 Secure payments via cards, bank transfers, or mobile money. All online payments receive 5% discount and priority processing.
//               </p>
//             </div>

//             <div className="mt-8 pt-6 border-t border-purple-100">
//               <h4 className="font-semibold text-purple-primary mb-3">Important Notes:</h4>
//               <ul className="text-gray-700 space-y-2 text-sm">
//                 <li className="flex items-start">
//                   <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 mr-2"></div>
//                   <span>Delivery times may vary during holiday seasons</span>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 mr-2"></div>
//                   <span>Orders above ₦50,000 require 50% advance payment</span>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 mr-2"></div>
//                   <span>Free delivery for orders over ₦100,000 in Ibadan</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryInfo;