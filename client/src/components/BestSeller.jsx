import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
	const { products } = useContext(ShopContext);
	
    const [bestSeller, setBestSeller] = useState([]);
    useEffect(() => {
        console.log(products)
        const bestProduct = products.filter((item) =>item.bestSeller);
        setBestSeller(bestProduct);
    },[products]);

  return (
		<div className="my-10">
			<div className="text-center text-3xl py-8">
				<Title text1={"BEST"} text2={"SELLERS"}></Title>
			</div>
			<p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
				Lucy Stanbridge has inherited her father's publishing house, but the
				ambitious would-be editor has nearly sunk it with failing titles. She
				discovers she is owed a book by Harris Shaw, a reclusive
			</p>

			{/* Rendering Products */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
			  {bestSeller.map((product, i) => {
					
					return (
						<ProductItem
							key={i}
							id={product._id}
							name={product.name}
							image={product.image}
							price={product.price}></ProductItem>
					);
				})}
			</div>
		</div>
	);
}

export default BestSeller