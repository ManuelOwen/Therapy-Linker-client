import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">Therapy Linker</div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Nav Links */}
        <ul
          className={`md:flex md:items-center absolute md:static left-0 w-full md:w-auto bg-white md:bg-transparent z-10 transition-all duration-300 ease-in ${
            isOpen ? "top-14 opacity-100" : "-top-96 opacity-0 md:opacity-100"
          } md:opacity-100 md:flex-row flex-col md:space-x-6 space-y-4 md:space-y-0 text-center md:text-left`}
        >
          {["Home", "About", "Department", "Doctors", "Contact"].map((item) => (
            <li key={item} className="cursor-pointer text-lg hover:text-cyan-400 transition">
              <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                {item}
              </Link>
            </li>
          ))}

          {/* Dashboard with Clickable Dropdown */}
          <li className="relative cursor-pointer text-lg hover:text-cyan-400 transition">
            <button
              className="focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Dashboard
            </button>
            {dropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>My Profile</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/mybookings" onClick={() => setDropdownOpen(false)}>My Appointments</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/allappointments" onClick={() => setDropdownOpen(false)}>All Appointments</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/allusers" onClick={() => setDropdownOpen(false)}>All Users</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/alldepartments" onClick={() => setDropdownOpen(false)}>All Departments</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/alldoctors" onClick={() => setDropdownOpen(false)}>All Doctors</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
