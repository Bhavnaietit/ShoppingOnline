import express from 'express';
import {
	placeOrder,
	placeOrderStripe,
	placeOrderRazorpay,
	allOrders,
    updateStatus,
    userOrders,
    
} from '../controllers/orderController.js'
import authAdmin from '../middlewares/adminAuth.js'
import authUser from "../middlewares/auth.js";
const orderRouter = express.Router();

// admin feature
orderRouter.post('/list', authAdmin, allOrders);
orderRouter.post("/status", authAdmin, updateStatus);

// payment feature
orderRouter.post("/place",authUser,placeOrder);
orderRouter.post("/stripe",authUser, placeOrderStripe);
orderRouter.post("/razorpay",authUser,placeOrderRazorpay);

// user feature
orderRouter.post("/user-order",authUser, userOrders);


export default orderRouter;