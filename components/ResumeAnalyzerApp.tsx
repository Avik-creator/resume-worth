"use client";

import React, { useEffect, useState } from "react";
import ResumeUploader from "./ResumeUploader";
import ResumeWorth from "./ResumeWorth";
import { useCompletion } from "ai/react";

const ResumeAnalyzerApp = () => {
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
      getResumeWorth(resumeText).then();
    }
  }, [resumeText, complete]);

  return (
    <div className="mx-auto">
      {!showWorth ? (
        <div className="mx-auto pb-[200px]">
          <p className="text-xl font-light mt-[15px] mb-5">Upload your resume to know your worth.</p>
          <ResumeUploader setIsLoading={setIsLoadingResume} setResumeText={setResumeText} />
          {(isLoadingResume || isLoading) && (
            <div className="absolute left-0 right-0">
              <div className="inline-block mx-auto my-[30px] w-[30px] h-[30px] border-5 border-white rounded-full border-t-[#ffc75d] animate-spin"></div>
            </div>
          )}
        </div>
      ) : (
        <ResumeWorth resumeWorth={completion} />
      )}
      {error && <p className="text-red-500 text-sm mt-[10px]">{error.message}</p>}
    </div>
  );
};

export default ResumeAnalyzerApp;
