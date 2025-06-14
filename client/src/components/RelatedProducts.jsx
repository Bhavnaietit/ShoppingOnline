import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const RelatedProducts = ({category,subCategory}) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products) {
            let productCopy = products.slice();
            productCopy = productCopy.filter((product) => category === product.category);
            productCopy = productCopy.filter(
                (product) => subCategory === product.subCategory  
            );
            setRelated(productCopy.slice(0,5));
       } 
    }, [category,subCategory]);
    
    return (
			related && (
            <div className="my-24">
                <div className='text-center text-3xl py-2'>
                    <Title text1={'RELATED'} text2={'PRODUCTS'}></Title>
                </div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
						{related.map((product, i) => {
							return (
								<ProductItem
									key={i}
									id={product._id}
									name={product.name}
									price={product.price}
									image={product.image}></ProductItem>
							);
						})}
					</div>
				</div>
			)
		);
}

export default RelatedProducts