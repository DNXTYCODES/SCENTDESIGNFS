import React from 'react';

const DishLoader = ({ size = 'md', message = 'Preparing your meal...' }) => {
  // Size configuration
  const sizeConfig = {
    sm: {
      container: 'w-16 h-16',
      spinner: 'w-14 h-14 border-2',
      icon: 'w-8 h-8',
      text: 'text-base'
    },
    md: {
      container: 'w-24 h-24',
      spinner: 'w-20 h-20 border-4',
      icon: 'w-12 h-12',
      text: 'text-lg'
    },
    lg: {
      container: 'w-32 h-32',
      spinner: 'w-28 h-28 border-4',
      icon: 'w-16 h-16',
      text: 'text-xl'
    }
  };
  
  const { container, spinner, icon, text } = sizeConfig[size] || sizeConfig.md;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className={`relative ${container} mb-6`}>
        {/* Spinner */}
        <div className={`absolute inset-0 flex items-center justify-center`}>
          <div 
            className={`${spinner} rounded-full border-[#6d28d9] border-t-transparent animate-spin`}
          ></div>
        </div>
        
        {/* Food Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className={`${icon} text-[#6d28d9] animate-pulse`} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M12 22s7-4 7-10V5l-7-3-7 3v7c0 6 7 10 7 10z" />
            <path d="M8 11h8" />
            <path d="M12 15v-4" />
          </svg>
        </div>
      </div>
      
      <p className={`prata-regular ${text} text-[#6d28d9] text-center`}>
        {message}
      </p>
    </div>
  );
};

export default DishLoader;




















// import React from 'react';

// const DishLoader = () => {
//   return (
//     <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
//       <div className="text-center">
//         <div className="relative w-24 h-24 mx-auto mb-6">
//           {/* Plate */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-20 h-20 rounded-full border-4 border-[#6d28d9] border-t-transparent animate-spin"></div>
//           </div>
          
//           {/* Food Icon */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <svg 
//               className="w-12 h-12 text-[#6d28d9] animate-pulse" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               stroke="currentColor" 
//               strokeWidth="2"
//             >
//               <path d="M12 22s7-4 7-10V5l-7-3-7 3v7c0 6 7 10 7 10z" />
//               <path d="M8 11h8" />
//               <path d="M12 15v-4" />
//             </svg>
//           </div>
//         </div>
        
//         <p className="prata-regular text-xl text-[#6d28d9] mt-2">
//           Loading Exquisite Scents...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DishLoader;