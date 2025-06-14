import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { states } from "../assets/states";
import { countries } from "../assets/country";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
	const { products,
		currency,
		delivery_fee,
		backendUrl,
		cartItems,
		setCartItems,
		navigate,
		setToken,
		getCartAmount,
		token} =
		useContext(ShopContext);

	const [method, setMethod] = useState("cod");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		street: "",
		city: "",
		state: "",
		country: "",
		phone:""
	})
	const onChangeHandler = (e) => {
		const name = e.target.name
		const value= e.target.value
		setFormData((data) => ({ ...data, [name]: value }));
		
	}
	const onSubmitHandler = async(e) => {
		e.preventDefault();
		try {
			let orderItems = [];
			for (const items in cartItems) {
				for (const item in cartItems[items]) {
					if (cartItems[items][item] > 0) {
						const itemInfo = structuredClone(products.find((product=>product._id === items)));
						if (itemInfo) {
							itemInfo.size = item;
							itemInfo.quantity = cartItems[items][item];
							orderItems.push(itemInfo);
							
						}
					}
				}
			}
			let orderData = {
				address: formData,
				items: orderItems,
				amount: getCartAmount() + delivery_fee
			};
			switch (method) {
				case 'cod':
					const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
					console.log(response.data)
					if (response.data.success) {
						setCartItems({
							firstName: "",
							lastName: "",
							email: "",
							street: "",
							city: "",
							state: "",
							country: "",
							phone: "",
						});
						navigate('/orders');
					} else {
						toast.error(response.data.message);
					}
					break;
				default:
					break;
			}
		}
		catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	}
	return (
		<form
			className="mt-10 flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
			onSubmit={(e)=>onSubmitHandler(e)}>
			{/* left side */}
			<div className="flex flex-col  gap-4 w-full sm:max-w-[500px] mt-2">
				<div className="text-xl sm:text-2xl my-3">
					<Title text1={"DELIVERY"} text2={"INFORMATION"}></Title>
				</div>

				<div className="flex flex-col gap-4 w-full">
					<div className="flex gap-2 justify-between">
						<input
							onChange={onChangeHandler}
							value={formData.firstName}
							className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
							required
							type="text"
							placeholder="First Name"
							name="firstName"
							id="firstName"></input>
						<input
							onChange={onChangeHandler}
							value={formData.lastName}
							className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
							required
							type="text"
							placeholder="Last Name"
							name="lastName"
							id="lastName"></input>
					</div>

					<input
						onChange={onChangeHandler}
						value={formData.email}
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						required
						type="email"
						placeholder="Email Address"
						name="email"
						id="email"></input>
					<input
						onChange={onChangeHandler}
						value={formData.street}
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						required
						type="Street"
						placeholder="Street"
						name="street"
						id="street"></input>
					<div className="flex gap-3">
						<input
							onChange={onChangeHandler}
							value={formData.country}
							className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
							required
							type="text"
							placeholder="Country"
							name="country"
							id="country"></input>
						<input
							onChange={onChangeHandler}
							value={formData.state}
							className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
							required
							type="text"
							placeholder="State"
							name="state"
							id="state"></input>
						{/* <select
							className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
							name="country"
							id="country">
							<option value={""} hidden className="text-gray-300">
								Country
							</option>
							{countries.map((country) => {
								return <option value={country}>{country}</option>;
							})}
						</select> */}

						{/* <select
							name="state"
							id="state"
							className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none">
							<option value={""} hidden className="text-gray-300">
								State
							</option>
							{states.map((state) => {
								return <option value={state}>{state}</option>;
							})}
						</select> */}
					</div>

					<div className="flex gap-3">
						<input
							onChange={onChangeHandler}
							value={formData.city}
							className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
							required
							type="text"
							placeholder="City"
							name="city"
							id="city"></input>
						<input
							onChange={onChangeHandler}
							value={formData.zipcode}
							className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
							required
							type="number"
							placeholder="Zipcode"
							name="zipcode"></input>
					</div>
					<input
						onChange={onChangeHandler}
						value={formData.phone}
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none"
						required
						type="number"
						placeholder="1234567890"
						name="phone"
						id="phone"></input>
				
				</div>
			</div>
			{/* right side */}
			<div className="mt-18">
				<CartTotal></CartTotal>

				<div className="mt-12">
					<Title text1={"PAYMENT"} text2={"MATHOD"}></Title>

					<div className="flex gap-3 flex-col lg:flex-row">
						<div
							className="flex flex-center  gap-3 p-2 px-3 border cursor-pointer"
							onClick={() => {
								setMethod("stripe");
							}}>
							<p
								className={`min-w-3.5 h-3.5 border rounded-full ${
									method === "stripe" ? "bg-green-500" : ""
								}`}></p>
							<img src={assets.stripe_logo} className="h-4 mx-4"></img>
						</div>
						<div
							className="flex flex-center  gap-3 p-2 px-3 border cursor-pointer"
							onClick={() => setMethod("razorpay")}>
							<p
								className={`min-w-3.5 h-3.5 border rounded-full 
              ${method === "razorpay" ? "bg-green-500" : ""}`}></p>
							<img src={assets.razorpay_logo} className="h-4 mx-4"></img>
						</div>
						<div
							className="flex flex-center  gap-3 p-2 px-3 border cursor-pointer"
							onClick={() => {
								setMethod("cod");
							}}>
							<p
								className={`min-w-3.5 h-3.5 border rounded-full ${
									method === "cod" ? "bg-green-500" : ""
								}`}></p>
							<p className="text-gray-500 text-sm font-medium mx-4">
								CASH ON DELIVERY
							</p>
						</div>
					</div>
					<div className="w-full text-end flex justify-end mt-4">
						<button
							type="submit"
							className="bg-black  text-white py-3 px-16 text-sm">
							{" "}
							PLACE ORDER
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default PlaceOrder;
