import React, { JSX } from "react";
import {
  FaHeartbeat,
  FaPills,
  FaUserMd,
  FaWheelchair,
  FaFlask,
  FaHospital,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { departmentsApi } from "../features/department/DepartmentAPI";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-16 h-16 border-4 border-gray-300 border-t-cyan-400 rounded-full animate-spin"></div>
  </div>
);

// Icon Mapping for Departments
const iconList: Record<string, JSX.Element> = {
  "Cardiology": <FaHeartbeat className="text-teal-500 text-4xl" />,
  "Pharmacy": <FaPills className="text-teal-500 text-4xl" />,
  "General Medicine": <FaUserMd className="text-teal-500 text-4xl" />,
  "Rehabilitation": <FaWheelchair className="text-teal-500 text-4xl" />,
  "Laboratory": <FaFlask className="text-teal-500 text-4xl" />,
  "Emergency": <FaHospital className="text-teal-500 text-4xl" />,
};

const Departments: React.FC = () => {
  // Fetch data from API
  const { data: departmentsData, error, isLoading } = departmentsApi.useGetDepartmentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Show loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Show error message if API fails
  if (error) {
    return <div className="text-center text-red-500 mt-20">Error Loading Departments</div>;
  }

  // Debug API response
  console.log("API Response:", departmentsData);

  // Ensure API data is valid
  const departments = Array.isArray(departmentsData) ? departmentsData : [];

  // Function to get a random icon
  const getRandomIcon = () => {
    const iconsArray = Object.values(iconList);
    return iconsArray[Math.floor(Math.random() * iconsArray.length)];
  };
  const handleClick = (departmentName : String) => {
    window.location.href = `/appointment/departments/${departmentName}`;
  };

  return (
    <>
      <Navbar />
      <section className="py-16 px-6 md:px-20 lg:px-32 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Departments</h2>
        <p className="text-gray-600 mt-2 mb-10">
          Our departments provide specialized services to meet various healthcare needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {departments.map((department, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              {/* Ensure correct property name */}
              <h3 className="text-xl font-semibold text-gray-800">
                {department.department_name || department.title || "Department"}
              </h3>

              {/* Assign icon based on department title */}
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                {iconList[department.department_name] || iconList[department.department_name] || getRandomIcon()}
              </div>

              <p className="text-gray-600 mt-2">{department.description || "No description available."}</p>
              <button  onClick={() => handleClick(department.department_name)} className="bg-blue-400 text-white font-medium px-4 py-3 mt-6 rounded-md hover:bg-blue-800 transition">
          Make Appointment
        </button>
            </div>
          ))}
           
        </div>

      
      </section>
      <Footer />
    </>
  );
};

export default Departments;
