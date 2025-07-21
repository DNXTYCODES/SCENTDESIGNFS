import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { default as Paystack } from '@paystack/paystack-sdk';
import Flutterwave from 'flutterwave-node-v3';
import axios from 'axios';

// Initialize payment gateways
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);
// const flw = new Flutterwave(
//   process.env.FLW_PUBLIC_KEY,
//   process.env.FLW_SECRET_KEY
// );

// Helper function to create order
const createOrder = async (userId, items, amount, address, paymentMethod, currency = 'EUR') => {
  const orderData = {
    userId,
    items,
    address,
    amount,
    currency,
    paymentMethod,
    payment: paymentMethod === 'COD' ? false : undefined,
    date: Date.now(),
    status: 'Order Received'
  };
  
  const newOrder = new orderModel(orderData);
  await newOrder.save();
  return newOrder;
};

// Helper function to get NGN exchange rate
const getExchangeRate = async () => {
  try {
    return 1600; // Fallback rate: 1 EUR = 1600 NGN
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return 1600; // Default fallback for Nigerian Naira
  }
};

// Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = await createOrder(
      userId,
      items,
      amount,
      address,
      "COD"
    );

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Paystack Payment - UPDATED FOR NIGERIAN ACCOUNTS
const placeOrderPaystack = async (req, res) => {
  let newOrder;
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Invalid order amount');
    }

    // Create order first
    newOrder = await createOrder(
      userId,
      items,
      amount,
      address,
      "Paystack"
    );

    // Convert EUR to NGN for Nigerian Paystack accounts
    const exchangeRate = await getExchangeRate();
    const nairaAmount = Math.round(amount * exchangeRate); // Convert to Naira
    const koboAmount = nairaAmount * 100; // Convert to kobo (1 NGN = 100 kobo)
    
    // Create payment payload
    const payload = {
      email: address.email,
      amount: koboAmount,
      currency: 'NGN', // Nigerian Naira
      callback_url: `${origin}/verify?orderId=${newOrder._id}&gateway=paystack`,
      metadata: {
        order_id: newOrder._id.toString(),
        user_id: userId
      }
    };

    // Initialize transaction
    const response = await paystack.transaction.initialize(payload);
    
    // Check if response is valid
    if (!response.status || !response.data?.authorization_url) {
      const errorMsg = response.message || 'Paystack service error';
      console.error('Paystack API error:', {
        status: response.status,
        message: response.message,
        data: response.data
      });
      throw new Error(errorMsg);
    }

    res.json({ 
      success: true, 
      authorization_url: response.data.authorization_url 
    });

  } catch (error) {
    console.error('Paystack order error:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    // Attempt to delete the order if creation failed
    if (newOrder) {
      try {
        await orderModel.findByIdAndDelete(newOrder._id);
      } catch (deleteError) {
        console.error('Failed to delete order:', deleteError.message);
      }
    }
    
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to initialize payment'
    });
  }
};

// Verify Paystack - FIXED WITH DIRECT API CALL
const verifyPaystack = async (req, res) => {
  const { reference, orderId } = req.body;

  try {
    console.log('Verifying Paystack payment:', { reference, orderId });
    
    // Validate reference exists and is a non-empty string
    if (!reference || typeof reference !== 'string' || reference.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid payment reference' 
      });
    }

    if (!orderId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing order ID' 
      });
    }

    // Trim and clean the reference
    const cleanedReference = reference.trim();
    
    // Use direct API call to verify transaction
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(cleanedReference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const responseData = response.data;
    
    // Check if verification was successful
    if (responseData.status !== true || !responseData.data) {
      console.error('Paystack verification failed:', responseData);
      throw new Error(responseData.message || 'Payment verification failed');
    }
    
    const transaction = responseData.data;
    
    if (transaction.status === 'success') {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId, 
        { 
          payment: true,
          status: 'Order Received'
        },
        { new: true }
      );
      
      // Clear user's cart
      if (updatedOrder && updatedOrder.userId) {
        await userModel.findByIdAndUpdate(updatedOrder.userId, { cartData: {} });
      }
      
      res.json({ 
        success: true, 
        message: "Payment Successful",
        order: updatedOrder
      });
    } else {
      // Delete order if payment failed
      await orderModel.findByIdAndDelete(orderId);
      res.json({ 
        success: false, 
        message: `Payment Failed: ${transaction.gateway_response || 'Unknown error'}` 
      });
    }
  } catch (error) {
    console.error('Paystack verification error:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    let errorMessage = error.message || 'Payment verification error';
    
    // Extract more detailed error from response if available
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    // Attempt to delete order on verification failure
    if (orderId) {
      try {
        await orderModel.findByIdAndDelete(orderId);
      } catch (deleteError) {
        console.error('Failed to delete order:', deleteError.message);
      }
    }
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage 
    });
  }
};

