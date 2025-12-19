"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TemplateNotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent quicksand-bold">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 quicksand-bold">
            Template Not Found
          </h2>
          <p className="text-lg text-gray-300 mb-8 quicksand-light">
            Sorry, the template you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/templates"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl quicksand-semibold"
          >
            Browse All Templates
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
