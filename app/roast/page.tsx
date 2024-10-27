"use client";

import RoastAnalyzer from "@/components/RoastAnalyzer";
import { Sparkles } from "lucide-react";

export default function RoastPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl backdrop-blur-sm bg-white/30 rounded-2xl shadow-lg p-8">
        <RoastAnalyzer />
      </div>
      <footer className="mt-8 text-center text-black">
        <p className="mt-12 text-purple-900">
          {" "}
          {/* Changed text color for visibility */}
          Built with <Sparkles className="inline-block text-black w-5 h-5" /> by{" "}
          <a
            href="https://twitter.com/avikm744"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-900 underline hover:text-blue-500 transition-colors"
          >
            Avik Mukherjee
          </a>
        </p>
      </footer>
    </div>
  );
}
