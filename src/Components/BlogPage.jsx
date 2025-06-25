import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";

const blogPosts = [
  {
    id: 1,
    title: "5 Simple Habits for Better Mental Health",
    description:
      "Discover small daily habits that can significantly improve your mental well-being.",
    image: "/src/assets/blog1.jpeg",
    date: "June 22, 2025",
    tag: "Mental Health",
  },
  {
    id: 2,
    title: "How to Recognize Symptoms Early",
    description: "Learn how early detection can prevent serious health issues.",
    image: "/src/assets/blog2.png",
    date: "June 20, 2025",
    tag: "Symptoms",
  },
  {
    id: 3,
    title: "The Role of AI in Modern Healthcare",
    description:
      "Explore how artificial intelligence is revolutionizing diagnostics and patient care.",
    image: "/src/assets/blog3.jpeg",
    date: "June 18, 2025",
    tag: "AI",
  },
  {
    id: 4,
    title: "Understanding Seasonal Diseases",
    description:
      "Tips and insights on avoiding common illnesses during seasonal changes.",
    image: "/src/assets/blog4.jpeg",
    date: "June 15, 2025",
    tag: "General Health",
  },
  {
    id: 5,
    title: "Nutrition Myths Busted: What’s Actually Healthy?",
    description:
      "From carbs to fats — learn the truth about popular nutrition myths and what your body really needs.",
    image: "/src/assets/blog5.jpeg",
    date: "June 10, 2025",
    tag: "Nutrition",
  },
  {
    id: 6,
    title: "Telemedicine: The Future of Doctor Visits",
    description:
      "Explore how virtual consultations are transforming access to healthcare — especially in remote areas.",
    image: "/src/assets/blog6.jpeg",
    date: "June 5, 2025",
    tag: "Telemedicine",
  },
];

const tipOfTheDay =
  "Drink at least 8 glasses of water daily to keep your body hydrated and healthy.";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredBlogs = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Swāthya AI
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
              className="text-gray-700 hover:underline dark:text-gray-200"
            >
              About
            </button>
            <button
              onClick={() => navigate("/blogpage")}
              className="font-semibold text-blue-700 hover:underline dark:text-blue-300"
            >
              Blog
            </button>
          </nav>
        </div>
      </motion.div>

      {/* Main Blog Content */}
      <div className="p-6 mx-auto max-w-7xl">
        <h1 className="mb-6 text-4xl font-bold text-center text-blue-700">
          Health & Wellness Blog
        </h1>

        {/* Tip of the Day */}
        <div className="p-4 mb-6 text-center text-blue-900 rounded-lg shadow-md bg-blue-50">
          <p className="text-lg font-semibold">💡 Expert Tip of the Day</p>
          <p>{tipOfTheDay}</p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search blog posts..."
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((post) => (
            <div
              key={post.id}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
            >
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-48"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <p className="mb-2 text-sm text-gray-500">
                  {post.date} • {post.tag}
                </p>
                <p className="mb-3 text-gray-700">{post.description}</p>
                <button className="font-medium text-blue-600 hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <p className="mt-10 text-center text-gray-500">
            No blog posts found.
          </p>
        )}

        {/* Health Facts */}
        <div className="p-4 mt-10 rounded-lg shadow bg-green-50">
          <h3 className="mb-2 text-lg font-semibold text-green-700">
            📊 Did You Know?
          </h3>
          <ul className="pl-6 text-sm text-gray-700 list-disc">
            <li>
              1 in 4 people will be affected by mental disorders at some point
              in their lives.
            </li>
            <li>Regular 30-minute walks reduce heart disease risk by 19%.</li>
          </ul>
        </div>

        {/* Testimonial */}
        <div className="p-6 mt-10 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-xl font-semibold text-center">
            💬 What Our Users Say
          </h3>
          <p className="italic text-center text-gray-600">
            “This app helped me recognize symptoms early and book a doctor
            instantly — highly recommended!”
          </p>
          <p className="mt-2 font-semibold text-right text-gray-700">
            – Anjali Verma, Bihar
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className="p-6 mt-10 text-center rounded-lg shadow bg-yellow-50">
          <h3 className="mb-2 text-xl font-semibold text-yellow-800">
            📥 Subscribe for Weekly Health Tips
          </h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-64 p-2 border border-gray-300 rounded focus:outline-none"
          />
          <button className="px-4 py-2 ml-2 text-white bg-yellow-600 rounded hover:bg-yellow-700">
            Subscribe
          </button>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </motion.div>
  );
};

export default BlogPage;
