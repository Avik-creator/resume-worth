"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

interface RoastProps {
  resumeWorth: string;
  error: Error | undefined;
}

export default function Roast({ resumeWorth, error }: RoastProps) {
  const [roastContent, setRoastContent] = useState<string[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const roastMatch = resumeWorth.match(/<Roast>([\s\S]*?)<\/Roast>/);
    if (roastMatch) {
      const roastText = roastMatch[1].trim();
      setRoastContent(roastText.split("\n").filter(line => line.trim() !== ""));
    }
  }, [resumeWorth]);

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 md:p-8 mx-auto max-w-4xl bg-black text-white rounded-lg">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
          Resume Roast
        </h1>
        <p className="text-sm sm:text-base text-gray-400">Prepare to feel the burn!</p>
      </div>

      <Card className="bg-black text-white rounded-lg border-gray-800">
        <CardHeader className="space-y-1 sm:space-y-2">
          <CardTitle className="text-base sm:text-lg md:text-xl font-semibold">Resume Roast</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-400">
            Brace yourself, it&apos;s about to get spicy!
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-inherit">
          <div className="space-y-2 min-h-[200px] text-sm sm:text-base">
            {roastContent.length > 0 ? (
              <TypeAnimation
                sequence={[...roastContent.flatMap(line => [line, 1000]), () => setIsTypingComplete(true)]}
                wrapper="div"
                cursor={true}
                repeat={0}
                style={{ whiteSpace: "pre-line", height: "100%" }}
              />
            ) : error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              <p className="text-gray-400">Loading roast content...</p>
            )}
          </div>
        </CardContent>
      </Card>

      {isTypingComplete && (
        <div className="text-center pt-4">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
