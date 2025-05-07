import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <>
  <Navbar />
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Address Box */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <FaMapMarkerAlt className="text-cyan-400 text-4xl mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Address</h3>
            <p className="text-gray-500">A108 Adam Street, New York, NY 535022</p>
          </div>

          {/* Call Us Box */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <FaPhoneAlt className="text-cyan-400 text-4xl mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
            <p className="text-gray-500">+254718368520</p>
          </div>

          {/* Email Us Box */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center col-span-2 sm:col-span-1">
            <FaEnvelope className="text-cyan-400 text-4xl mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
            <p className="text-gray-500">therapylinker@example.com</p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="border p-3 rounded-md w-full" />
              <input type="email" placeholder="Your Email" className="border p-3 rounded-md w-full" />
            </div>
            <input type="text" placeholder="Subject" className="border p-3 rounded-md w-full" />
            <textarea placeholder="Message" rows={4} className="border p-3 rounded-md w-full"></textarea>
            <div className="flex justify-center">
  <button className="bg-teal-400 text-white font-semibold px-2 py-2 rounded-md w-50% text-center hover:bg-teal-500">
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
