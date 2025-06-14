import orderModel from '../models/orderModel.js'
import userModel from "../models/userModel.js";
// using cash on delivery
 const placeOrder = async (req, res) => {
     try {
         const { userId, items, amount, address } = req.body;
         const orderData = {
             userId,
             items,
             address,
             amount,
             paymentMethod: "COD",
             payment: false,
             date:Date.now()
         }
         const newOrder = new orderModel(orderData);
         await newOrder.save();
         
         await userModel.findByIdAndUpdate(userId, { cartData: {} });
         res.json({success:true,message:"Order Placed"})
     } catch (error) {
         console.log(error);
         res.json({ success: false, message:error.message });
    }
}
// using stripe method
 const placeOrderStripe= async (req, res) => { };

// using razorpay method
 const placeOrderRazorpay = async (req, res) => { };

// all order for only Admin
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,orders})
    } catch (error) {
        res.json({ success: false, message: error.message });
     }
 };

// update status for only Admin
const updateStatus = async (req, res) => { 
    try {
        
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status:status });
        const orders = await orderModel.findById(orderId);
        console.log(orders.status,status)
			res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
			res.json({ success: false, message: error.message });
		}
};
//  user order
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders= await orderModel.find({ userId });
        
        res.json({ success: true, orders});
    } catch (error) {
        console.log(error);
		res.json({ success: false, message: error.message });
    }
 };

export {placeOrder,placeOrderStripe,placeOrderRazorpay,userOrders,allOrders,updateStatus}
