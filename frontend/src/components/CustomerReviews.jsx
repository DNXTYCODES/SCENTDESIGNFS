import React, { useState, useEffect, useContext } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import ReviewModal from "./ReviewModal";
import { assets } from "../assets/assets";

const CustomerReviews = () => {
  const { 
    token,
    getRestaurantReviews,
    getUserRestaurantReview,
    addRestaurantReview
  } = useContext(ShopContext);
  
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userReview, setUserReview] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    averageRating: 4.9,
    recommendationRate: 98,
    happyCustomers: 2000,
    avgDeliveryTime: 60
  });

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        // Fetch all restaurant reviews
        const reviewsResponse = await getRestaurantReviews();
        if (reviewsResponse.success) {
          setReviews(reviewsResponse.reviews);
          
          // Calculate stats
          if (reviewsResponse.reviews.length > 0) {
            const totalRating = reviewsResponse.reviews.reduce(
              (sum, review) => sum + review.rating, 0
            );
            const averageRating = totalRating / reviewsResponse.reviews.length;
            const recommendationRate = Math.round(
              (reviewsResponse.reviews.filter(r => r.rating >= 4).length / 
               reviewsResponse.reviews.length) * 100
            );
            
            setStats({
              averageRating: averageRating.toFixed(1),
              recommendationRate,
              happyCustomers: 2000 + reviewsResponse.reviews.length,
              avgDeliveryTime: 15
            });
          }
        }
        
        // Fetch user's review if logged in
        if (token) {
          const userReviewResponse = await getUserRestaurantReview();
          if (userReviewResponse.success) {
            setUserReview(userReviewResponse.review);
          }
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, [token, getRestaurantReviews, getUserRestaurantReview]);

  const handleAddReview = async (rating, comment) => {
    const response = await addRestaurantReview(rating, comment);
    if (response.success) {
      // Refresh reviews
      const reviewsResponse = await getRestaurantReviews();
      if (reviewsResponse.success) {
        setReviews(reviewsResponse.reviews);
      }
      
      // Update user review
      const userReviewResponse = await getUserRestaurantReview();
      if (userReviewResponse.success) {
        setUserReview(userReviewResponse.review);
      }
    }
  };

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span 
          key={i} 
          className={`text-xl ${i < rating ? 'text-amber-500' : 'text-gray-300'}`}
        >
          ★
        </span>
      ));
  };

  if (isLoading) {
    return (
      <section className="bg-gradient-to-r from-[#6d28d9]/10 to-amber-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center py-20">
          Loading reviews...
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-[#6d28d9]/10 to-amber-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-[#6d28d9]"></div>
            <p className="font-medium text-sm text-[#6d28d9]">
              TESTIMONIALS
            </p>
            <div className="w-8 h-[2px] bg-[#6d28d9]"></div>
          </div>
          
          <h2 className="prata-regular text-4xl text-[#6d28d9] mb-4">
            What Our <span className="text-amber-600">Customers</span> Say
          </h2>
          
          <p className="text-gray-700 max-w-xl mx-auto">
            Discover why food lovers keep coming back for our authentic African/Caribbean flavors
          </p>
        </div>

        {/* Add Review Button */}
        {token && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-[#6d28d9] hover:bg-[#006e42] text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              {userReview ? "Update Your Review" : "Leave a Review"}
            </button>
          </div>
        )}

        {/* Reviews Carousel */}
        {reviews.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            {/* Review Card */}
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Customer Avatar */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" /> */}
                  <img src={assets.greenprofile} className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
                </div>
                
                {/* Review Content */}
                <div className="text-center md:text-left">
                  <div className="mb-4">
                    {renderStars(reviews[currentIndex].rating)}
                  </div>
                  
                  <p className="text-gray-700 text-lg mb-6 italic">
                    "{reviews[currentIndex].comment}"
                  </p>
                  
                  <div>
                    <h3 className="prata-regular text-xl text-[#6d28d9]">
                      {reviews[currentIndex].user?.name || "Customer"}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(reviews[currentIndex].date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-md hover:bg-[#6d28d9] hover:text-white transition-colors"
              aria-label="Previous review"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            
            <button 
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-md hover:bg-[#6d28d9] hover:text-white transition-colors"
              aria-label="Next review"
            >
              <FiChevronRight className="text-xl" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-[#6d28d9]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl shadow-lg">
            <p className="text-gray-700 text-lg">
              No reviews yet. Be the first to review!
            </p>
            {token && (
              <button
                onClick={() => setShowReviewModal(true)}
                className="mt-4 bg-[#6d28d9] hover:bg-[#006e42] text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Leave a Review
              </button>
            )}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <p className="prata-regular text-3xl text-[#6d28d9]">{stats.averageRating}/5</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <p className="prata-regular text-3xl text-[#6d28d9]">{stats.recommendationRate}%</p>
            <p className="text-gray-600">Would Recommend</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <p className="prata-regular text-3xl text-[#6d28d9]">{stats.happyCustomers}+</p>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <p className="prata-regular text-3xl text-[#6d28d9]">{stats.avgDeliveryTime} min</p>
            <p className="text-gray-600">Avg. Delivery Time</p>
          </div>
        </div>
      </div>
      
      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleAddReview}
        hasReviewed={!!userReview}
      />
    </section>
  );
};

export default CustomerReviews;
