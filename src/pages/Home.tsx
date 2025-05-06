import hero1 from "../imgs/hero-carousel-1.jpg";
import { FaHeartbeat, FaCapsules, FaSyringe, FaDna } from "react-icons/fa"; // Import icons
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // Move useNavigate outside to be used in handleClick

  // Card data array
  const features = [
    { id: 1, icon: <FaHeartbeat />, title: "Stress Management", text: "Provides you with the necessary resources and qualified personnel to help you deal with stress management." },
    { id: 2, icon: <FaCapsules />, title: "Social Life", text: "Qualified counsellors to guide you on the way to cope with social life and expectations." },
    { id: 3, icon: <FaSyringe />, title: "Drug and Substance Abuse", text: "Connects you to the best therapist to help you battle hard drugs and substance abuse." },
    { id: 4, icon: <FaDna />, title: "Psychological Support", text: "Keeps you connected with the best counselling services to help you deal with anxiety." },
  ];

  // Fix handleClick function
  const handleClick = () => {
    navigate("/about"); // Navigate to the about page
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen overflow-hidden flex flex-col"> 
        {/* Background Image */}
        <img src={hero1} alt="hero" className="w-full h-full object-cover" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end items-center pb-[50px] px-4">
          
          {/* White Semi-transparent Box */}
          <div className="bg-white bg-opacity-70 rounded-md shadow-md p-6 md:p-8 max-w-3xl border-t-4 border-cyan-400 w-[90%] md:w-auto text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Welcome to Therapy Linker</h1>
            <p className="text-gray-700 text-sm md:text-base mt-3">
              The fastest and best online therapy platform that connects you to a therapist from the comfort of your home or workplace.
            </p>
            
            {/* Fixed Button */}
            <button 
              onClick={handleClick} 
              className="mt-6 bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2 px-5 rounded-md transition duration-300 cursor-pointer"
            >
              Read More
            </button>
          </div>

          {/* Features Cards Section */}
          <div className="mt-5 px-5 w-full flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl">
              {features.map((feature) => (
                <div 
                  key={feature.id} 
                  className="bg-white shadow-md rounded-md p-6 text-center cursor-pointer transition duration-300 group hover:bg-teal-400 hover:text-white"
                >  
                  <div className="text-teal-400 text-3xl mx-auto mb-2 transition duration-300 group-hover:text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 transition duration-300 group-hover:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 transition duration-300 group-hover:text-white">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
