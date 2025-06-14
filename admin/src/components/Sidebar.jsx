import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
			<div className='w-[38%] md:w-[18%] min-h-screen border-r-1 border-gray-400'>
				<div className="flex flex-col gap-4 pt-6 pl-[10%] text-[15px]">
					<NavLink
						to="/add"
						className="flex items-center gap-4 border border-gray-300 border-r-0 px-3 py-2 rounded">
						<img src={assets.add_icon}></img>
						<p>Add Items</p>
					</NavLink>
					<NavLink
						to="/list"
						className="flex items-center gap-4 border border-gray-300 border-r-0 px-3 py-2 rounded">
						<img src={assets.order_icon} ></img>
						<p>List Items</p>
					</NavLink>
					<NavLink
						to="/orders"
						className="flex items-center gap-4 border border-gray-300 border-r-0 px-3 py-2 rounded">
						<img src={assets.order_icon}></img>
						<p>Orders</p>
					</NavLink>
				</div>
			</div>
		);
}

export default Sidebar