import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
	  <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
		  <ToastContainer></ToastContainer>
		  <Navbar></Navbar>
		  <SearchBar></SearchBar>
			<Routes>
				<Route path="/" element={<Home></Home>}></Route>
				<Route path="/collection" element={<Collections></Collections>}></Route>
				<Route path="/about" element={<About></About>}></Route>
				<Route path="/contact" element={<Contact></Contact>}></Route>{" "}
				<Route path="/login" element={<Login></Login>}></Route>{" "}
				<Route path="/orders" element={<Orders></Orders>}></Route>{" "}
				<Route path="/place-order" element={<PlaceOrder></PlaceOrder>}></Route>{" "}
				<Route path="/product/:productId" element={<Product></Product>}></Route>{" "}
				<Route path="/cart" element={<Cart></Cart>}></Route>
			</Routes>
			<Footer></Footer>
		</div>
	);
}

export default App