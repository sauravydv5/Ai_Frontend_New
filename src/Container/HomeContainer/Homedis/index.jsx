import React from "react";

const Homedis = () => {
  return (
    <div className="pt-[200px] relative overflow-hidden h-screen">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 z-0 object-cover w-screen h-screen"
      >
        <source src="/image/bgvid.mp4" type="video/mp4" />
      </video>
      Foreground Content
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          {/* Welcome to Homedis */}
        </h1>
        <p className="max-w-xl text-lg md:text-2xl">
          {/* Your mental health companion powered by AI — track your mood, chat
          with our bot, and find peace. */}
        </p>
      </div>
      {/* Optional overlay filter */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]" />
    </div>
  );
};

export default Homedis;
