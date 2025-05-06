import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTimes } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm pt-10 pb-6 px-6 md:px-20 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Medilab</h2>
          <p className="mt-2">A108 Adam Street</p>
          <p>New York, NY 535022</p>
          <p className="mt-2 font-semibold">
            Phone: <span className="font-normal">+1 5589 55488 55</span>
          </p>
          <p className="font-semibold">
            Email: <span className="font-normal">info@example.com</span>
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-3 mt-4">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-teal-400 hover:text-white transition">
              <FaTimes />
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-teal-400 hover:text-white transition">
              <FaFacebookF />
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-teal-400 hover:text-white transition">
              <FaInstagram />
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-teal-400 hover:text-white transition">
              <FaLinkedinIn />
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Useful Links</h3>
          <ul className="mt-2 space-y-1">
            {["Home", "About us", "Services", "Terms of service", "Privacy policy"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-400 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Our Services</h3>
          <ul className="mt-2 space-y-1">
            {["Web Design", "Web Development", "Product Management", "Marketing", "Graphic Design"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-400 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Random Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Hic solutastep</h3>
          <ul className="mt-2 space-y-1">
            {["Molestiae accusamus iure", "Excepturi dignissimos", "Suscipit distinctio", "Dilecta", "Sit quas consectetur"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-teal-400 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-600 mt-10 border-t border-gray-300 pt-5">
        <p>© Copyright <strong className="text-gray-800">Medilab</strong>. All Rights Reserved</p>
        <p>
          Designed by <a href="#" className="text-blue-600 hover:underline">Kimathi Brian</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
