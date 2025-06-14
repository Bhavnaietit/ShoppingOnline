

import express from 'express'

import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const port = 4000;
const app = express();
connectDB();
app.use(cors())
connectCloudinary();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/', (req, res) => {
    res.send('hello');
});


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
    console.log("server running",port)
})
