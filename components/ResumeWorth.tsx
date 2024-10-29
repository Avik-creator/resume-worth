"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, Zap } from "lucide-react";
import { BiRupee } from "react-icons/bi";

interface ResumeWorthProps {
  resumeWorth: string;
}

export default function Component({ resumeWorth }: ResumeWorthProps = { resumeWorth: "" }) {
  const estimatedWorthMatch = resumeWorth.match(/<Estimated Worth>Rs\.(.+?)<\/Estimated Worth>/);
  const explanationMatch = resumeWorth.match(/<Explanation>([\s\S]*?)<\/Explanation>/);
  const improvementsMatch = resumeWorth.match(/<Improvements>([\s\S]*?)<\/Improvements>/);

  const estimatedWorth = estimatedWorthMatch ? estimatedWorthMatch[1] : "N/A";
  const explanation = explanationMatch ? explanationMatch[1] : "";
  const improvements = improvementsMatch ? improvementsMatch[1] : "";

  const explanationItems = explanation.match(/<li>(.+?)<\/li>/g);
  const improvementItems = improvements.match(/<li>(.+?)<\/li>/g);

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8 mx-auto max-w-4xl bg-gradient-to-br from-gray-900 to-black text-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
      <div className="text-center">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent items-center flex justify-center">
          <BiRupee className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-yellow-400" />
          {estimatedWorth}
        </div>
        <p className="text-base sm:text-lg md:text-xl text-gray-300">Estimated Resume Worth</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-800 text-white rounded-xl border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Key Factors
            </CardTitle>
            <CardDescription className="text-purple-200 text-sm sm:text-base">
              What contributes to your worth
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6">
            {explanationItems && (
              <ul className="space-y-2 sm:space-y-3">
                {explanationItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-gray-300">{item.replace(/<\/?li>/g, "")}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white rounded-xl border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-pink-600 to-red-600 rounded-t-xl">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Improvements
            </CardTitle>
            <CardDescription className="text-pink-200 text-sm sm:text-base">
              Boost your resume&apos;s value
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6">
            {improvementItems && (
              <ul className="space-y-2 sm:space-y-3">
                {improvementItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-sm sm:text-base text-gray-300">{item.replace(/<\/?li>/g, "")}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button
          asChild
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
        >
          <Link href="/">Analyze Another Resume</Link>
        </Button>
      </div>
    </div>
  );
}
