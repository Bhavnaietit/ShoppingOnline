import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import BestSeller from './BestSeller';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    useEffect(() => {
        setLatestProducts(products.slice(0,10));
    },[]);
  return (
		<div className="my-10">
			<div className="text-center py-8 text-3xl">
				<Title text1={"LATEST"} text2={"COLLECTIONS"}></Title>
				<p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
					Lucy Stanbridge has inherited her father's publishing house, but the
					ambitious would-be editor has nearly sunk it with failing titles. She
					discovers she is owed a book by Harris Shaw, a reclusive
				</p>
			</div>
			{/* Rendering Products */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
				{latestProducts.map((product,i) => {
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

export default LatestCollection