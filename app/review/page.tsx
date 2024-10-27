"use client";

import Image from "next/image";
import ResumeAnalyzerApp from "@/components/ResumeAnalyzerApp";
import logo from "../logo.jpg";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[920px] mx-auto flex flex-col items-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-purple-400 rounded-full blur-2xl opacity-30"></div>
          <Image
            src={logo}
            alt="Resume Worth"
            width={120}
            height={120}
            className="rounded-full border-4 border-purple-300 shadow-lg relative z-10"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">Discover Your Resume&apos;s True Worth</h1>
        <p className="text-xl mb-8 text-center text-purple-200">
          Unlock your career potential with our AI-powered resume analysis
        </p>
        <div className="w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          <ResumeAnalyzerApp />
        </div>
        <p className="mt-12 text-center text-purple-200">
          Built with <Sparkles className="inline-block text-yellow-400 w-5 h-5" /> by{" "}
          <a
            href="https://twitter.com/avikm744"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline hover:text-yellow-300 transition-colors"
          >
            Avik Mukherjee
          </a>
        </p>
      </div>
    </main>
  );
}
