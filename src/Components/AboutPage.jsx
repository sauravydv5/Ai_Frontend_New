import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";

const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ rotateY: -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen text-gray-800 bg-white dark:bg-gray-900 dark:text-white"
    >
      {/* Navbar */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full bg-gray-100 shadow-md dark:bg-gray-800"
      >
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
          <h1
            onClick={() => navigate("/")}
            className="text-xl font-bold text-blue-600 cursor-pointer"
          >
            Swathya Ai
          </h1>
          <nav className="space-x-4 text-sm sm:text-base">
            <button
              onClick={() => navigate("/")}
              className="text-gray-700 hover:underline dark:text-gray-200"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/aboutpage")}
              className="font-semibold text-blue-700 hover:underline dark:text-blue-300"
            >
              About
            </button>
            <button
              onClick={() => navigate("/blogpage")}
              className="text-gray-700 hover:underline dark:text-gray-200"
            >
              Blog
            </button>
          </nav>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ staggerChildren: 0.3 }}
        className="flex justify-center px-4 py-10"
      >
        <div className="w-full max-w-4xl space-y-12 text-center">
          {/* Header */}
          <motion.header variants={sectionVariants}>
            <h1 className="mb-4 text-4xl font-bold text-blue-600">
              AI-Based Personal Healthcare Assistant
            </h1>
            <p className="text-lg">
              Empowering patients and doctors with real-time AI assistance,
              symptom analysis, and seamless digital healthcare experiences.
            </p>
          </motion.header>

          {/* Sections with Motion */}
          {[
            {
              title: "🎯 Our Mission",
              content:
                "To revolutionize healthcare through intelligent automation, personalized insights, and secure digital interactions that make access to care easier and smarter.",
            },
            {
              title: "❓ Why This Project Matters",
              content:
                "Healthcare in many areas remains inaccessible, inefficient, or intimidating. This project bridges the gap using AI-driven tools that offer instant guidance and promote better health decisions.",
            },
          ].map((section, index) => (
            <motion.section key={index} variants={sectionVariants}>
              <h2 className="mb-2 text-2xl font-semibold">{section.title}</h2>
              <p>{section.content}</p>
            </motion.section>
          ))}

          {/* Features */}
          <motion.section variants={sectionVariants}>
            <h2 className="mb-4 text-2xl font-semibold">💡 Key Features</h2>
            <ul className="max-w-lg mx-auto space-y-2 text-left list-disc list-inside">
              <li>
                <strong>AI Chatbot:</strong> Instant health suggestions
              </li>
              <li>
                <strong>Symptom Checker:</strong> Disease prediction
              </li>
              <li>
                <strong>Doctor Panel:</strong> Manage appointments
              </li>
              <li>
                <strong>Patient Panel:</strong> Track bookings and mood
              </li>
              <li>
                <strong>Secure Auth:</strong> JWT-based access control
              </li>
            </ul>
          </motion.section>

          {/* Tech Stack */}
          <motion.section variants={sectionVariants}>
            <h2 className="mb-4 text-2xl font-semibold">🧠 Tech Stack</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Frontend", "React.js, Tailwind CSS, Chart.js"],
                ["Backend", "Node.js, Express, Python, MongoDB"],
                ["AI/ML", "Random Forest, NLP, Infermedica API"],
                ["Security", "JWT Token, Role-Based Access"],
              ].map(([title, desc], i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-100 rounded dark:bg-gray-800"
                >
                  <h3 className="font-semibold">{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Users */}
          <motion.section variants={sectionVariants}>
            <h2 className="mb-2 text-2xl font-semibold">👥 Who Can Use It?</h2>
            <ul className="max-w-lg mx-auto text-left list-disc list-inside">
              <li>
                <strong>Patients:</strong> For symptom analysis and bookings
              </li>
              <li>
                <strong>Doctors:</strong> Manage appointments and prescribe
              </li>
              <li>
                <strong>Institutions:</strong> For health digitalization
              </li>
            </ul>
          </motion.section>

          {/* CTA */}
          <motion.section variants={sectionVariants} className="text-center">
            <h2 className="mb-2 text-2xl font-bold">🚀 Get Started Today</h2>
            <p className="mb-4">
              Join our mission to make healthcare smarter and simpler.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
            >
              Join Now
            </button>
          </motion.section>
        </div>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default AboutPage;
