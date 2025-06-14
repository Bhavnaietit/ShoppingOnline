import React, { useState } from 'react'
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
			if (response.data.success) {
				toast.success("You are now Admin !")
				setToken(response.data.token);
			} else {
				toast.error(response.data.message);
			}
        }
		catch (error) {
			if (!error.response) {
				console.log("network error");
				return;
			}
			console.log(error);
			toast.error(error.message);
        }
    }
  return (
		<div className="flex justify-center min-h-screen items-center">
			<div className="bg-white shadow-md  rounded-lg px-8 py-6 max-w-md ">
				<h1 className="font-bold text-2xl mb-3 text-center">Admin Panel</h1>
				<form className="flex justify-center flex-col items-center" onSubmit={onSubmitHandler}>
					<div className="mb-3 min-w-72">
						<label htmlFor="email" className="font-medium text-gray-800 mb-2">
							Email:
						</label>
						<input
							type="text"
							onChange={(e) => {
								setEmail(e.target.value);
                          }}
                          value={email}
							placeholder="Enter your email"
							id="email"
							name="email"
							className="p-2 rounded w-full border border-gray-300 outline-none"></input>
					</div>
					<div className="mb-3 min-w-72">
						<label htmlFor="password" className="font-medium text-gray-800 mb-2">
							Password:
						</label>
						<input
							type="password"
							onChange={(e) => {
								setPassword(e.target.value);
                          }}
                          value={password}
							placeholder="password"
							id="password"
							name="password"
							className="p-2 rounded w-full border border-gray-300 outline-none"></input>
					</div>
					<button
						type="submit"
						className="bg-black text-white rounded px-4 py-3 text-center cursor-pointer w-full">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login