import React from "react";

const Homedis = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 z-0 object-cover w-full h-full"
      >
        <source src="/image/bgvid.mp4" type="video/mp4" />
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
          Your mental health companion powered by AI — track your mood, chat
          with our bot, and find peace.
        </p>
      </div>
    </div>
  );
};

export default Homedis;
