import productModel from "../models/productModel.js"
import { v2 as cloudinary } from 'cloudinary';
// add
const addProduct = async (req, res) => {
    
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestSeller,
        } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        
    
        const images = [image1, image2, image3, image4].filter((img)=>img!== undefined);
        
        const imagesUrl = await Promise.all(images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
            return result.secure_url;
        }));
        
        const productData = {
            name,
            description,
					price:Number(price),
					category,
					subCategory,
					sizes:JSON.parse(sizes),
					date:Date.now(),
            bestSeller: bestSeller == "true" ? true : false,
                    image:imagesUrl
				};
    
        const product = new productModel(productData);
        await product.save();
			return res.json({ success: true, message:"product added"});
    } catch (error) {
        
			return res.json({ success: false, message: error.message });
		}
}


// remove
const removeProduct =async (req,res) => {
    try {
      
        await productModel.findByIdAndDelete(req.body.id);
			return res.json({ success: true, message:"product deleted" });
		} catch (error) {
			return res.json({ success: false, message: "404 Not Found" });
		}
}
// get product by  id
const singleProduct =async (req,res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById({ productId });
        return res.json({ success: true, product });
    }
    catch(error) {
        return res.json({ success: false, message: "404 Not Found" });
    }
}

// get all product

const listProduct = async (req, res) => {
    try {
    
        const products = await productModel.find({});
        return res.json({ success: true, products });
    } catch (error) {
        return res.json({success:false,message:"404 Not Found"})
    }
}

export {listProduct,addProduct,removeProduct,singleProduct}