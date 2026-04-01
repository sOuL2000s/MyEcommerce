import asyncHandler from 'express-async-handler';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/OrderModel.js';
import Product from '../models/ProductModel.js';

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) { res.status(400); throw new Error('No order items'); } 
  else {
    const itemsFromDB = await Promise.all(orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        return { name: product.name, qty: item.qty, image: product.image, price: product.price, product: product._id };
    }));
    const order = new Order({ user: req.user._id, orderItems: itemsFromDB, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) {
    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) { res.status(401); throw new Error('Not authorized'); }
    res.status(200).json(order);
  } else { res.status(404); throw new Error('Order not found'); }
});

// @desc    Create Razorpay Order
// @route   POST /api/orders/:id/razorpay
// @access  Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(order.totalPrice * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${order._id}`,
    };

    const razorpayOrder = await instance.orders.create(options);

    if (!razorpayOrder) {
      res.status(500);
      throw new Error('Error creating Razorpay order');
    }

    res.json(razorpayOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/orders/:id/verify
// @access  Private
const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const order = await Order.findById(req.params.id);

  if (order) {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: razorpay_payment_id,
        status: 'completed',
        update_time: new Date().toISOString(),
        email_address: req.user.email,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(400);
      throw new Error('Invalid payment signature');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true; order.paidAt = Date.now();
    order.paymentResult = { id: req.body.id, status: req.body.status, update_time: req.body.update_time, email_address: req.body.email_address };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else { res.status(404); throw new Error('Order not found'); }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) { order.isDelivered = true; order.deliveredAt = Date.now(); const updatedOrder = await order.save(); res.json(updatedOrder); } 
  else { res.status(404); throw new Error('Order not found'); }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);
});
export { 
  addOrderItems, 
  getMyOrders, 
  getOrderById, 
  updateOrderToPaid, 
  updateOrderToDelivered, 
  getOrders,
  createRazorpayOrder,
  verifyRazorpayPayment
};
