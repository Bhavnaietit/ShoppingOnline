import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
	const { currency, backendUrl, token ,products} = useContext(ShopContext);

	const [orderData, setOrderData] = useState([]);
	const fetchUserOrder = async (token) => {

		if (!token) { 
			return null;
		}
		try {
			const response = await axios.post(backendUrl + "/api/order/user-order", {}, { headers: { token } });
			// console.log(response.data.orders)
			if (response.data.success) {
				let allOrdersItem = [];
				response.data.orders.map((order) => {
					order.items.map((item) => {
						item['status'] = order.status
						item["payment"] = order.payment;
						item["amount"] = order.amount;
						item["paymentMethod"] = order.paymentMethod;
						item["date"] = order.date;
						allOrdersItem.push(item);
				})
				});
				setOrderData(allOrdersItem.reverse());
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			toast.error(error.message);
		}
	}
	useEffect(() => {
		fetchUserOrder(token);
	}, [token]);
	console.log(orderData)
  return (
		<div className="border-t pt-16">
			<div className="text-2xl">
				<Title text1={"MY"} text2={"ORDERS"}></Title>
			</div>

			<div>
				{orderData &&
					orderData.map((item, i) => (
						<div
							key={i}
							className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<div className="flex items-start gap-6 text-sm">
								<img src={item.image[0]} className="w-16 sm:w-20"></img>
								<div>
									<p className="sm:tex-base font-medium">{item.name}</p>
									<div className="flex items-center gap-3 mt-2 text-base text-gray">
										<p className="text-lg">
											{currency}
											{item.amount}
										</p>
										<p>Quantity: {item.quantity}</p>
										<p>Size: {item.size}</p>
									</div>
									<p>
										Date:
										<span className="text-gray-500">
											{" " + new Date(item.date).toDateString()}
										</span>
									</p>
									<p>
										Payment:
										<span className="text-gray-500">
											{item.paymentMethod}
										</span>
									</p>
								</div>
							</div>
							<div className="md:w-1/2 flex justify-between">
								<div className="flex items-center gap-2">
									<p className="min-w-2 h-2 rounded-full bg-green-500"></p>
									<p className="text-sm md:text-base">{item.status}</p>
								</div>
								<button onClick={()=>fetchUserOrder(token)} className="text-sm cursor-pointer border border-gray-300 p-2">
									Track Order
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default Orders