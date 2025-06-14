import React from "react";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { assets } from "../assets/assets";
const About = () => {
	return (
		<div>
			<div>
				<Title text1={"ABOUT"} text2={"US"}></Title>
			</div>

			<div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
				<img className="w-full md:max-w-[480px]" src={assets.about_img}></img>
				<div className="flex flex-col justify-center items-start gap-6">
					<p>Learn more about our teams and job openings.</p>
					<p>Learn more about our teams and job openings.</p>
					<p>Learn more about our teams and job openings.</p>
					<p className="font-semibold text-xl text-gray-600">Our Store</p>
					<p className="text-gray-500">
						Learn more about our teams and job openings.
					</p>
					<button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
						Explore More
					</button>
				</div>
			</div>

			<div className="text-xl py-4">
				<Title text1={"WHY"} text2={"CHOOSE US"}></Title>
			</div>
			<div className="flex flex-col md:flex-row text-sm mb-20 border-collapse">
				<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
					<b>Quality Assurance:</b>
					<p className="text-gray-600">
						We meticulously select and vet each product to
					</p>
				</div>
				<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-">
					<b>Quality Assurance:</b>
					<p className="text-gray-600">
						We meticulously select and vet each product to
					</p>
				</div>
				<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
					<b>Quality Assurance:</b>
					<p className="text-gray-600">
						We meticulously select and vet each product to
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
