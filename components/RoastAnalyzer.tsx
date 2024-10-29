"use client";

import React, { useEffect, useState } from "react";
import ResumeUploader from "./ResumeUploader";
import Roast from "./Roast";
import { useCompletion } from "ai/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

const roastLevels = {
  mild: "🌶️ Mild - Constructive feedback",
  medium: "🌶️🌶️ Medium - Balanced criticism",
  spicy: "🌶️🌶️🌶️ Spicy - Brutal honesty",
};

const RoastAnalyzer = () => {
  const [showWorth, setShowWorth] = useState(false);
  const [roastType, setRoastType] = useState("mild");
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const { completion, isLoading, complete, error } = useCompletion({
    api: "/api/roast",
  });

  useEffect(() => {
    const getResumeWorth = async (text: string) => {
      const messageToSend = `ROAST_LEVEL: ${roastType}\nRESUME: ${text}\n\n-------\n\n`;
      await complete(messageToSend);
      setShowWorth(true);
      setIsLoadingResume(false);
    };

    if (resumeText !== "") {
      getResumeWorth(resumeText).then();
    }
  }, [resumeText, complete, roastType]);

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/30 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Flame className="w-6 h-6 mr-2" />
          Resume Roaster
        </CardTitle>
        <CardDescription className="text-orange-100">Upload your resume and prepare to feel the heat!</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {!showWorth ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="roast-level" className="text-sm font-medium text-gray-700">
                Select roast intensity:
              </label>
              <Select value={roastType} onValueChange={value => setRoastType(value)}>
                <SelectTrigger
                  id="roast-level"
                  className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
                >
                  <SelectValue>{roastLevels[roastType as keyof typeof roastLevels]}</SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                  <SelectItem
                    value="mild"
                    className=" cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-orange-100  text-black"
                  >
                    {roastLevels.mild}
                  </SelectItem>
                  <SelectItem
                    value="medium"
                    className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-orange-100"
                  >
                    {roastLevels.medium}
                  </SelectItem>
                  <SelectItem
                    value="spicy"
                    className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-orange-100"
                  >
                    {roastLevels.spicy}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Upload your resume:</p>
              <ResumeUploader setIsLoading={setIsLoadingResume} setResumeText={setResumeText} />
            </div>

            {(isLoadingResume || isLoading) && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            )}
          </div>
        ) : (
          <Roast resumeWorth={completion} error={error} />
        )}
        {/* {error && <p className="mt-4 text-sm text-red-600">API Error</p>} */}
      </CardContent>
    </Card>
  );
};

export default RoastAnalyzer;