// Flutterwave Payment
// const placeOrderFlutterwave = async (req, res) => {
//   let newOrder;
//   try {
//     const { userId, items, amount, address } = req.body;
//     const { origin } = req.headers;

//     const newOrder = await createOrder(
//       userId,
//       items,
//       amount,
//       address,
//       "Flutterwave"
//     );

//     const payload = {
//       tx_ref: newOrder._id.toString(),
//       amount: amount,
//       currency: 'EUR', // Flutterwave supports EUR
//       redirect_url: `${origin}/verify?orderId=${newOrder._id}&gateway=flutterwave`,
//       customer: {
//         email: address.email,
//         phonenumber: address.phone,
//         name: `${address.firstName} ${address.lastName}`
//       },
//       customizations: {
//         title: "Order Payment",
//         description: "Payment for items in cart"
//       },
//       meta: {
//         user_id: userId
//       }
//     };

//     const response = await flw.PaymentLink.create(payload);
    
//     // Check Flutterwave response
//     if (response.status !== 'success' || !response.data.link) {
//       throw new Error(response.message || 'Failed to create payment link');
//     }
    
//     res.json({ success: true, link: response.data.link });

//   } catch (error) {
//     console.log('Flutterwave order error:', error);
    
//     // Attempt to delete order on failure
//     if (newOrder) {
//       try {
//         await orderModel.findByIdAndDelete(newOrder._id);
//       } catch (deleteError) {
//         console.error('Failed to delete order:', deleteError);
//       }
//     }
    
//     res.json({ success: false, message: error.message });
//   }
// };

// // Verify Flutterwave
// const verifyFlutterwave = async (req, res) => {
//   const { transaction_id, orderId } = req.body;

//   try {
//     console.log('Verifying Flutterwave payment:', { transaction_id, orderId });
    
//     if (!transaction_id || !orderId) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing transaction_id or orderId' 
//       });
//     }

//     const response = await flw.Transaction.verify({ id: transaction_id });
    
//     if (response.data.status === 'successful') {
//       const updatedOrder = await orderModel.findByIdAndUpdate(
//         orderId, 
//         { 
//           payment: true,
//           status: 'Order Received'
//         },
//         { new: true }
//       );
      
//       // Get user ID from order to clear cart
//       if (updatedOrder && updatedOrder.userId) {
//         await userModel.findByIdAndUpdate(updatedOrder.userId, { cartData: {} });
//       }
      
//       res.json({ 
//         success: true, 
//         message: "Payment Successful",
//         order: updatedOrder
//       });
//     } else {
//       // Delete order if payment failed
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ 
//         success: false, 
//         message: `Payment Failed: ${response.data.processor_response || 'Unknown error'}` 
//       });
//     }
//   } catch (error) {
//     console.log('Flutterwave verification error:', error);
    
