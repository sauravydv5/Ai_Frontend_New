import React from "react";
import { Brain, CalendarHeart, MessageCircleHeart } from "lucide-react";

const About = () => {
  return (
    <div className="text-gray-900 bg-white">
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-to-tr from-purple-800 via-indigo-700 to-cyan-600">
        <div className="max-w-5xl px-6 mx-auto text-center">
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight">
            Swathya
            <span
              className="ml-2 font-extrabold text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text animate-gradient-x"
              style={{ display: "inline-block" }}
            >
              Ai
            </span>
            : Redefining Healthcare with Smart AI
          </h1>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-white/90">
            Discover{" "}
            <strong className="relative inline-block underline decoration-yellow-300 decoration-4 underline-offset-4">
              Swathya
              <span className="font-extrabold text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text">
                Ai
              </span>
            </strong>{" "}
            — your trusted AI-powered health assistant. From precise symptom
            analysis to seamless appointment booking, we simplify your
            healthcare journey with intelligence and care.
          </p>
        </div>

        {/* Add this animation style in your global CSS or Tailwind config */}
        <style>
          {`
      @keyframes gradient-x {
        0%, 100% {
          background-position: 0% center;
        }
        50% {
          background-position: 100% center;
        }
      }
      .animate-gradient-x {
        background-size: 200% auto;
        animation: gradient-x 3s ease infinite;
      }
    `}
        </style>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="container px-6 mx-auto max-w-7xl md:flex md:items-center md:gap-12">
          <div className="md:w-1/2">
            <img
              src="/image/image.jpeg"
              alt="Healthcare Team"
              className="w-full shadow-2xl rounded-xl"
            />
          </div>
          <div className="mt-10 md:mt-0 md:w-1/2">
            <h2 className="mb-4 text-3xl font-extrabold text-indigo-700">
              Who We Are
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              SwathyaAi is a transformative healthcare platform using AI to
              empower patients and doctors with tools for diagnosis, mental
              health support, and efficient appointments.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Our vision is to build a healthy India by merging compassion with
              innovation — accessible, affordable, and AI-enhanced care.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl px-6 mx-auto text-center">
          <h2 className="mb-12 text-4xl font-bold text-gray-800">
            Key Features
          </h2>
          <div className="grid gap-10 md:grid-cols-3 sm:grid-cols-1">
            <div className="p-6 transition duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
              <Brain className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <h3 className="mb-2 text-xl font-semibold">AI Symptom Checker</h3>
              <p className="text-gray-600">
                Quickly get intelligent suggestions and possible conditions
                based on your symptoms.
              </p>
            </div>
            <div className="p-6 transition duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
              <MessageCircleHeart className="w-12 h-12 mx-auto mb-4 text-pink-600" />
              <h3 className="mb-2 text-xl font-semibold">
                Mental Health Chatbot
              </h3>
              <p className="text-gray-600">
                Talk to a friendly AI that understands emotional needs and
                offers mental wellness support.
              </p>
            </div>
            <div className="p-6 transition duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
              <CalendarHeart className="w-12 h-12 mx-auto mb-4 text-teal-600" />
              <h3 className="mb-2 text-xl font-semibold">
                Appointments & Diagnosis
              </h3>
              <p className="text-gray-600">
                Seamless doctor appointments with diagnosis reports,
                prescriptions, and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-white bg-gradient-to-r from-teal-600 via-emerald-500 to-green-400">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold">Join SwathyaAi Today</h2>
          <p className="mb-6 text-lg text-white/90">
            Whether you're a patient or a doctor, let's build a healthier
            tomorrow together.
          </p>
          <a
            href="/patientregister"
            className="inline-block px-8 py-3 text-lg font-semibold text-teal-700 transition bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
