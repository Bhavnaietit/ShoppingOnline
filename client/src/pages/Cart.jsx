import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
	const {
		products,
		currency,
		cartItems,
		updateQuality,
		navigate,

	} = useContext(ShopContext);
	
	const [cartData, setCartData] = useState([]);
	
	useEffect(() => {
		if (products.length > 0) {
			const tempData = [];
			for (const items in cartItems) {
				for (const item in cartItems[items]) {
					if (cartItems[items][item] > 0) {
						console.log(cartItems[items][item]);
						tempData.push({
							_id: items,
							size: item,
							quantity: cartItems[items][item],
						});
					}
				}
			}
			setCartData(tempData);
	}
	}, [cartItems,products]);
	

	return (
		<div className="border-t pt-14 ">
			<div className="text-2xl mb-3">
				<Title text1={"YOUR"} text2={"CART"}></Title>
			</div>

			<div>
				{cartData &&
					cartData.map((item, i) => {
						const productData = products.find(
							(product) => product._id === item._id
						);
						return (
							<div
								key={i}
								className="py-4 border-t border-b text-gray-700 grid  grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
								<div className="flex items-start gap-6">
									<img
										src={productData.image[0]}
										className="w-16 sm:w-20"></img>
									<div>
										<p className="font-medium text-xs sm:text-lg">
											{productData.name}
										</p>
										<div className="flex items-center gap-5 mt-2">
											<p>
												{currency}
												{productData.price}
											</p>
											<p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
												{item.size}
											</p>
										</div>
									</div>
								</div>
								<input
									type="number"
									min={1}
									defaultValue={item.quantity}
									onClick={(e) => {
										if (e.target.value <= 1) {
											toast.warn('You have need alteast one product to cart')
											return;
										}
										updateQuality(item._id, item.size, e.target.value)
										
									}
									}
									className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"></input>
								<img
									src={assets.bin_icon}
									className="w-4 sm:w-5 cursor-pointer"
									onClick={() => {
										updateQuality(item._id, item.size, 0);
										
									}}></img>
							</div>
						);
					})}
			</div>

			<div className="flex justify-end my-20">
				<div className="w-full sm:w-[450px]">
					<CartTotal></CartTotal>
					<div className="w-full text-end flex justify-end mt-4">
						<button
							onClick={() => {
								navigate("/place-order");
							}}
							className="bg-black  text-white py-3 px-16 text-sm">
							{" "}
							Make Payment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
