import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Form } from "react-router-dom";
const Add = ({ token }) => {
	const [image1, setImage1] = useState(false);
	const [image2, setImage2] = useState(false);
	const [image3, setImage3] = useState(false);
	const [image4, setImage4] = useState(false);

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("Men");
	const [subCategory, setSubCategory] = useState("Topwear");
	const [price, setPrice] = useState(0);
	const [sizes, setSizes] = useState([]);
	const [bestSeller, setBestSeller] = useState(false);

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			
			if (!image1 && !image2 && !image3  
		&& !image4) {
				toast.error("Atleat one image need to add a product");
				return;
			}
			toast.success("Please wait for a minute");
			const formData = new FormData();
			formData.append("name", name);
			formData.append("description", description);
			formData.append("price", price);
			formData.append("category", category);
			formData.append("subCategory", subCategory);
			formData.append("sizes", JSON.stringify(sizes));
			formData.append("bestSeller", bestSeller);

			// add imgaes
			
			 image1 && formData.append('image1', image1);
			 image2 && formData.append("image2", image2);
			 image3 && formData.append("image3", image3);
			 image4 && formData.append("image4", image4);

			const response = await axios.post(
				backendUrl + "/api/product/add",formData,{headers:{token}});
		
			if (response.data.success) {
				toast.success("product added");
				setImage1(false);
				setImage2(false);
				setImage3(false);
				setImage4(false);

				setName('');
				setCategory('');
				setSubCategory('');
				setPrice('');
				setSizes([]);
				setBestSeller(false);
				
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			if (error.response) {
				toast.error("network error");
			} else {
				toast.error(toast.error.message);
			}
		}
	};
	return (
		<form className="flex flex-col w-full  gap-3" onSubmit={handleSubmit}>
			{/* images */}
			<div>
				<p className="text-gray-500 font-medium mb-2">Upload images</p>
				<div className="flex gap-5">
					<div className="flex gap-2">
						<label htmlFor="image1">
							<img
								src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
								className="w-20"></img>
							<input
								type="file"
								hidden
								name="image1"
								id="image1"
								onChange={(e) => {
									setImage1(e.target.files[0]);
								}}></input>
						</label>
						<label htmlFor="image2">
							<img
								src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
								className="w-20"></img>
							<input
								type="file"
								onChange={(e) => {
									setImage2(e.target.files[0]);
								}}
								hidden
								name="image2"
								id="image2"></input>
						</label>
						<label htmlFor="image3">
							<img
								src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
								className="w-20"></img>
							<input
								type="file"
								onChange={(e) => {
									setImage3(e.target.files[0]);
								}}
								hidden
								name="image3"
								id="image3"></input>
						</label>
						<label htmlFor="image4">
							<img
								src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
								className="w-20"></img>
							<input
								type="file"
								onChange={(e) => {
									setImage4(e.target.files[0]);
								}}
								hidden
								name="image4"
								id="image4"></input>
						</label>
					</div>
				</div>
			</div>
			{/* name */}
			<div>
				<label htmlFor="name" className="flex flex-col mt-2">
					Product name
					<input
						type="text"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						required
						placeholder="name.."
						className="p-2 rounded border w-full max-w-[500px]  border-gray-300 outline-none"></input>
				</label>
			</div>
			{/* description */}
			<div className="flex flex-col mt-2">
				<label htmlFor="name">Product description</label>
				<textarea
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					required
					placeholder="description"
					className="p-2 rounded w-full max-w-[500px] border border-gray-300 outline-none"></textarea>
			</div>
			{/* category,sub-categ ,price */}
			<div className="mt-4 flex gap-5">
				<div className="flex flex-col gap-2">
					<label htmlFor="category">Product category</label>
					<select
						name="category"
						value={category}
						onChange={(e) => {
							setCategory(e.target.value);
						}}
						required
						className="p-2 rounded w-fit border border-gray-300 outline-none">
						<option value={"Men"}>Men</option>
						<option value={"Women"}>Women</option>
						<option value={"Kids"}>Kids</option>
					</select>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="subCategory">Product subCategory</label>
					<select
						name="subCategory"
						value={subCategory}
						onChange={(e) => {
							setSubCategory(e.target.value);
						}}
						required
						className="p-2 rounded w-fit border border-gray-300 outline-none">
						<option value={"Bottomwear"}>Bottomwear</option>
						<option value={"Topwear"}>Topwear</option>
						<option value={"Winterwear"}>Winterwear</option>
					</select>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="price">Product Price</label>
					<input
						type="number"
						onChange={(e) => {
							setPrice(e.target.value);
						}}
						required
						// value={price}
						className="p-2 rounded w-25 border border-gray-300 outline-none"></input>
				</div>
			</div>
			{/* sizes */}
			<div className="mb-2">
				<p>Product Sizes</p>
				<div className="flex gap-4">
					<p
						className={`${
							sizes.includes("S") ? "bg-pink-300" : "bg-slate-200"
						} px-3 py-1 cursor-pointer w-fit`}
						onClick={() => {
							setSizes((prev) =>
								prev.includes("S")
									? prev.filter((item) => item !== "S")
									: [...prev, "S"]
							);
						}}>
						S
					</p>
					<p
						onClick={() => {
							setSizes((prev) =>
								prev.includes("M")
									? prev.filter((item) => item !== "M")
									: [...prev, "M"]
							);
						}}
						className={`${
							sizes.includes("M") ? "bg-pink-300" : "bg-slate-200"
						} px-3 py-1 cursor-pointer w-fit`}>
						M
					</p>
					<p
						onClick={() => {
							setSizes((prev) =>
								prev.includes("L")
									? prev.filter((item) => item !== "L")
									: [...prev, "L"]
							);
						}}
						className={`${
							sizes.includes("L") ? "bg-pink-300" : "bg-slate-200"
						} px-3 py-1 cursor-pointer w-fit`}>
						L
					</p>
					<p
						onClick={() => {
							setSizes((prev) =>
								prev.includes("XL")
									? prev.filter((item) => item !== "XL")
									: [...prev, "XL"]
							);
						}}
						className={`${
							sizes.includes("XL") ? "bg-pink-300" : "bg-slate-200"
						} px-3 py-1 cursor-pointer w-fit`}>
						XL
					</p>
					<p
						onClick={() => {
							setSizes((prev) =>
								prev.includes("XXL")
									? prev.filter((item) => item !== "XXL")
									: [...prev, "XXL"]
							);
						}}
						className={`${
							sizes.includes("XXL") ? "bg-pink-300" : "bg-slate-200"
						} px-3 py-1 cursor-pointer w-fit`}>
						XXL
					</p>
				</div>
			</div>
			{/* bestseller */}
			<div className="flex gap-2">
				<input
					type="checkbox"
					id="besrSeller"
					onChange={() => {
						setBestSeller((prev) => !prev);
					}}
					checked={bestSeller}
					className="cursor-pointer"></input>
				<label htmlFor="bestSeller">Add to BestSeller</label>
			</div>
			<button
				type="submit"
				className="bg-black text-white w-fit px-5 py-2 cursor-pointer mt-3">
				ADD
			</button>
		</form>
	);
};

export default Add;
