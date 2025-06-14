import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";

const Contact = () => {
	const { products ,search,showSearch} = useContext(ShopContext);
	const [showFilter, setShowFilter] = useState(true);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [sortType, setSortType] = useState('relavent');

	const toggleCategory = (e) => {
		if (category.includes(e.target.value)) {
			setCategory(prev => prev.filter((item) => item !== e.target.value));
		} else {
			setCategory(prev=>[...prev,e.target.value])
	   }
	}
	
	
	const toggleSubCategory = (e) => {
		if (subCategory.includes(e.target.value)) {
			setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
		} else {
			setSubCategory((prev) => [...prev, e.target.value]);
		}
	};
 
	const applyFilter = () => {
		let productsCopy = products.slice();
		
		if (search && showSearch) {
			productsCopy = productsCopy.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}
		if (category.length > 0) {
			productsCopy = productsCopy.filter((item) =>
				category.includes(item.category)
			);
		}
		if (subCategory.length > 0) {
			productsCopy = productsCopy.filter((item) =>
				subCategory.includes(item.subCategory)
			);
		}
		setFilterProducts(productsCopy);
	}
	
	const sortProduct = () => {
		let filterProductsCopy = filterProducts.slice();
		
		switch (sortType) {
			case "low-high":
				setFilterProducts(filterProductsCopy.sort((a, b) => (a.price - b.price)));
				break;
			case "high-low":
				setFilterProducts(filterProductsCopy.sort((a, b) => (b.price - a.price)));
				break;
			default:
				applyFilter();
				break;
		}
	}
	useEffect(() => {
		setFilterProducts(products);
	}, [products]);
	
	useEffect(() => {
		applyFilter();
	}, [category,subCategory,search,showSearch]);
	
	useEffect(() => {
		sortProduct();
	},[sortType])
	return (
		<div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
			{/*left-side, Filter Options */}
			<div className="min-w-60">
				<p
					onClick={() => {
						setShowFilter(!showFilter);
					}}
					className="my-2 text-xl flex items-center cursor-pointer gap-2">
					FILTERS
					<img
						src={assets.dropdown_icon}
						className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}></img>
				</p>
				{/* Category Filter */}
				<div
					className={`border border-gray-300 pl-5 py-3 mt-6  ${
						showFilter ? "" : "hidden"
					}`}>
					<p className="mb-3 text-sm font-medium">CATEGORY</p>
					<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
						<p className="flex gap-2">
							<input
								type="checkbox"
								value={"Men"}
								className="w-3"
								onChange={toggleCategory}></input>{" "}
							<span>Men</span>
						</p>
						<p className="flex gap-2">
							<input
								type="checkbox"
								value={"Women"}
								className="w-3"
								onChange={toggleCategory}></input>{" "}
							<span>Women</span>
						</p>
						<p className="flex gap-2">
							<input
								type="checkbox"
								value={"Kids"}
								className="w-3"
								onChange={toggleCategory}></input>{" "}
							<span>Kids</span>
						</p>
					</div>
				</div>
				{/* subCategory Filter */}
				<div
					className={`border border-gray-300 pl-5 py-3 mt-5 ${
						showFilter ? "" : "hidden"
					}`}>
					<p className="mb-3 text-sm font-medium">TYPE</p>
					<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
						<p className="flex gap-2">
							<input
								type="checkbox"
								value={"Topwear"}
								className="w-3"
								onChange={toggleSubCategory}></input>{" "}
							<span>Topwear</span>
						</p>
						<p className="flex gap-2">
							<input
								type="checkbox"
								value={"Bottomwear"}
								className="w-3"
								onChange={toggleSubCategory}></input>{" "}
							<span>Bottomwear</span>
						</p>
						<p className="flex gap-2">
							<input
								type="checkbox"
								value={"Winterwear"}
								className="w-3"
								onChange={toggleSubCategory}></input>{" "}
							<span>Winterwear</span>
						</p>
					</div>
				</div>
			</div>

			{/* Right side */}
			<div className="flex-1">
				<div className="flex justify-between text-base sm:text-2xl mb-4">
					<Title text1={"ALL"} text2={"COLLECTIONS"}></Title>
					<select
						className="border-1 border-gray-300 text-sm lg:px-2 "
						onChange={(e) => {
							setSortType(e.target.value);
						}}>
						<option value="relavent">Sort by:Relavent</option>
						<option value="low-high">Sort by:Low to High</option>
						<option value="high-low">Sort By:High to Low</option>
					</select>
				</div>

				{/* Map Products */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
					{filterProducts.map((item, i) => {
						return  (
							<ProductItem
								key={i}
								id={item._id}
								name={item.name}
								price={item.price}
								image={item.image}></ProductItem>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Contact;
