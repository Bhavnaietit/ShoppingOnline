import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Navbar = () => {
	const [visible, setVisible] = useState(false);
	const [userPage, setUserPage] = useState(false);
	const {
		setShowSearch,
		showSearch,
		getCartCount,
		navigate,
		setToken,
		token,
		setCartItems,
	} = useContext(ShopContext);
	const logOut = () => {
		setToken('');
		toast.success('You are logout');
		localStorage.removeItem('token');
		setCartItems({});
		navigate("/login");
	}
	
	return (
		<div className="flex items-center justify-between py-5 font-medium">
			<Link to="/">
				{" "}
				<img src={assets.logo} alt="" className="w-36"></img>
			</Link>
			<ul className="hidden sm:flex gap-5 text-sm text-gray-700">
				<NavLink to={"/"} className="flex flex-col items-center gap-1">
					<p>HOME</p>
					<hr className=" hidden w-2/4 border-none h-[1.5px] bg-gray-700"></hr>
				</NavLink>
				<NavLink
					to={"/collection"}
					className="flex flex-col items-center gap-1">
					<p>COLLECTION</p>
					<hr className=" hidden w-2/4 border-none h-[1.5px] bg-gray-700"></hr>
				</NavLink>
				<NavLink to={"/about"} className="flex flex-col items-center gap-1">
					<p>ABOUT</p>
					<hr className=" hidden w-2/4 border-none h-[1.5px] bg-gray-700"></hr>
				</NavLink>
				<NavLink to={"/contact"} className="flex flex-col items-center gap-1">
					<p>CONTACT</p>
					<hr className=" hidden w-2/4 border-none h-[1.5px] bg-gray-700"></hr>
				</NavLink>
			</ul>
			<div className="flex items-center gap-6">
				<img
					src={assets.search_icon}
					className="w-5 cursor-pointer"
					alt="search"
					onClick={() => {
						setShowSearch(true);
					}}></img>
				<div className="gorup relative">
					<Link to="/login">
						<img
							className="w-5 cursor-pointer"
							src={assets.profile_icon}
							onClick={() => {
								{
									!token && navigate("/login");
								}
								setUserPage(!userPage);
							}}
							alt=""></img>
					</Link>
					{token && (
						<div
							className={`group-hover:block 
							${userPage == false && "hidden"}
					absolute dropdown-menu right-0 pt-4`}>
							<div className="flex flex-col gap-2 w-36 py-3 px-5 text-gray-500  bg-slate-100">
								<p className="cursor-pointer hover:text-black">My Profile</p>
								<Link to="/orders">
									<p className="cursor-pointer hover:text-black">Orders</p>
								</Link>
								<p
									onClick={() => logOut()}
									className="cursor-pointer hover:text-black">
									Logout
								</p>
							</div>
						</div>
					)}
				</div>

				<Link to="/cart" className="relative">
					<img src={assets.cart_icon} alt="" className="w-5 min-w-5"></img>
					<p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full aspect-square text-[8px]">
						{getCartCount()}
					</p>
				</Link>
				<img
					src={assets.menu_icon}
					alt=""
					onClick={() => {
						setVisible(true);
					}}
					className="w-5 cursor-pointer sm:hidden"></img>
			</div>
			{/* sidebar for small screen */}
			<div
				className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
					visible ? "w-full" : "w-0"
				}`}>
				<div className="flex flex-col text-gray-600">
					<div
						onClick={() => {
							setVisible(false);
						}}
						className="flex  gap-4 p-3 cursor-pointer items-center ">
						<img src={assets.dropdown_icon} className=" rotate-180 h-4"></img>
						<p>Back</p>
					</div>
					<NavLink
						onClick={() => {
							setVisible(false);
						}}
						className="py-2 pl-6 border"
						to="/">
						HOME
					</NavLink>
					<NavLink
						onClick={() => {
							setVisible(false);
						}}
						className="py-2 pl-6 border"
						to="/collection">
						COLLECTION
					</NavLink>
					<NavLink
						onClick={() => {
							setVisible(false);
						}}
						className="py-2 pl-6 border"
						to="/about">
						ABOUT
					</NavLink>
					<NavLink
						onClick={() => {
							setVisible(false);
						}}
						className="py-2 pl-6 border"
						to="/contact">
						CONTACT
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
