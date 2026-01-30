const Order = require('../models/Order');
const Product = require('../models/Product');
const razorpayService = require('../services/razorpayService');
const mongoose = require('mongoose');

// @desc    Get all orders with filters
// @route   GET /admin/orders
// @access  Admin
exports.getOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      status,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};

    // Status filter
    if (status && status !== 'all') {
      query.orderStatus = status;
    }

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        query.createdAt.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    // Search by order number or customer name/email
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { orderNumber: searchRegex },
        { 'shippingAddress.firstName': searchRegex },
        { 'shippingAddress.lastName': searchRegex },
        { 'shippingAddress.email': searchRegex },
        { 'shippingAddress.phone': searchRegex }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Get total count
    const total = await Order.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));

    // Get orders with user populated
    const orders = await Order.find(query)
      .populate({
        path: 'user',
        select: 'name email'
      })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Format response
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      orderNumber: order.orderNumber,
      userId: order.userId,
      items: order.items,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.payment.method,
      paymentStatus: order.payment.status,
      orderStatus: order.orderStatus,
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      tax: order.tax,
      total: order.total,
      orderNotes: order.orderNotes,
      adminNotes: order.adminNotes,
      trackingNumber: order.trackingNumber,
      shippingProvider: order.shippingProvider,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deliveredAt: order.deliveredAt,
      cancelledAt: order.cancelledAt,
      user: order.user || null
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
    console.error('Get admin orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get order by ID
// @route   GET /admin/orders/:orderId
// @access  Admin
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    const order = await Order.findById(orderId)
      .populate({
        path: 'user',
        select: 'name email phone'
      })
      .lean();

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
      userId: order.userId,
      items: order.items,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.payment.method,
      paymentStatus: order.payment.status,
      orderStatus: order.orderStatus,
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      tax: order.tax,
      total: order.total,
      orderNotes: order.orderNotes,
      adminNotes: order.adminNotes,
      trackingNumber: order.trackingNumber,
      shippingProvider: order.shippingProvider,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deliveredAt: order.deliveredAt,
      cancelledAt: order.cancelledAt,
      cancelledReason: order.cancelledReason,
      user: order.user || null
    };

    res.status(200).json({
      success: true,
      data: { order: formattedOrder }
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

// @desc    Update order status
// @route   PUT /admin/orders/:orderId/status
// @access  Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, notes, trackingNumber, shippingProvider } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // If updating to delivered and it's a COD order, update payment status to 'paid'
    if (status === 'delivered' && order.payment.method === 'cod' && order.payment.status === 'pending') {
      order.payment.status = 'paid';
    }

    // If updating to cancelled and order is COD, update payment status to 'failed'
    if (status === 'cancelled' && order.payment.method === 'cod') {
      order.payment.status = 'failed';
      
      // Restore product stock for cancelled orders
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: item.quantity }
        });
      }
    }

    // Update order status and other fields
    order.orderStatus = status;
    order.updatedAt = new Date();

    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    if (status === 'cancelled') {
      order.cancelledAt = new Date();
      if (notes) {
        order.cancelledReason = notes;
      }
    }

    if (notes && status !== 'cancelled') {
      order.adminNotes = notes;
    }

    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    if (shippingProvider) {
      order.shippingProvider = shippingProvider;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: {
        order: {
          _id: order._id,
          orderNumber: order.orderNumber,
          orderStatus: order.orderStatus,
          paymentStatus: order.payment.status,
          updatedAt: order.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update payment status
// @route   PUT /admin/orders/:orderId/payment
// @access  Admin
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    // Validate payment status
    const validStatuses = ['pending', 'paid', 'failed', 'refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status'
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update payment status
    order.payment.status = status;
    order.updatedAt = new Date();
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment status updated successfully',
      data: {
        order: {
          _id: order._id,
          orderNumber: order.orderNumber,
          paymentStatus: order.payment.status,
          updatedAt: order.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating payment status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get order statistics
// @route   GET /admin/orders/stats
// @access  Admin
exports.getOrderStats = async (req, res) => {
  try {
    // Get total orders
    const totalOrders = await Order.countDocuments();
    
    // Get total revenue (sum of all delivered orders)
    const revenueResult = await Order.aggregate([
      { $match: { orderStatus: { $in: ['delivered', 'confirmed', 'processing', 'shipped'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    
    // Get average order value
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Get pending orders (orders with payment pending and order pending/confirmed)
    const pendingOrders = await Order.countDocuments({
      $or: [
        { orderStatus: 'pending' },
        { 
          orderStatus: 'confirmed',
          'payment.status': 'pending',
          'payment.method': 'cod'
        }
      ]
    });

    // Get orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          percentage: {
            $multiply: [
              { $divide: ['$count', totalOrders] },
              100
            ]
          }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get recent orders (last 5)
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email')
      .lean();

    // Format recent orders
    const formattedRecentOrders = recentOrders.map(order => ({
      _id: order._id,
      orderNumber: order.orderNumber,
      items: order.items,
      orderStatus: order.orderStatus,
      paymentStatus: order.payment.status,
      total: order.total,
      createdAt: order.createdAt,
      user: order.user || null
    }));

    // Format orders by status
    const formattedOrdersByStatus = ordersByStatus.map(stat => ({
      status: stat.status,
      count: stat.count,
      percentage: Math.round(stat.percentage * 100) / 100
    }));

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        avgOrderValue,
        pendingOrders,
        ordersByStatus: formattedOrdersByStatus,
        recentOrders: formattedRecentOrders
      }
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Bulk update orders
// @route   PUT /admin/orders/bulk-update
// @access  Admin
exports.bulkUpdateOrders = async (req, res) => {
  try {
    const { orderIds, status, notes } = req.body;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order IDs provided'
      });
    }

    // Validate status
    const validStatuses = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    // Update multiple orders
    const updatePromises = orderIds.map(async (orderId) => {
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return null;
      }

      const order = await Order.findById(orderId);
      if (!order) return null;

      // If updating to delivered and it's a COD order, update payment status to 'paid'
      if (status === 'delivered' && order.payment.method === 'cod' && order.payment.status === 'pending') {
        order.payment.status = 'paid';
      }

      // Update order
      order.orderStatus = status;
      order.updatedAt = new Date();

      if (status === 'delivered') {
        order.deliveredAt = new Date();
      }

      if (status === 'cancelled') {
        order.cancelledAt = new Date();
        if (notes) {
          order.cancelledReason = notes;
        }
        
        // Restore product stock for cancelled orders
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: item.quantity }
          });
        }
      }

      if (notes && status !== 'cancelled') {
        order.adminNotes = notes;
      }

      return order.save();
    });

    await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      message: `${orderIds.length} orders updated successfully`
    });
  } catch (error) {
    console.error('Bulk update orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error bulk updating orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete order
// @route   DELETE /admin/orders/:orderId
// @access  Admin
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID'
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Only allow deletion of cancelled or failed orders
    if (!['cancelled', 'failed'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Only cancelled or failed orders can be deleted'
      });
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Export orders
// @route   GET /admin/orders/export
// @access  Admin
exports.exportOrders = async (req, res) => {
  try {
    const { format = 'csv', status, startDate, endDate } = req.query;

    // Build query
    const query = {};
    
    if (status && status !== 'all') {
      query.orderStatus = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        query.createdAt.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    // Get orders
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    if (format === 'csv') {
      // Generate CSV
      let csv = 'Order Number,Customer Name,Email,Phone,Total,Payment Method,Payment Status,Order Status,Created At\n';
      
      orders.forEach(order => {
        const customerName = order.user 
          ? order.user.name 
          : `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`;
        
        const email = order.user ? order.user.email : order.shippingAddress.email;
        
        csv += `"${order.orderNumber}","${customerName}","${email}","${order.shippingAddress.phone}",${order.total},"${order.payment.method}","${order.payment.status}","${order.orderStatus}","${order.createdAt.toISOString()}"\n`;
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=orders-export-${new Date().toISOString().split('T')[0]}.csv`);
      return res.send(csv);
    } else if (format === 'json') {
      // Return JSON
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename=orders-export-${new Date().toISOString().split('T')[0]}.json`);
      return res.send(JSON.stringify(orders, null, 2));
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid format. Use csv or json'
      });
    }
  } catch (error) {
    console.error('Export orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error exporting orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};