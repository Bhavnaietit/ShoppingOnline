import React from "react";
import { useState } from "react";
import { backendUrl } from "../App";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import {currency} from '../App'
const Orders = ({ token }) => {
	const [orders, setOrders] = useState([]);
	const fetchAllOrders = async (token) => {
		if (!token) {
			return null;
		}
		try {
			const response = await axios.post(
				backendUrl + "/api/order/list",
				{},
				{ headers: { token } }
			);
		
			if (response.data.success) {
				setOrders(response.data.orders);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
  };
  const statusHandler = async (event,orderId) => {
    try {
      console.log(event,orderId)
      const response = await axios.post(
				backendUrl + "/api/order/status",
				{status:event.target.value,orderId},
				{ headers: { token } }
			);
      console.log(response.data)
      if (response.data.success) {
        await fetchAllOrders(token)
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
	useEffect(() => {
		fetchAllOrders(token);
	}, [token]);

	return (
		<div>
			<h3>Order Page</h3>
			<div>
				{orders &&
					orders.map((order, i) => {
						return (
							<div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-gray-700">
								<img src={assets.parcel_icon} className="w-12"></img>
								<div>
									{order.items.map((item, idx) => {
										if (idx === order.items.length - 1) {
											return (
												<p key={idx} className="py-0.5">
													{item.name} x {item.quantity} <span>{item.size}</span>
												</p>
											);
										} else {
											return (
												<p key={idx} className="py-0.5">
													{item.name} x {item.quantity}{" "}
													<span>{item.size},</span>
												</p>
											);
										}
									})}
								</div>
								<p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
								<div>
									<p>{order.address.street}</p>
									<p>
										{order.address.city +
											", " +
											order.address.state +
											", " +
											order.address.country +
											", " +
											order.address.zipcode}
									</p>
									<p>{order.address.phone}</p>
								</div>
								<div>
									<p className="text-sm  sm:text-[15px]">Items:{order.items.length}</p>
									<p>Method:{order.paymentMethod}</p>
									<p>Payment:{order.payment ? "Done" : "Pending"}</p>
									<p>Date:{new Date(order.date).toLocaleDateString()}</p>
								</div>
								<p className="text-sm sm:text-[15px]">
									{currency}
									{order.amount}
								</p>
                <select value={order.status} onChange={(e) => {
                  statusHandler(e,order._id);
                }} className="p-2 font-semibold border outline-none border-gray-400">
									<option value={"Order Placed"}>Order Placed</option>
									<option value={"Packing"}>Packing</option>
									<option value={"Shipped"}>Shipped</option>
									<option value={"Out for delivery"}>Out for delivery</option>
									<option value={"Delivered"}>Delivered</option>
								</select>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Orders;
