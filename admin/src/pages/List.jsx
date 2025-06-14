import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const List = ({token}) => {
	const [list, setList] = useState("");
	const fetchProducts = async () => {
		try {
			const response = await axios.get(backendUrl + "/api/product/list");
			console.log(response.data);
			if (response.data.success) {
				setList(response.data.products);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	const removeProduct = async (id) => {
		try {
			const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
			if (response.data.success) {
				toast.success(response.data.message);
				await fetchProducts();
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}
	useEffect(() => {
		fetchProducts();
	}, []);


	return (
		list && (
			<div>
				<p className="mb-2">All Products List</p>
				<div className="flex flex-col gap-2">
					<div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center-center gap-4 justify-center">
						<b>Image</b>
						<b>Name</b>
						<b>Category</b>
						<b>Price</b>
						<b className="text-center">Action</b>
					</div>

					{list.map((item, i) => {
						return (
							<div
								key={i}
								className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center-center gap-2 border py-1 px-2 text-sm">
								<img src={item.image[0]} className="w-12"></img>
								<p>{item.name}</p>
								<p>{item.category}</p>
								<p>{item.price}</p>
								<p className="text-right md:text-center cursor-pointer" onClick={()=>removeProduct(item._id)}>X</p>
							</div>
						);
					})}
				</div>
			</div>
		)
	);
};

export default List;
