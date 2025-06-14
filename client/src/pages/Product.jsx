import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
const Product = () => {
	const { productId } = useParams();
	const { products, currency,addToCart } = useContext(ShopContext);
	const [productData, setProductData] = useState([]);
	const [img, setImg] = useState(null);
	const [sizes, setSizes] = useState([]);

	const fetchProductData = async () => {
		products.forEach((product) => {
			if (product._id == productId) {
				setImg(product.image[0]);
				setProductData(product);
			}
		});
	};
	console.log(sizes);
	useEffect(() => {
		fetchProductData();
	}, [productId]);

	return productData ? (
		<div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
			{/* Product Data */}
			<div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
				{/* product images */}
				<div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
					<div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
						{productData.image &&
							productData.image.map((imgSrc, i) => {
								return (
									<img
										src={imgSrc}
										key={i}
										className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
										alt=""
										onClick={() => {
											setImg(imgSrc);
										}}></img>
								);
							})}
					</div>
					<div className="w-full sm:w-[80%]">
						<img src={img} alt="" className="w-full h-auto"></img>
					</div>
				</div>
				{/* product info */}
				<div className="flex-1">
					<h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
					<div className="flex items-center gap-1 mt-2">
						<img src={assets.star_icon} className="w-3 5"></img>
						<img src={assets.star_icon} className="w-3 5"></img>
						<img src={assets.star_icon} className="w-3 5"></img>
						<img src={assets.star_icon} className="w-3 5"></img>
						<img src={assets.star_dull_icon} className="w-3 5"></img>
						<p className="pl-2">(122)</p>
					</div>
					<p className="mt-5 text-3xl font-medium">
						{currency}
						{productData.price}
					</p>
					<p className="mt-5 text-gray-500 md:w-4/5">
						{productData.description}
					</p>
					<div className="flex flex-col gap-4 my-8">
						<p>Select Size</p>
						<div className="flex gap-2">
							{productData.sizes &&
								productData.sizes.map((size, i) => {
									return (
										<button
											key={i}
											onClick={() => {
												setSizes(prev=>sizes.includes(size)?sizes.filter((s)=>s!==size):[...prev,size]);
											}}
											className={` 
												${
												sizes.includes(size) ? "bg-pink-300" : "bg-gray-100"
												} 
											cursor-pointer border py-2 px-4 `}>
											{size}
										</button>
									);
								})}
						</div>
					</div>
          <button onClick={() => {
						addToCart(productData._id, sizes);
          }} className="bg-black cursor-pointer text-white px-8 py-3 text-sm active:bg-gray-700">
						ADD TO CART
					</button>
					<hr className="mt-8 sm:w-4/5"></hr>
					<div className="text-gray-500">
						<p>100% Original product.</p>
						<p>Cash on delivery is available on this product.</p>
						<p>Easy return and exchange policy within 7 days.</p>
					</div>
				</div>
      </div>
      {/* description & reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
          <p>{productData.description}</p>
        </div>
      </div>

      {/* display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}></RelatedProducts>
		</div>
	) : <div className="opactiy"></div>;
};

export default Product;
