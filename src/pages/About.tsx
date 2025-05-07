import React, { useState } from "react";
import { FaCheck, FaChevronDown, FaChevronRight } from "react-icons/fa";
import about from "../imgs/about.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  { question: "Can anyone get a therapist to help the battle drug addiction?", answer: "Yes, Therapy Linker has the most  qualified therapist to help you fight drug addiction and lead you to sobriety" },
  { question: "Do I have to physically  vist Therapy Linker to get a therapist?", answer: "No, you can just identify the bet therapist you like and make an appointment with online." },
  { question: "Is making an appointment online cheaper or expensive?", answer: "With Therapy Linker it is much more cheaper to make an appointment online rather than having to physically  visit the therapist." },

  { question: "Is online therapy as effective as in-person counseling?", answer: "Research suggests that online therapy can be just as effective for many mental health concerns, depending on the individual's needs." },
  { question: "What types of counseling services are offered?", answer: "Services may include stress management, depression and anxiety therapy, relationship counseling, addiction support, and more." },
  { question: "Can I access therapy services from any location?", answer: "Availability depends on local regulations and therapist licensing, but most platforms offer nationwide or international services." },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center py-6 px-5">
      <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
      <p className="text-gray-500 mt-2 mb-4 text-center">Find answers to the most common questions</p>

      <div className="w-full max-w-3xl">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center bg-white p-4 shadow-md rounded-md text-left focus:outline-none"
            >
              <span className="text-gray-800">{faq.question}</span>
              {openIndex === index ? <FaChevronDown className="text-gray-500" /> : <FaChevronRight className="text-gray-500" />}
            </button>
            {openIndex === index && (
              <div className="bg-white shadow-md p-4 text-gray-600 rounded-md mt-1">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <section className="py-12 px-6 md:px-20 lg:px-32">
        {/* Section Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
          <div className="w-16 h-1 bg-teal-400 mx-auto mt-2"></div>
          <p className="text-gray-600 mt-3">
            We provide the best online therapy services to help you navigate life’s challenges.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-full md:w-1/2">
            <img src={about} alt="Building" className="rounded-lg shadow-lg w-full" />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="bg-teal-500 w-16 h-16 rounded-full flex items-center justify-center shadow-md hover:bg-teal-600 transition duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800">
              Providing Quality Therapy Services at Your Convenience
            </h3>
            <p className="text-gray-600 italic mt-3">
              Our goal is to connect you with the best professionals, ensuring personalized care and support.
            </p>

            {/* Bullet Points */}
            <ul className="mt-4 space-y-2 text-gray-700">
              {[
                "Professional and experienced therapists.",
                "Confidential and secure online sessions.",
                "Flexible scheduling to fit your lifestyle.",
                "Affordable pricing and various plans available.",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FaCheck className="text-teal-400 mt-1" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Extra Paragraph */}
            <p className="mt-3 text-gray-700">
              We prioritize your mental well-being and provide tools to help you achieve a balanced and healthy life.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      <Footer />
    </>
  );
};

export default About;
