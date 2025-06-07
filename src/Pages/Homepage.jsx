import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import About from "../Components/About";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 z-0 object-cover w-full h-full"
        >
          <source src="/image/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional Overlay */}
        <div className="absolute top-0 left-0 z-10 w-full h-full bg-black bg-opacity-50" />

        {/* Foreground Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Welcome to SwathyaAI
          </h1>
          <p className="max-w-2xl text-lg md:text-xl lg:text-2xl">
            Your Presonal health companion powered by AI — track your mood, chat
            with our bot, and find peace.
          </p>
          <button className="px-4 py-3 mt-8 text-sm text-white transition duration-300 ease-in-out border border-transparent rounded-full bg-blue-950 sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg hover:bg-blue-900">
            Make an Appointment
          </button>
        </div>
      </div>
      <About />
      <Footer />
    </>
  );
};

export default Homepage;
