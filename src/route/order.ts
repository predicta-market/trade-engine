import express from 'express';
import {createOrder,fetchOrder,fetchAllOrders} from '../controller';

const orderRoute = express.Router();

/**
 * @route   POST /api/order
 * @desc    Create a new order
 * @access  Authenticated User
 */
orderRoute.post('/',createOrder);

/**
 * @route   GET /api/order/:id
 * @desc    Fetch order details from order id
 * @access  Authenticated User
 */
orderRoute.get('/:id',fetchOrder);

/**
 * @route   GET /api/order
 * @desc    Fetch order details from order id
 * @access  Authenticated User
 */
orderRoute.get('/',fetchAllOrders);

export default orderRoute;