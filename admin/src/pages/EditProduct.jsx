import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [availableDays, setAvailableDays] = useState(['everyday']);
  
  // Days of week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(backendUrl + '/api/product/single', { productId: id });
        if (response.data.success) {
          const product = response.data.product;
          setProduct(product);
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setCategory(product.category);
          setBestseller(product.bestseller);
          setAvailableDays(product.availableDays || ['everyday']);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update",
        {
          id,
          name,
          description,
          price,
          category,
          bestseller,
          availableDays
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/edit-products');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#008753]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Product not found</p>
        <button 
          onClick={() => navigate('/edit-products')}
          className="mt-4 px-4 py-2 bg-[#008753] text-white rounded-lg hover:bg-[#006641] transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/edit-products')}
          className="flex items-center text-[#008753] hover:text-[#006641]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Products
        </button>
        <h2 className="text-2xl font-bold ml-4 text-[#008753]">Edit Product</h2>
      </div>
      
      <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-lg shadow-md">
        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium">Product name</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent"
              type="text" 
              placeholder="Product name"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Price</label>
            <input 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent"
              type="number" 
              placeholder="Price"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent"
              required
            >
              <option value="">Select category</option>
              <option value="Main Dishes">Main Dishes</option>
              <option value="Soups">Soups & Stews</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Desserts">Desserts</option>
              <option value="Drinks">Beverages</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Availability</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setAvailableDays(['everyday'])}
                className={`px-3 py-1 text-sm rounded-full ${
                  availableDays.includes('everyday') 
                    ? 'bg-[#008753] text-white' 
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
                      ? 'bg-[#008753] text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {day.substring(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent min-h-[120px]"
            placeholder="Product description"
            required
          />
        </div>

        {/* Bestseller */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
              className="w-5 h-5 text-[#008753] rounded focus:ring-[#008753]"
            />
            <span className="font-medium">Mark as bestseller</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/edit-products')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#008753] text-white rounded-lg hover:bg-[#006641] transition-colors"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;