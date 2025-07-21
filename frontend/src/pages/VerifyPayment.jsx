import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const VerifyPayment = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('pending');
    const [message, setMessage] = useState('Verifying payment...');
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const orderId = params.get('orderId');
                const gateway = params.get('gateway');
                
                // Paystack parameters
                const reference = params.get('reference') || params.get('trxref');
                
                // Flutterwave parameters
                const transactionId = params.get('transaction_id');
                const status = params.get('status');
                
                console.log('Verification parameters:', {
                    orderId,
                    gateway,
                    reference,
                    transactionId,
                    status
                });

                if (!orderId || !gateway) {
                    throw new Error('Invalid verification parameters');
                }

                const headers = token ? { headers: { token } } : {};
                let verificationEndpoint = '';
                let payload = {};

                if (gateway === 'paystack') {
                    if (!reference) throw new Error('Missing reference for Paystack verification');
                    
                    verificationEndpoint = '/api/order/verifyPaystack';
                    payload = { reference, orderId };
                } else if (gateway === 'flutterwave') {
                    if (!transactionId) throw new Error('Missing transaction ID for Flutterwave');
                    
                    verificationEndpoint = '/api/order/verifyFlutterwave';
                    payload = { transaction_id: transactionId, orderId };
                } else {
                    throw new Error('Invalid payment gateway');
                }

                // Verify payment with backend
                const response = await axios.post(
                    backendUrl + verificationEndpoint,
                    payload,
                    headers
                );

                if (response.data.success) {
                    setVerificationStatus('success');
                    setMessage('Payment verified successfully!');
                    setOrderDetails(response.data.order);
                    
                    // Redirect to orders page after 5 seconds
                    setTimeout(() => {
                        navigate('/orders');
                    }, 5000);
                } else {
                    setVerificationStatus('failed');
                    setMessage(response.data.message || 'Payment verification failed');
                }
            } catch (error) {
                console.error('Verification error:', error);
                setVerificationStatus('failed');
                
                const errorMessage = error.response?.data?.message || 
                                    error.message || 
                                    'An error occurred during verification';
                setMessage(errorMessage);
                
                // For Paystack errors, show specific guidance
                if (error.message.includes('reference')) {
                    setMessage('Payment reference missing. Please contact support with your order details.');
                }
            }
        };

        verifyPayment();
    }, [location.search, backendUrl, token, navigate]);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleViewOrders = () => {
        navigate('/orders');
    };

    const handleContinueShopping = () => {
        navigate('/');
    };

    const handleTryAgain = () => {
        navigate('/place-order');
    };

    const handleContactSupport = () => {
        navigate('/contact');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full">
                {verificationStatus === 'pending' && (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto mb-6"></div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Payment</h2>
                        <p className="text-gray-600">{message}</p>
                    </div>
                )}

                {verificationStatus === 'success' && (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-6">Your order has been confirmed and will be processed soon.</p>
                        
                        {orderDetails && (
                            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                                <h3 className="font-medium text-gray-800 mb-3">Order Details</h3>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Order ID:</span>
                                    <span className="font-medium">{orderDetails._id}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Amount:</span>
                                    <span className="font-medium">€{orderDetails.amount?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date:</span>
                                    <span className="font-medium">{formatDate(orderDetails.date)}</span>
                                </div>
                            </div>
                        )}
                        
                        <div className="text-sm text-gray-500 mb-6">
                            You'll be redirected to your orders page in a few seconds...
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleViewOrders}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                            >
                                View My Orders
                            </button>
                            <button
                                onClick={handleContinueShopping}
                                className="px-6 py-2 text-gray-700 hover:text-gray-900 transition font-medium"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}

                {verificationStatus === 'failed' && (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
                            <h3 className="font-medium text-yellow-800 mb-2">What to do next?</h3>
                            <ul className="list-disc pl-5 text-yellow-700 space-y-1">
                                <li>Check your payment method details</li>
                                <li>Ensure you have sufficient funds</li>
                                <li>Try again or use a different payment method</li>
                                <li>Contact support if the problem persists</li>
                            </ul>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleTryAgain}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                            >
                                Try Payment Again
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleContinueShopping}
                                    className="flex-1 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={handleContactSupport}
                                    className="flex-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                                >
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyPayment;

