import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowUpRight, DollarSign, TrendingUp, Zap } from "lucide-react";
import { BiRupee } from "react-icons/bi";

interface ResumeWorthProps {
  resumeWorth: string;
}

const ResumeWorth: React.FC<ResumeWorthProps> = ({ resumeWorth }) => {
  const estimatedWorthMatch = resumeWorth.match(/<Estimated Worth>Rs\.(.+?)<\/Estimated Worth>/);
  const explanationMatch = resumeWorth.match(/<Explanation>([\s\S]*?)<\/Explanation>/);
  const improvementsMatch = resumeWorth.match(/<Improvements>([\s\S]*?)<\/Improvements>/);

  const estimatedWorth = estimatedWorthMatch ? estimatedWorthMatch[1] : "N/A";
  const explanation = explanationMatch ? explanationMatch[1] : "";
  const improvements = improvementsMatch ? improvementsMatch[1] : "";

  const explanationItems = explanation.match(/<li>(.+?)<\/li>/g);
  const improvementItems = improvements.match(/<li>(.+?)<\/li>/g);

  return (
    <div className="space-y-8 p-8 mx-auto max-w-4xl bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-2xl">
      <div className="text-center">
        <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent inline-flex items-center">
          <BiRupee className="w-12 h-12 mr-2" />₹{estimatedWorth}
        </div>
        <p className="text-xl text-gray-300">Estimated Resume Worth</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-gray-800 text-white rounded-xl border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl">
            <CardTitle className="text-2xl font-bold flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              Key Factors
            </CardTitle>
            <CardDescription className="text-purple-200">What contributes to your worth</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {explanationItems && (
              <ul className="space-y-3">
                {explanationItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowUpRight className="w-5 h-5 mr-2 text-green-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{item.replace(/<\/?li>/g, "")}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white rounded-xl border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-pink-600 to-red-600 rounded-t-xl">
            <CardTitle className="text-2xl font-bold flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              Improvements
            </CardTitle>
            <CardDescription className="text-pink-200">Boost your resume&apos;s value</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {improvementItems && (
              <ul className="space-y-3">
                {improvementItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{item.replace(/<\/?li>/g, "")}</span>
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
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Link href="/">Analyze Another Resume</Link>
        </Button>
      </div>
    </div>
  );
};

export default ResumeWorth;
