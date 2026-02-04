const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const razorpayService = require('../services/razorpayService');
const mongoose = require('mongoose');

// @desc    Create new order (without payment)
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id;
    const {
      shippingAddress,
      paymentMethod = 'cod',
      orderNotes = '',
      saveAddress = false
    } = req.body;

    console.log('Creating order for user:', userId);

    // Validate required fields
    if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.lastName ||
        !shippingAddress.email || !shippingAddress.phone || !shippingAddress.address ||
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required shipping address fields'
      });
    }

    // Validate payment method
    if (!['razorpay', 'cod', 'upi'].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment method'
      });
    }

    // Get user's cart with populated products
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: '_id name price images stock isActive'
    }).session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate cart items and prepare order items
    const invalidItems = [];
    const orderItems = [];

    for (const item of cart.items) {
      if (!item.productId) {
        invalidItems.push('Item with invalid product');
        continue;
      }

      const product = item.productId;

      if (!product.isActive) {
        invalidItems.push(`${product.name} is not available`);
        continue;
      }

      if (product.stock < item.quantity) {
        invalidItems.push(`Only ${product.stock} items of ${product.name} available`);
        continue;
      }

      orderItems.push({
        productId: product._id,
        productName: product.name || 'Unknown Product',
        quantity: item.quantity || 1,
        price: product.price || 0,
        image: product.images && product.images.length > 0 
          ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0].url)
          : ''
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save({ session });
    }

    if (invalidItems.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Some items in your cart are not available',
        errors: invalidItems
      });
    }

    if (orderItems.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'No valid items in cart'
      });
    }

    // Calculate totals - REMOVE TAX
     const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
     const shippingFee = subtotal > 1999 ? 0 : 50;
     const tax = 0; // Set tax to 0
     const total = subtotal + shippingFee + tax; // Only subtotal + shipping


    // Create order with pending payment
    const order = new Order({
      userId,
      items: orderItems,
      shippingAddress: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        apartment: shippingAddress.apartment || '',
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country || 'India'
      },
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'cod' ? 'pending' : 'pending'
      },
      orderStatus: paymentMethod === 'cod' ? 'confirmed' : 'pending',
      subtotal,
      shippingFee,
      tax,
      total,
      orderNotes: orderNotes || ''
    });

    const savedOrder = await order.save({ session });

    // Clear user's cart
    await Cart.findOneAndUpdate({ userId }, { items: [] }, { session });

    // Save address if requested
    if (saveAddress) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          addresses: {
            firstName: shippingAddress.firstName,
            lastName: shippingAddress.lastName,
            email: shippingAddress.email,
            phone: shippingAddress.phone,
            address: shippingAddress.address,
            apartment: shippingAddress.apartment || '',
            city: shippingAddress.city,
            state: shippingAddress.state,
            zipCode: shippingAddress.zipCode,
            country: shippingAddress.country || 'India',
            isDefault: true
          }
        }
      }, { session });
    }

    await session.commitTransaction();

    // For COD, return success immediately
    if (paymentMethod === 'cod') {
      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
          order: {
            _id: savedOrder._id,
            orderNumber: savedOrder.orderNumber,
            orderStatus: savedOrder.orderStatus,
            paymentStatus: savedOrder.payment.status,
            total: savedOrder.total,
            paymentMethod: savedOrder.payment.method
          },
          requiresPayment: false
        }
      });
    }

    // For Razorpay/UPI, create payment order
    const razorpayOrder = await razorpayService.createOrder(
      savedOrder.total,
      'INR',
      savedOrder.orderNumber
    );

    if (!razorpayOrder.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create payment order'
      });
    }

    // Update order with Razorpay order ID
    savedOrder.payment.razorpayOrderId = razorpayOrder.orderId;
    await savedOrder.save();

    return res.status(201).json({
      success: true,
      message: 'Order created. Please complete payment.',
      data: {
        order: {
          _id: savedOrder._id,
          orderNumber: savedOrder.orderNumber,
          orderStatus: savedOrder.orderStatus,
          paymentStatus: savedOrder.payment.status,
          total: savedOrder.total,
          paymentMethod: savedOrder.payment.method
        },
        payment: {
          razorpayOrderId: razorpayOrder.orderId,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          key: process.env.RAZORPAY_KEY_ID || 'rzp_test_SA4QbAArCv61EY'
        },
        requiresPayment: true
      }
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    session.endSession();
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/orders/:id/verify-payment
// @access  Private
exports.verifyPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    // Find order
    const order = await Order.findOne({ 
      _id: id, 
      userId: req.user._id,
      'payment.razorpayOrderId': razorpay_order_id 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Verify payment signature
    const isValid = razorpayService.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      // Update order as failed
      order.payment.status = 'failed';
      await order.save();

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    // Update order as paid and confirmed
    order.payment.status = 'paid';
    order.payment.razorpayPaymentId = razorpay_payment_id;
    order.payment.razorpaySignature = razorpay_signature;
    order.orderStatus = 'confirmed';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        order: {
          _id: order._id,
          orderNumber: order.orderNumber,
          orderStatus: order.orderStatus,
          paymentStatus: order.payment.status,
          total: order.total
        }
      }
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders/user
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      page = 1,
      limit = 10,
      status
    } = req.query;

    // Build query
    const query = { userId };

    // Status filter
    if (status && status !== 'all') {
      query.orderStatus = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count
    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));

    // Get orders
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Format response
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      orderNumber: order.orderNumber,
      items: order.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      shippingAddress: order.shippingAddress,
      paymentMethod: order.payment.method,
      paymentStatus: order.payment.status,
      orderStatus: order.orderStatus,
      total: order.total,
      createdAt: order.createdAt,
      deliveredAt: order.deliveredAt,
      cancelledAt: order.cancelledAt
    }));

    res.status(200).json({
      success: true,
      data: {
        orders: formattedOrders,
        total,
        totalPages,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    const order = await Order.findOne({ _id: id, userId }).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Format response
    const formattedOrder = {
      _id: order._id,
      orderNumber: order.orderNumber,
      items: order.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      shippingAddress: order.shippingAddress,
      paymentMethod: order.payment.method,
      paymentStatus: order.payment.status,
      orderStatus: order.orderStatus,
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      tax: order.tax,
      total: order.total,
      orderNotes: order.orderNotes,
      trackingNumber: order.trackingNumber,
      shippingProvider: order.shippingProvider,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deliveredAt: order.deliveredAt,
      cancelledAt: order.cancelledAt,
      cancelledReason: order.cancelledReason
    };

    res.status(200).json({
      success: true,
      data: {
        order: formattedOrder
      }
    });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order details',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { reason = '' } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    const order = await Order.findOne({ _id: id, userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order can be cancelled
    if (!['pending', 'confirmed'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // If paid with Razorpay, initiate refund
    if (order.payment.method === 'razorpay' && order.payment.status === 'paid') {
      const refund = await razorpayService.refundPayment(
        order.payment.razorpayPaymentId,
        order.total
      );

      if (!refund.success) {
        return res.status(500).json({
          success: false,
          message: 'Failed to process refund'
        });
      }
    }

    // Update order status
    order.orderStatus = 'cancelled';
    order.cancelledAt = new Date();
    order.cancelledReason = reason;
    order.payment.status = order.payment.method === 'razorpay' ? 'refunded' : 'failed';
    
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};