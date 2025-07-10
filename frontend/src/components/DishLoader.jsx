import React from 'react';

const DishLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Plate */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-[#008753] border-t-transparent animate-spin"></div>
          </div>
          
          {/* Food Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-[#008753] animate-pulse" 
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
        
        <p className="prata-regular text-xl text-[#008753] mt-2">
          Preparing your meal...
        </p>
      </div>
    </div>
  );
};

export default DishLoader;