//     // Attempt to delete order on verification failure
//     try {
//       await orderModel.findByIdAndDelete(orderId);
//     } catch (deleteError) {
//       console.error('Failed to delete order:', deleteError);
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Payment verification error' 
//     });
//   }
// };

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
      .populate('userId', 'name email')
      .sort({ date: -1 });
    
    res.json({ success: true, orders });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Order Data For Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Missing orderId or status'
      });
    }
    
    // Validate status
    const validStatuses = [
      'Order Received',
      'Preparing',
      'Ready for Pickup',
      'Out for Delivery',
      'Delivered',
      'Cancelled'
    ];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Status Updated' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, payment } = req.body;
    
    if (!orderId || payment === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing orderId or payment status'
      });
    }
    
    await orderModel.findByIdAndUpdate(orderId, { payment });
    res.json({ success: true, message: 'Payment status updated' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete pending order (for failed payments)
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing order ID'
      });
    }
    
    const order = await orderModel.findByIdAndDelete(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({ success: true, message: 'Order deleted' });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export {
  placeOrder,
  placeOrderPaystack,
  // placeOrderFlutterwave,
  verifyPaystack,
  // verifyFlutterwave,
  allOrders,
  userOrders,
  updateStatus,
  updatePaymentStatus,
  deleteOrder
};




























// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from 'stripe'
// import razorpay from 'razorpay'

// // global variables
// const currency = 'ngn'
// const deliveryCharge = 10

// // gateway initialize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// const razorpayInstance = new razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret : process.env.RAZORPAY_KEY_SECRET,
// })

// // Placing orders using COD Method
// const placeOrder = async (req,res) => {
    
//     try {
        
//         const { userId, items, amount, address} = req.body;

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod:"COD",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         await userModel.findByIdAndUpdate(userId,{cartData:{}})

//         res.json({success:true,message:"Order Placed"})


//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }

// }

// // Placing orders using Stripe Method
// const placeOrderStripe = async (req,res) => {
//     try {
        
//         const { userId, items, amount, address} = req.body
//         const { origin } = req.headers;

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod:"Stripe",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency:currency,
//                 product_data: {
//                     name:item.name
//                 },
//                 unit_amount: item.price * 100
//             },
//             quantity: item.quantity
//         }))

//         line_items.push({
//             price_data: {
//                 currency:currency,
//                 product_data: {
//                     name:'Delivery Charges'
//                 },
//                 unit_amount: deliveryCharge * 100
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: 'payment',
//         })

//         res.json({success:true,session_url:session.url});

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // Verify Stripe 
// const verifyStripe = async (req,res) => {

//     const { orderId, success, userId } = req.body

//     try {
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, {payment:true});
//             await userModel.findByIdAndUpdate(userId, {cartData: {}})
//             res.json({success: true});
//         } else {
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({success:false})
//         }
        
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }

// }

// // Placing orders using Razorpay Method
// const placeOrderRazorpay = async (req,res) => {
//     try {
        
//         const { userId, items, amount, address} = req.body

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod:"Razorpay",
//             payment:false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const options = {
//             amount: amount * 100,
//             currency: currency.toUpperCase(),
//             receipt : newOrder._id.toString()
//         }

//         await razorpayInstance.orders.create(options, (error,order)=>{
//             if (error) {
//                 console.log(error)
//                 return res.json({success:false, message: error})
//             }
//             res.json({success:true,order})
//         })

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// const verifyRazorpay = async (req,res) => {
//     try {
        
//         const { userId, razorpay_order_id  } = req.body

//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
//         if (orderInfo.status === 'paid') {
//             await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
//             await userModel.findByIdAndUpdate(userId,{cartData:{}})
//             res.json({ success: true, message: "Payment Successful" })
//         } else {
//              res.json({ success: false, message: 'Payment Failed' });
//         }

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }


// // All Orders data for Admin Panel
// const allOrders = async (req,res) => {

//     try {
        
//         const orders = await orderModel.find({})
//         res.json({success:true,orders})

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }

// }

// // User Order Data For Forntend
// const userOrders = async (req,res) => {
//     try {
        
//         const { userId } = req.body

//         const orders = await orderModel.find({ userId })
//         res.json({success:true,orders})

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// // update order status from Admin Panel
// const updateStatus = async (req,res) => {
//     try {
        
//         const { orderId, status } = req.body

//         await orderModel.findByIdAndUpdate(orderId, { status })
//         res.json({success:true,message:'Status Updated'})

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:error.message})
//     }
// }

// export {verifyRazorpay, verifyStripe ,placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}