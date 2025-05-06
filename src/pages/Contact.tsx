import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side: Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 text-white p-4 rounded-full">
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Location</h3>
                <p className="text-gray-500">A108 Adam Street, New York, NY 535022</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 text-white p-4 rounded-full">
                <FaPhoneAlt className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Call Us</h3>
                <p className="text-gray-500">+1 5589 55488 55</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 text-white p-4 rounded-full">
                <FaEnvelope className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Email Us</h3>
                <p className="text-gray-500">info@example.com</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="border p-3 rounded-md w-full" />
                <input type="email" placeholder="Your Email" className="border p-3 rounded-md w-full" />
              </div>
              <input type="text" placeholder="Subject" className="border p-3 rounded-md w-full" />
              <textarea placeholder="Message" rows={4} className="border p-3 rounded-md w-full"></textarea>
              <div className="flex justify-center">
                <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
