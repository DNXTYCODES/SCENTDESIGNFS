import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      onClick={() => window.scrollTo(0,0)} 
      className='cursor-pointer group' 
      to={`/product/${id}`}
    >
      <div className='overflow-hidden rounded-xl border border-purple-200 relative transition-all duration-300 group-hover:shadow-lg group-hover:border-purple-500'>
        <img 
          className='w-full aspect-square object-cover group-hover:scale-105 transition-all duration-300' 
          src={image[0]} 
          alt={name} 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="mt-4">
        <h3 className='prata-regular text-xl text-purple-900 group-hover:text-purple-600 transition-colors truncate'>
          {name}
        </h3>
        <p className='text-purple-700 font-medium mt-2 flex items-center'>
          <span className="text-lg">{currency}{price}</span>
          <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            In Stock
          </span>
        </p>
      </div>
      <div className="mt-3 flex items-center">
        <div className="w-8 h-[2px] bg-purple-600 mr-2"></div>
        <span className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors">
          Add to Cart
        </span>
      </div>
    </Link>
  )
}

export default ProductItem;



















// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom'

// const ProductItem = ({ id, image, name, price }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <Link 
//       onClick={() => window.scrollTo(0,0)} 
//       className='cursor-pointer group' 
//       to={`/product/${id}`}
//     >
//       <div className='overflow-hidden rounded-xl border border-[#008753]/20 relative'>
//         <img 
//           className='w-full aspect-square object-cover group-hover:scale-105 transition-all duration-300' 
//           src={image[0]} 
//           alt={name} 
//           loading="lazy"
//         />
//       </div>
//       <div className="mt-3">
//         <h3 className='prata-regular text-lg text-[#008753] group-hover:text-amber-600 transition-colors truncate'>
//           {name}
//         </h3>
//         <p className='text-[#008753] font-medium mt-1'>
//           {currency}{price}
//         </p>
//       </div>
//       <div className="mt-2 flex items-center">
//         <div className="w-6 h-[2px] bg-[#008753] mr-2"></div>
//         <span className="text-xs text-gray-600">View Details</span>
//       </div>
//     </Link>
//   )
// }

// export default ProductItem;

































// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom'

// const ProductItem = ({ id, image, name, price }) => {
//   const { currency } = useContext(ShopContext);

//   return (
//     <Link 
//       onClick={() => window.scrollTo(0,0)} 
//       className='cursor-pointer group' 
//       to={`/product/${id}`}
//     >
//       <div className='overflow-hidden rounded-xl border border-[#008753]/20'>
//         <img 
//           className='w-full aspect-square object-cover group-hover:scale-105 transition-all duration-300' 
//           src={image[0]} 
//           alt={name} 
//         />
//       </div>
//       <div className="mt-3">
//         <h3 className='prata-regular text-lg text-[#008753] group-hover:text-amber-600 transition-colors'>
//           {name}
//         </h3>
//         <p className='text-[#008753] font-medium mt-1'>
//           {currency}{price}
//         </p>
//       </div>
//       <div className="mt-2 flex items-center">
//         <div className="w-6 h-[2px] bg-[#008753] mr-2"></div>
//         <span className="text-xs text-gray-600">Add to cart</span>
//       </div>
//     </Link>
//   )
// }

// export default ProductItem




















// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import {Link} from 'react-router-dom'

// const ProductItem = ({id,image,name,price}) => {
    
//     const {currency} = useContext(ShopContext);

//   return (
//   <Link onClick={()=>scrollTo(0,0)} className='text-goldenrod cursor-pointer' to={`/product/${id}`}>
//       <div className=' overflow-hidden'>
//         <img className=' rounded-xl hover:scale-110 transition ease-in-out aspect-square object-cover' src={image[0]} alt="" />
//       </div>
//       <p className='pt-3 pb-1 text-sm text-white prata-regular bg-golden-brown bg-clip-text text-transparent bg-to-b'>{name}</p>
//       <p className=' text-sm font-medium bg-golden-brown bg-clip-text text-transparent bg-to-b'>{currency}{price}</p>
//     </Link>
//   )
// }

// export default ProductItem
