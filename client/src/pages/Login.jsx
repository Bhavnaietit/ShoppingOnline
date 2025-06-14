import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Login = () => {
  const [currState, setCurrentState] = useState('Login');
 const { navigate, token, setToken, backendUrl } = useContext(ShopContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const handleSubmit =async(e) => {
		e.preventDefault();
		console.log("submit");
	  try {
		  if (currState === 'SignUp') {
			  const response = await axios.post(backendUrl + '/api/user/register', { name,email,password });
			  if (response.data.success) {
				  toast.success("You have an account");
				  setToken(response.data.token);
				  localStorage.setItem('token', response.data.token);
			  } else {
				  toast.error(response.data.message);
			  }
			//  login
		  } else {
			  const response = await axios.post(backendUrl + "/api/user/login", { email,password });
			  if (response.data.success) {
				  toast.success("You are login");
				  setToken(response.data.token)
				  localStorage.setItem("token", response.data.token);
				} else {
					toast.error(response.data.message);
				}
		
	   }
	  }
	  catch (error) {
		toast.error(response.error.message);
	  }
	}
	useEffect(() => {
		if (token) {
			navigate('/')
		}
	},[token])
  return (
		<form
			className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
		  onSubmit={handleSubmit}>
			<div className="inline-flex items-center gap-2mb-2 mt-10">
				<p className="prata-regular text-3xl">{currState}</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800"></hr>
			</div>

			{currState === "SignUp" && (
				<input
					onChange={(e) => {
						setName(e.target.value);
					}}
					value={name}
				  type="text"
				  placeholder='Name'
					className="w-full px-3 py-2 border border-gray-800"></input>
			)}
			<input
				onChange={(e) => {
					setEmail(e.target.value);
				}}
				value={email}
				type="email"
				placeholder="Email"
				className="w-full px-3 py-2 border border-gray-800"></input>
			<input
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				value={password}
				type="password"
				placeholder="Password"
				className="w-full px-3 py-2 border border-gray-800"></input>

			<div className="w-full flex justify-between text-sm">
				<p className="text-blue-700">forgot your password?</p>
				<p
					onClick={() => {
						if (currState === "Login") {
							setCurrentState("SignUp");
							return;
						}
						setCurrentState("Login");
					}}
					className="text-blue-900">
					{currState === "Login" ? "Create Account" : "Login here"}
				</p>
			</div>
			<input
				type="submit"
				value={currState == "Login" ? "Login in" : "Sign Up"}
				className="px-15 py-2 border rounded-4xl border-gray-800 text-black hover:bg-black hover:text-white cursor-pointer"></input>
		</form>
	);
}

export default Login