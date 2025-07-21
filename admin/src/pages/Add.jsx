import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  // Image states
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [category, setCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [inStock, setInStock] = useState(true);
  
  // Availability by day states
  const [availableDays, setAvailableDays] = useState(['everyday']);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Variations state
  const [variations, setVariations] = useState({
    base: { name: "Base", options: [] },
    side: { name: "Side", options: [] },
    sizes: [],
    wrap: { available: false, price: "" }
  });

  // Validate decimal input
  const validateDecimal = (value) => {
    if (value === "") return true;
    return /^\d*\.?\d*$/.test(value) && 
           (value.match(/\./g) || []).length <= 1;
  };

  // Handle day selection
  const handleDayChange = (day) => {
    if (day === 'everyday') {
      setAvailableDays(['everyday']);
      return;
    }
    
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
    } else {
      setAvailableDays([...availableDays.filter(d => d !== 'everyday'), day]);
    }
  };

  // Handle variation changes
  const handleVariationChange = (type, key, value) => {
    setVariations(prev => ({
      ...prev,
      [type]: { ...prev[type], [key]: value }
    }));
  };

  // Handle size changes
  const handleSizeChange = (index, field, value) => {
    setVariations(prev => {
      const newSizes = [...prev.sizes];
      newSizes[index] = { ...newSizes[index], [field]: value };
      return { ...prev, sizes: newSizes };
    });
  };

  // Add new size
  const addSize = () => {
    setVariations(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", price: "" }]
    }));
  };

  // Remove size
  const removeSize = (index) => {
    setVariations(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  // Handle options changes (for base/side)
  const handleOptionsChange = (type, value) => {
    const options = value.split(',').map(opt => opt.trim());
    setVariations(prev => ({
      ...prev,
      [type]: { ...prev[type], options }
    }));
  };

  // Format price on blur
  const formatPriceOnBlur = (value, setter) => {
    if (value === "") return;
    
    // Add trailing zero if ends with decimal
    if (value.endsWith('.')) {
      setter(value + '0');
    } 
    // Add leading zero if starts with decimal
    else if (value.startsWith('.')) {
      setter('0' + value);
    }
    // Format whole numbers consistently
    else {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        setter(num.toString());
      }
    }
  };

  // Convert price string to number safely
  const safePrice = (priceStr) => {
    if (!priceStr || priceStr.trim() === "") return 0;
    const num = parseFloat(priceStr);
    return isNaN(num) ? 0 : num;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Convert price strings to numbers safely
    const numericBasePrice = safePrice(basePrice);
    
    const numericVariations = {
      ...variations,
      sizes: variations.sizes.map(size => ({
        ...size,
        price: safePrice(size.price)
      })),
      wrap: {
        ...variations.wrap,
        price: variations.wrap.available ? safePrice(variations.wrap.price) : 0
      }
    };

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("basePrice", numericBasePrice.toString());
      formData.append("category", category);
      formData.append("bestseller", bestseller);
      formData.append("inStock", inStock);
      formData.append("variations", JSON.stringify(numericVariations));

      // Append each available day individually
      availableDays.forEach(day => {
        formData.append('availableDays', day);
      });

      // Append images
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName('');
        setDescription('');
        setBasePrice('');
        setCategory('');
        setBestseller(false);
        setInStock(true);
        setAvailableDays(['everyday']);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setVariations({
          base: { name: "Base", options: [] },
          side: { name: "Side", options: [] },
          sizes: [],
          wrap: { available: false, price: "" }
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[1, 2, 3, 4].map((num) => (
            <label key={num} htmlFor={`image${num}`}>
              <img
                className='w-20'
                src={!eval(`image${num}`) ? assets.upload_area : URL.createObjectURL(eval(`image${num}`))}
                alt=""
              />
              <input
                onChange={(e) => eval(`setImage${num}`)(e.target.files[0])}
                type="file"
                id={`image${num}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='w-full max-w-[500px] px-3 py-2 border rounded'
          type="text"
          placeholder='Type here'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full max-w-[500px] px-3 py-2 border rounded'
          placeholder='Write content here'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Base Price</p>
          <input
            onChange={(e) => {
              if (validateDecimal(e.target.value)) {
                setBasePrice(e.target.value);
              }
            }}
            onBlur={() => formatPriceOnBlur(basePrice, setBasePrice)}
            value={basePrice}
            className='w-full px-3 py-2 sm:w-[120px] border rounded'
            type="text"
            inputMode="decimal"
            placeholder='9.99'
          />
        </div>

        <div>
          <p className='mb-2'>Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            required
          >
               <option value="">Select category</option>
               <option value="Eau de Parfum">Eau de Parfum</option>
               <option value="Eau de Toilette">Eau de Toilette</option>
               <option value="Perfume Oil">Perfume Oil</option>
               <option value="Bespoke Fragrance">Bespoke Fragrance</option>
               <option value="Gift Sets">Gift Sets</option>
               <option value="Miniatures">Miniatures</option>
          </select>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Availability</p>
        <div className='flex flex-wrap gap-2'>
          <button
            type="button"
            onClick={() => setAvailableDays(['everyday'])}
            className={`px-3 py-1 text-sm rounded-full ${
              availableDays.includes('everyday') 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Everyday
          </button>
          {days.map(day => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayChange(day)}
              className={`px-3 py-1 text-sm rounded-full ${
                availableDays.includes(day) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className='flex gap-2 mt-2 items-center'>
        <input
          type="checkbox"
          id="inStock"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
          className="w-5 h-5"
        />
        <label htmlFor="inStock" className='cursor-pointer'>
          In Stock
        </label>
      </div>

      {/* Bestseller */}
      <div className='flex gap-2 mt-2 items-center'>
        <input
          type="checkbox"
          id='bestseller'
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className="w-5 h-5"
        />
        <label htmlFor="bestseller" className='cursor-pointer'>
          Add to bestseller
        </label>
      </div>

      {/* Variations Section */}
      <div className="w-full mt-6 border-t pt-4">
        {/* Sizes */}
        <div className="mb-4">
          <label className="block mb-2">Sizes</label>
          {variations.sizes.map((size, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={size.size}
                onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
                placeholder="Size name"
              />
              <input
                value={size.price}
                onChange={(e) => {
                  if (validateDecimal(e.target.value)) {
                    handleSizeChange(index, 'price', e.target.value);
                  }
                }}
                onBlur={() => {
                  formatPriceOnBlur(
                    size.price, 
                    (value) => handleSizeChange(index, 'price', value)
                  );
                }}
                className="w-32 px-3 py-2 border rounded"
                placeholder="Price"
                type="text"
                inputMode="decimal"
              />
              <button
                type="button"
                onClick={() => removeSize(index)}
                className="px-3 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSize}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Size
          </button>
        </div>

        {/* Wrap Option */}
        {/* <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="wrapAvailable"
              checked={variations.wrap.available}
              onChange={(e) => handleVariationChange('wrap', 'available', e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="wrapAvailable" className='cursor-pointer'>
              Offer Wrap Option
            </label>
          </div>
          {variations.wrap.available && (
            <div className="flex gap-2">
              <input
                value={variations.wrap.price}
                onChange={(e) => {
                  if (validateDecimal(e.target.value)) {
                    handleVariationChange('wrap', 'price', e.target.value);
                  }
                }}
                onBlur={() => {
                  formatPriceOnBlur(
                    variations.wrap.price, 
                    (value) => handleVariationChange('wrap', 'price', value)
                  );
                }}
                className="w-32 px-3 py-2 border rounded"
                placeholder="Wrap price"
                type="text"
                inputMode="decimal"
              />
            </div>
          )}
        </div> */}
      </div>

      <button
        type="submit"
        className='w-28 py-3 mt-4 bg-black text-white rounded'
      >
        ADD
      </button>
    </form>
  );
};

export default Add;

























// import React, { useState } from 'react';
// import { assets } from '../assets/assets';
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const Add = ({ token }) => {
//   // Image states
//   const [image1, setImage1] = useState(false);
//   const [image2, setImage2] = useState(false);
//   const [image3, setImage3] = useState(false);
//   const [image4, setImage4] = useState(false);

//   // Form states
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [basePrice, setBasePrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [bestseller, setBestseller] = useState(false);
//   const [inStock, setInStock] = useState(true);
  
//   // Availability by day states
//   const [availableDays, setAvailableDays] = useState(['everyday']);
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   // Variations state
//   const [variations, setVariations] = useState({
//     base: { name: "Base", options: [] },
//     side: { name: "Side", options: [] },
//     sizes: [],
//     wrap: { available: false, price: "" }
//   });

//   // Validate decimal input
//   const validateDecimal = (value) => {
//     if (value === "") return true;
//     return /^\d*\.?\d*$/.test(value);
//   };

//   // Handle day selection
//   const handleDayChange = (day) => {
//     if (day === 'everyday') {
//       setAvailableDays(['everyday']);
//       return;
//     }
    
//     if (availableDays.includes(day)) {
//       setAvailableDays(availableDays.filter(d => d !== day));
//     } else {
//       setAvailableDays([...availableDays.filter(d => d !== 'everyday'), day]);
//     }
//   };

//   // Handle variation changes
//   const handleVariationChange = (type, key, value) => {
//     setVariations(prev => ({
//       ...prev,
//       [type]: { ...prev[type], [key]: value }
//     }));
//   };

//   // Handle size changes
//   const handleSizeChange = (index, field, value) => {
//     setVariations(prev => {
//       const newSizes = [...prev.sizes];
//       newSizes[index] = { ...newSizes[index], [field]: value };
//       return { ...prev, sizes: newSizes };
//     });
//   };

//   // Add new size
//   const addSize = () => {
//     setVariations(prev => ({
//       ...prev,
//       sizes: [...prev.sizes, { size: "", price: "" }]
//     }));
//   };

//   // Remove size
//   const removeSize = (index) => {
//     setVariations(prev => ({
//       ...prev,
//       sizes: prev.sizes.filter((_, i) => i !== index)
//     }));
//   };

//   // Handle options changes (for base/side)
//   const handleOptionsChange = (type, value) => {
//     const options = value.split(',').map(opt => opt.trim());
//     setVariations(prev => ({
//       ...prev,
//       [type]: { ...prev[type], options }
//     }));
//   };

//   // Format price on blur
//   const formatPriceOnBlur = (value, setter) => {
//     if (value === "") return;
    
//     // Add trailing zero if ends with decimal
//     if (value.endsWith('.')) {
//       setter(value + '0');
//     } 
//     // Add leading zero if starts with decimal
//     else if (value.startsWith('.')) {
//       setter('0' + value);
//     }
//     // Format whole numbers consistently
//     else {
//       const num = parseFloat(value);
//       if (!isNaN(num)) {
//         setter(num.toString());
//       }
//     }
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     // Convert price strings to numbers
//     const numericBasePrice = basePrice ? parseFloat(basePrice) : 0;
    
//     const numericVariations = {
//       ...variations,
//       sizes: variations.sizes.map(size => ({
//         ...size,
//         price: size.price ? parseFloat(size.price) : 0
//       })),
//       wrap: {
//         ...variations.wrap,
//         price: variations.wrap.price ? parseFloat(variations.wrap.price) : 0
//       }
//     };

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("basePrice", numericBasePrice);
//       formData.append("category", category);
//       formData.append("bestseller", bestseller);
//       formData.append("inStock", inStock);
//       formData.append("variations", JSON.stringify(numericVariations));

//       // Append each available day individually
//       availableDays.forEach(day => {
//         formData.append('availableDays', day);
//       });

//       // Append images
//       image1 && formData.append("image1", image1);
//       image2 && formData.append("image2", image2);
//       image3 && formData.append("image3", image3);
//       image4 && formData.append("image4", image4);

//       const response = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         // Reset form
//         setName('');
//         setDescription('');
//         setBasePrice('');
//         setCategory('');
//         setBestseller(false);
//         setInStock(true);
//         setAvailableDays(['everyday']);
//         setImage1(false);
//         setImage2(false);
//         setImage3(false);
//         setImage4(false);
//         setVariations({
//           base: { name: "Base", options: [] },
//           side: { name: "Side", options: [] },
//           sizes: [],
//           wrap: { available: false, price: "" }
//         });
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//       <div>
//         <p className='mb-2'>Upload Image</p>
//         <div className='flex gap-2'>
//           {[1, 2, 3, 4].map((num) => (
//             <label key={num} htmlFor={`image${num}`}>
//               <img
//                 className='w-20'
//                 src={!eval(`image${num}`) ? assets.upload_area : URL.createObjectURL(eval(`image${num}`))}
//                 alt=""
//               />
//               <input
//                 onChange={(e) => eval(`setImage${num}`)(e.target.files[0])}
//                 type="file"
//                 id={`image${num}`}
//                 hidden
//               />
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product name</p>
//         <input
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           className='w-full max-w-[500px] px-3 py-2 border rounded'
//           type="text"
//           placeholder='Type here'
//           required
//         />
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product description</p>
//         <textarea
//           onChange={(e) => setDescription(e.target.value)}
//           value={description}
//           className='w-full max-w-[500px] px-3 py-2 border rounded'
//           placeholder='Write content here'
//           required
//         />
//       </div>

//       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
//         <div>
//           <p className='mb-2'>Base Price</p>
//           <input
//             onChange={(e) => {
//               if (validateDecimal(e.target.value)) {
//                 setBasePrice(e.target.value);
//               }
//             }}
//             onBlur={() => formatPriceOnBlur(basePrice, setBasePrice)}
//             value={basePrice}
//             className='w-full px-3 py-2 sm:w-[120px] border rounded'
//             type="text"
//             inputMode="decimal"
//             placeholder='9.99'
//           />
//         </div>

//         <div>
//           <p className='mb-2'>Product Category</p>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className='w-full px-3 py-2 border rounded'
//             required
//           >
//                <option value="">Select category</option>
//                <option value="Eau de Parfum">Eau de Parfum</option>
//                <option value="Eau de Toilette">Eau de Toilette</option>
//                <option value="Perfume Oil">Perfume Oil</option>
//                <option value="Bespoke Fragrance">Bespoke Fragrance</option>
//                <option value="Gift Sets">Gift Sets</option>
//                <option value="Miniatures">Miniatures</option>
//           </select>
//         </div>
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Availability</p>
//         <div className='flex flex-wrap gap-2'>
//           <button
//             type="button"
//             onClick={() => setAvailableDays(['everyday'])}
//             className={`px-3 py-1 text-sm rounded-full ${
//               availableDays.includes('everyday') 
//                 ? 'bg-green-500 text-white' 
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             Everyday
//           </button>
//           {days.map(day => (
//             <button
//               key={day}
//               type="button"
//               onClick={() => handleDayChange(day)}
//               className={`px-3 py-1 text-sm rounded-full ${
//                 availableDays.includes(day) 
//                   ? 'bg-green-500 text-white' 
//                   : 'bg-gray-200 text-gray-700'
//               }`}
//             >
//               {day.substring(0, 3)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Stock Status */}
//       <div className='flex gap-2 mt-2 items-center'>
//         <input
//           type="checkbox"
//           id="inStock"
//           checked={inStock}
//           onChange={(e) => setInStock(e.target.checked)}
//           className="w-5 h-5"
//         />
//         <label htmlFor="inStock" className='cursor-pointer'>
//           In Stock
//         </label>
//       </div>

//       {/* Bestseller */}
//       <div className='flex gap-2 mt-2 items-center'>
//         <input
//           type="checkbox"
//           id='bestseller'
//           checked={bestseller}
//           onChange={(e) => setBestseller(e.target.checked)}
//           className="w-5 h-5"
//         />
//         <label htmlFor="bestseller" className='cursor-pointer'>
//           Add to bestseller
//         </label>
//       </div>

//       {/* Variations Section */}
//       <div className="w-full mt-6 border-t pt-4">
//         {/* <h3 className="text-lg font-medium mb-4">Meal Variations</h3> */}
        
//         {/* Base Options */}
//         {/* <div className="mb-4">
//           <label className="block mb-2">Base Options (comma separated)</label>
//           <input
//             value={variations.base.options.join(', ')}
//             onChange={(e) => handleOptionsChange('base', e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border rounded"
//             placeholder="e.g. Jerk Chicken, BBQ Chicken"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Side Options (comma separated)</label>
//           <input
//             value={variations.side.options.join(', ')}
//             onChange={(e) => handleOptionsChange('side', e.target.value)}
//             className="w-full max-w-[500px] px-3 py-2 border rounded"
//             placeholder="e.g. Jollof Rice, Fried Plantain"
//           />
//         </div> */}

//         {/* Sizes */}
//         <div className="mb-4">
//           <label className="block mb-2">Sizes</label>
//           {variations.sizes.map((size, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 value={size.size}
//                 onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
//                 className="flex-1 px-3 py-2 border rounded"
//                 placeholder="Size name"
//               />
//               <input
//                 value={size.price}
//                 onChange={(e) => {
//                   if (validateDecimal(e.target.value)) {
//                     handleSizeChange(index, 'price', e.target.value);
//                   }
//                 }}
//                 onBlur={() => {
//                   formatPriceOnBlur(
//                     size.price, 
//                     (value) => handleSizeChange(index, 'price', value)
//                   );
//                 }}
//                 className="w-32 px-3 py-2 border rounded"
//                 placeholder="Price"
//                 type="text"
//                 inputMode="decimal"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeSize(index)}
//                 className="px-3 py-2 bg-red-500 text-white rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addSize}
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Add Size
//           </button>
//         </div>

//         {/* Wrap Option */}
//         <div className="mb-4">
//           <div className="flex items-center gap-2 mb-2">
//             <input
//               type="checkbox"
//               id="wrapAvailable"
//               checked={variations.wrap.available}
//               onChange={(e) => handleVariationChange('wrap', 'available', e.target.checked)}
//               className="w-5 h-5"
//             />
//             <label htmlFor="wrapAvailable" className='cursor-pointer'>
//               Offer Wrap Option
//             </label>
//           </div>
//           {variations.wrap.available && (
//             <div className="flex gap-2">
//               <input
//                 value={variations.wrap.price}
//                 onChange={(e) => {
//                   if (validateDecimal(e.target.value)) {
//                     handleVariationChange('wrap', 'price', e.target.value);
//                   }
//                 }}
//                 onBlur={() => {
//                   formatPriceOnBlur(
//                     variations.wrap.price, 
//                     (value) => handleVariationChange('wrap', 'price', value)
//                   );
//                 }}
//                 className="w-32 px-3 py-2 border rounded"
//                 placeholder="Wrap price"
//                 type="text"
//                 inputMode="decimal"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <button
//         type="submit"
//         className='w-28 py-3 mt-4 bg-black text-white rounded'
//       >
//         ADD
//       </button>
//     </form>
//   );
// };

// export default Add;

























// import React, { useState } from 'react';
// import { assets } from '../assets/assets';
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const Add = ({ token }) => {
//   // Image states
//   const [image1, setImage1] = useState(false);
//   const [image2, setImage2] = useState(false);
//   const [image3, setImage3] = useState(false);
//   const [image4, setImage4] = useState(false);

//   // Form states
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [bestseller, setBestseller] = useState(false);
//   const [size, setSize] = useState("");
//   const [fragranceNotes, setFragranceNotes] = useState({
//     top: "",
//     heart: "",
//     base: ""
//   });
//   const [culturalOrigin, setCulturalOrigin] = useState("");

//   // Handle note change
//   const handleNoteChange = (type, value) => {
//     setFragranceNotes(prev => ({
//       ...prev,
//       [type]: value
//     }));
//   };

//   // Submit handler
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("bestseller", bestseller);
//       formData.append("size", size);
//       formData.append("culturalOrigin", culturalOrigin);
      
//       // Append fragrance notes
//       formData.append("topNotes", fragranceNotes.top);
//       formData.append("heartNotes", fragranceNotes.heart);
//       formData.append("baseNotes", fragranceNotes.base);

//       // Append images
//       image1 && formData.append("image1", image1);
//       image2 && formData.append("image2", image2);
//       image3 && formData.append("image3", image3);
//       image4 && formData.append("image4", image4);

//       const response = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         // Reset form
//         setName('');
//         setDescription('');
//         setPrice('');
//         setCategory('');
//         setSize('');
//         setCulturalOrigin('');
//         setBestseller(false);
//         setFragranceNotes({ top: "", heart: "", base: "" });
//         setImage1(false);
//         setImage2(false);
//         setImage3(false);
//         setImage4(false);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4 p-6 bg-purple-50 rounded-xl shadow-lg'>
//       <h2 className='prata-regular text-2xl text-purple-900 mb-4'>Add New Fragrance</h2>
      
//       <div className="w-full">
//         <p className='mb-2 font-medium'>Upload Images (Up to 4)</p>
//         <div className='flex flex-wrap gap-4'>
//           {[1, 2, 3, 4].map((num) => (
//             <label key={num} htmlFor={`image${num}`} className="cursor-pointer">
//               <div className="w-24 h-24 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center">
//                 {!eval(`image${num}`) ? (
//                   <img
//                     className='w-10 opacity-50'
//                     src={assets.upload_area}
//                     alt="Upload"
//                   />
//                 ) : (
//                   <img
//                     className='w-full h-full object-cover rounded-lg'
//                     src={URL.createObjectURL(eval(`image${num}`))}
//                     alt={`Preview ${num}`}
//                   />
//                 )}
//               </div>
//               <input
//                 onChange={(e) => eval(`setImage${num}`)(e.target.files[0])}
//                 type="file"
//                 id={`image${num}`}
//                 hidden
//               />
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
//         <div>
//           <label className='block mb-2 font-medium'>Fragrance Name</label>
//           <input
//             onChange={(e) => setName(e.target.value)}
//             value={name}
//             className='w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none'
//             type="text"
//             placeholder='e.g., Mon Parfum'
//             required
//           />
//         </div>

//         <div>
//           <label className='block mb-2 font-medium'>Price (₦)</label>
//           <input
//             onChange={(e) => setPrice(e.target.value)}
//             value={price}
//             className='w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none'
//             type="number"
//             placeholder='e.g., 15000'
//             min="0"
//             required
//           />
//         </div>
//       </div>

//       <div className='w-full'>
//         <label className='block mb-2 font-medium'>Description</label>
//         <textarea
//           onChange={(e) => setDescription(e.target.value)}
//           value={description}
//           className='w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none min-h-[100px]'
//           placeholder='Add Size and every other important details to description'
//           required
//         />
//       </div>

//       <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6'>
//         <div>
//           <label className='block mb-2 font-medium'>Category</label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className='w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none'
//             required
//           >
//             <option value="">Select category</option>
//             <option value="Eau de Parfum">Eau de Parfum</option>
//             <option value="Eau de Toilette">Eau de Toilette</option>
//             <option value="Perfume Oil">Perfume Oil</option>
//             <option value="Bespoke Fragrance">Bespoke Fragrance</option>
//             <option value="Gift Sets">Gift Sets</option>
//             <option value="Miniatures">Miniatures</option>
//           </select>
//         </div>

//         <div>
//           <label className='block mb-2 font-medium'>Size</label>
//           <input
//             onChange={(e) => setSize(e.target.value)}
//             value={size}
//             className='w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none'
//             type="text"
//             placeholder='e.g., 100ml'
//             required
//           />
//         </div>
// {/* 
//         <div>
//           <label className='block mb-2 font-medium'>Cultural Origin</label>
//           <select
//             value={culturalOrigin}
//             onChange={(e) => setCulturalOrigin(e.target.value)}
//             className='w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none'
//             required
//           >
//             <option value="">Select origin</option>
//             <option value="Yoruba">Yoruba</option>
//             <option value="Igbo">Igbo</option>
//             <option value="Hausa">Hausa</option>
//             <option value="Pan-Nigerian">Pan-Nigerian</option>
//             <option value="African Fusion">African Fusion</option>
//           </select>
//         </div> */}
//       </div>

//       {/* <div className='w-full'>
//         <label className='block mb-2 font-medium'>Fragrance Notes</label>
//         <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//           <div>
//             <p className='mb-1 text-sm text-purple-700'>Top Notes</p>
//             <input
//               onChange={(e) => handleNoteChange('top', e.target.value)}
//               value={fragranceNotes.top}
//               className='w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none'
//               type="text"
//               placeholder='e.g., Citrus, Bergamot'
//             />
//           </div>
//           <div>
//             <p className='mb-1 text-sm text-purple-700'>Heart Notes</p>
//             <input
//               onChange={(e) => handleNoteChange('heart', e.target.value)}
//               value={fragranceNotes.heart}
//               className='w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none'
//               type="text"
//               placeholder='e.g., Floral, Spices'
//             />
//           </div>
//           <div>
//             <p className='mb-1 text-sm text-purple-700'>Base Notes</p>
//             <input
//               onChange={(e) => handleNoteChange('base', e.target.value)}
//               value={fragranceNotes.base}
//               className='w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none'
//               type="text"
//               placeholder='e.g., Woody, Musk'
//             />
//           </div>
//         </div>
//       </div> */}

//       <div className='flex items-center gap-3 mt-4'>
//         <input
//           onChange={() => setBestseller(prev => !prev)}
//           checked={bestseller}
//           type="checkbox"
//           id='bestseller'
//           className='w-5 h-5 accent-purple-600'
//         />
//         <label className='font-medium cursor-pointer' htmlFor="bestseller">
//           Mark as Bestseller
//         </label>
//       </div>

//       <button
//         type="submit"
//         className='mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors'
//       >
//         ADD FRAGRANCE
//       </button>
//     </form>
//   );
// };

// export default Add;



























// import React, { useState } from 'react';
// import { assets } from '../assets/assets';
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const Add = ({ token }) => {
//   // Image states
//   const [image1, setImage1] = useState(false);
//   const [image2, setImage2] = useState(false);
//   const [image3, setImage3] = useState(false);
//   const [image4, setImage4] = useState(false);

//   // Form states
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [bestseller, setBestseller] = useState(false);
  
//   // Availability by day states
//   const [availableDays, setAvailableDays] = useState(['everyday']);
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   // Handle day selection
//   const handleDayChange = (day) => {
//     if (day === 'everyday') {
//       setAvailableDays(['everyday']);
//       return;
//     }
    
//     if (availableDays.includes(day)) {
//       setAvailableDays(availableDays.filter(d => d !== day));
//     } else {
//       setAvailableDays([...availableDays.filter(d => d !== 'everyday'), day]);
//     }
//   };

//   // old Submit handler
//   // const onSubmitHandler = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("name", name);
//   //     formData.append("description", description);
//   //     formData.append("price", price);
//   //     formData.append("category", category);
//   //     formData.append("bestseller", bestseller);
//   //     formData.append("availableDays", JSON.stringify(availableDays));

//   //     // Append images if they exist
//   //     image1 && formData.append("image1", image1);
//   //     image2 && formData.append("image2", image2);
//   //     image3 && formData.append("image3", image3);
//   //     image4 && formData.append("image4", image4);

//   //     const response = await axios.post(
//   //       backendUrl + "/api/product/add",
//   //       formData,
//   //       { headers: { token } }
//   //     );

//   //     if (response.data.success) {
//   //       toast.success(response.data.message);
//   //       // Reset form
//   //       setName('');
//   //       setDescription('');
//   //       setPrice('');
//   //       setCategory('');
//   //       setBestseller(false);
//   //       setAvailableDays(['everyday']);
//   //       setImage1(false);
//   //       setImage2(false);
//   //       setImage3(false);
//   //       setImage4(false);
//   //     } else {
//   //       toast.error(response.data.message);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error(error.message);
//   //   }
//   // };


//   // new submit handler

//   const onSubmitHandler = async (e) => {
//   e.preventDefault();

//   try {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("category", category);
//     formData.append("bestseller", bestseller);

//     // Append each available day individually
//     availableDays.forEach(day => {
//       formData.append('availableDays', day);
//     });

//     // Append images
//     image1 && formData.append("image1", image1);
//     image2 && formData.append("image2", image2);
//     image3 && formData.append("image3", image3);
//     image4 && formData.append("image4", image4);

//     const response = await axios.post(
//       backendUrl + "/api/product/add",
//       formData,
//       { headers: { token } }
//     );

//     if (response.data.success) {
//       toast.success(response.data.message);
//       // Reset form
//       setName('');
//       setDescription('');
//       setPrice('');
//       setCategory('');
//       setBestseller(false);
//       setAvailableDays(['everyday']);
//       setImage1(false);
//       setImage2(false);
//       setImage3(false);
//       setImage4(false);
//     } else {
//       toast.error(response.data.message);
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error(error.message);
//   }
// };



//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//       <div>
//         <p className='mb-2'>Upload Image</p>
//         <div className='flex gap-2'>
//           {[1, 2, 3, 4].map((num) => (
//             <label key={num} htmlFor={`image${num}`}>
//               <img
//                 className='w-20'
//                 src={!eval(`image${num}`) ? assets.upload_area : URL.createObjectURL(eval(`image${num}`))}
//                 alt=""
//               />
//               <input
//                 onChange={(e) => eval(`setImage${num}`)(e.target.files[0])}
//                 type="file"
//                 id={`image${num}`}
//                 hidden
//               />
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product name</p>
//         <input
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           className='w-full max-w-[500px] px-3 py-2 border rounded'
//           type="text"
//           placeholder='Type here'
//           required
//         />
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Product description</p>
//         <textarea
//           onChange={(e) => setDescription(e.target.value)}
//           value={description}
//           className='w-full max-w-[500px] px-3 py-2 border rounded'
//           placeholder='Write content here'
//           required
//         />
//       </div>

//       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
//         <div>
//           <p className='mb-2'>Product Price</p>
//           <input
//             onChange={(e) => setPrice(e.target.value)}
//             value={price}
//             className='w-full px-3 py-2 sm:w-[120px] border rounded'
//             type="Number"
//             placeholder='25'
//             min="0"
//           />
//         </div>

//         <div>
//           <p className='mb-2'>Product Category</p>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className='w-full px-3 py-2 border rounded'
//             required
//           >
//             <option value="">Select category</option>
//             <option value="Main Dishes">Main Dishes</option>
//             <option value="Soups">Soups & Stews</option>
//             <option value="Appetizers">Appetizers</option>
//             <option value="Desserts">Desserts</option>
//             <option value="Drinks">Beverages</option>
//           </select>
//         </div>
//       </div>

//       <div className='w-full'>
//         <p className='mb-2'>Availability</p>
//         <div className='flex flex-wrap gap-2'>
//           <button
//             type="button"
//             onClick={() => setAvailableDays(['everyday'])}
//             className={`px-3 py-1 text-sm rounded-full ${
//               availableDays.includes('everyday') 
//                 ? 'bg-green-500 text-white' 
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             Everyday
//           </button>
//           {days.map(day => (
//             <button
//               key={day}
//               type="button"
//               onClick={() => handleDayChange(day)}
//               className={`px-3 py-1 text-sm rounded-full ${
//                 availableDays.includes(day) 
//                   ? 'bg-green-500 text-white' 
//                   : 'bg-gray-200 text-gray-700'
//               }`}
//             >
//               {day.substring(0, 3)}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className='flex gap-2 mt-2'>
//         <input
//           onChange={() => setBestseller(prev => !prev)}
//           checked={bestseller}
//           type="checkbox"
//           id='bestseller'
//         />
//         <label className='cursor-pointer' htmlFor="bestseller">
//           Add to bestseller
//         </label>
//       </div>

//       <button
//         type="submit"
//         className='w-28 py-3 mt-4 bg-black text-white rounded'
//       >
//         ADD
//       </button>
//     </form>
//   );
// };

// export default Add;






















// import React, { useState } from 'react'
// import {assets} from '../assets/assets'
// import axios from 'axios'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'

// const Add = ({token}) => {

//   const [image1,setImage1] = useState(false)
//   const [image2,setImage2] = useState(false)
//   const [image3,setImage3] = useState(false)
//   const [image4,setImage4] = useState(false)

//    const [name, setName] = useState("");
//    const [description, setDescription] = useState("");
//    const [price, setPrice] = useState("");
//    const [category, setCategory] = useState("Men");
//   //  const [subCategory, setSubCategory] = useState("Topwear");
//    const [bestseller, setBestseller] = useState(false);
//   //  const [sizes, setSizes] = useState([]);

//    const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
      
//       const formData = new FormData()

//       formData.append("name",name)
//       formData.append("description",description)
//       formData.append("price",price)
//       formData.append("category",category)
//       // formData.append("subCategory",subCategory)
//       formData.append("bestseller",bestseller)
//       // formData.append("sizes",JSON.stringify(sizes))

//       image1 && formData.append("image1",image1)
//       image2 && formData.append("image2",image2)
//       image3 && formData.append("image3",image3)
//       image4 && formData.append("image4",image4)

//       const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

//       if (response.data.success) {
//         toast.success(response.data.message)
//         setName('')
//         setDescription('')
//         setImage1(false)
//         setImage2(false)
//         setImage3(false)
//         setImage4(false)
//         setPrice('')
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//    }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//         <div>
//           <p className='mb-2'>Upload Image</p>

//           <div className='flex gap-2'>
//             <label htmlFor="image1">
//               <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
//               <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
//             </label>
//             <label htmlFor="image2">
//               <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
//               <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
//             </label>
//             <label htmlFor="image3">
//               <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
//               <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
//             </label>
//             <label htmlFor="image4">
//               <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
//               <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
//             </label>
//           </div>
//         </div>

//         <div className='w-full'>
//           <p className='mb-2'>Product name</p>
//           <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
//         </div>

//         <div className='w-full'>
//           <p className='mb-2'>Product description</p>
//           <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required/>
//         </div>

//         <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

//             {/* <div>
//               <p className='mb-2'>Product category</p>
//               <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
//                   <option value="Men">Men</option>
//                   <option value="Women">Women</option>
//               </select>
//             </div> */}
// {/* 
//             <div>
//               <p className='mb-2'>Sub category</p>
//               <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
//                   <option value="Topwear">Topwear</option>
//                   <option value="Bottomwear">Bottomwear</option>
//                   <option value="Winterwear">Winterwear</option>
//               </select>
//             </div> */}

//             <div>
//               <p className='mb-2'>Product Price</p>
//               <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
//             </div>

//         </div>
// {/* 
//         <div>
//           <p className='mb-2'>Product Sizes</p>
//           <div className='flex gap-3'>
//             <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S") : [...prev,"S"])}>
//               <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>S</p>
//             </div>
            
//             <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter( item => item !== "M") : [...prev,"M"])}>
//               <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>M</p>
//             </div>

//             <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter( item => item !== "L") : [...prev,"L"])}>
//               <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>L</p>
//             </div>

//             <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL") : [...prev,"XL"])}>
//               <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XL</p>
//             </div>

//             <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL") : [...prev,"XXL"])}>
//               <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XXL</p>
//             </div>
//           </div>
//         </div> */}

//         <div className='flex gap-2 mt-2'>
//           <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
//           <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
//         </div>

//         <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

//     </form>
//   )
// }

// export default Add