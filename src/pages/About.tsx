import React from "react";
import { FaCheck } from "react-icons/fa";
import about from "../imgs/about.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <section className="py-12 px-4 sm:px-6 md:px-20 lg:px-32">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
          <div className="relative w-full md:w-1/2">
            <img src={about} alt="Doctors" className="rounded-lg shadow-lg w-full" />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition duration-300">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">About Us</h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">
              We provide the best online doctor consultation services to help you navigate life’s challenges.
            </p>
            <ul className="mt-4 space-y-3 text-gray-700">
              {["Professional and experienced doctors.", "Confidential and secure online sessions.", "Flexible scheduling.", "Affordable pricing."].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FaCheck className="text-blue-500 mt-1" />
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-blue-50 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[{ label: "Doctors", value: 15 }, { label: "Departments", value: 18 }, { label: "Research Labs", value: 12 }, { label: "Awards", value: 150 }].map((stat, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <div className="bg-blue-500 text-white w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full mx-auto mb-2 sm:mb-3">
                <span className="text-lg sm:text-xl font-bold">{stat.value}</span>
              </div>
              <p className="text-gray-700 font-semibold text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
