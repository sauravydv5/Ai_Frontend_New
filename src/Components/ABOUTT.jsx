import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaRobot,
  FaUserMd,
  FaCalendarCheck,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-cyan-50 to-white">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center"
      >
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-md">
          About Our AI Healthcare Assistant
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-600">
          Revolutionizing healthcare through AI-powered diagnostics, symptom
          tracking, and intelligent doctor-patient collaboration.
        </p>
      </motion.div>

      <div className="grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
        {/* Feature Cards with Tilt & Animation */}
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.25}
              scale={1.02}
              transitionSpeed={1500}
              className="p-6 transition-all duration-300 border border-gray-200 shadow-xl bg-white/70 rounded-2xl backdrop-blur-lg hover:shadow-2xl hover:scale-105"
            >
              <div className="mb-3 text-4xl text-blue-600">{card.icon}</div>
              <h3 className="mb-2 text-2xl font-semibold">{card.title}</h3>
              <p className="text-gray-600 text-md">{card.description}</p>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl mt-16"
      >
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-700">
          Tech Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "React",
            "Node.js",
            "MongoDB",
            "Express",
            "Tailwind",
            "JWT",
            "Framer Motion",
            "Infermedica API",
          ].map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 text-sm font-medium transition-all duration-200 bg-blue-100 rounded-full shadow hover:bg-blue-200"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold text-blue-600">Let's Connect</h2>
        <p className="text-lg text-gray-700">
          Email us at:{" "}
          <a
            href="mailto:contact@aihealthcare.com"
            className="text-blue-500 underline"
          >
            contact@aihealthcare.com
          </a>
        </p>
      </motion.div>
    </div>
  );
};

const cardData = [
  {
    icon: <FaRobot />,
    title: "AI-Powered Symptom Checker",
    description:
      "Leverages Infermedica API to suggest possible conditions based on user inputs.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Appointment Booking",
    description:
      "Schedule doctor visits seamlessly with real-time availability and confirmations.",
  },
  {
    icon: <FaUserMd />,
    title: "Doctor Dashboard",
    description:
      "Secure panel for diagnosis, prescriptions, and managing accepted appointments.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Personal Health Insights",
    description:
      "Track mood, health history, and emergency data with personalized reports.",
  },
];

export default About;
