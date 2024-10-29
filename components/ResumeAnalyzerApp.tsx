"use client";

import React, { useEffect, useState } from "react";
import ResumeUploader from "./ResumeUploader";
import ResumeWorth from "./ResumeWorth";
import { useCompletion } from "ai/react";
import { Loader2 } from "lucide-react";

export default function ResumeAnalyzerApp() {
  const [showWorth, setShowWorth] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [resumeText, setResumeText] = useState<string>("");
  const { completion, isLoading, complete, error } = useCompletion({
    api: "/api/resume",
  });

  useEffect(() => {
    const getResumeWorth = async (text: string) => {
      const messageToSend = `RESUME: ${text}\n\n-------\n\n`;
      await complete(messageToSend);
      setShowWorth(true);
      setIsLoadingResume(false);
    };

    if (resumeText !== "") {
      getResumeWorth(resumeText).catch(console.error);
    }
  }, [resumeText, complete]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {!showWorth ? (
        <div className="mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Resume Analyzer</h1>
            <p className="text-xl font-light mb-6">Upload your resume to know your worth.</p>
            <ResumeUploader setIsLoading={setIsLoadingResume} setResumeText={setResumeText} />
          </div>

          {(isLoadingResume || isLoading) && (
            <div className="flex flex-col items-center justify-center pt-16">
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
              <p className="text-lg font-medium text-black">Analyzing your resume...</p>
            </div>
          )}
        </div>
      ) : (
        <ResumeWorth resumeWorth={completion} />
      )}
      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-bold">Error:</p>
          <p>API Error</p>
        </div>
      )}
    </div>
  );
}
