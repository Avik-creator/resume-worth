"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

interface RoastProps {
  resumeWorth: string;
}

const Roast: React.FC<RoastProps> = ({ resumeWorth }) => {
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
    <div className="space-y-6 p-8 mx-auto max-w-4xl bg-black text-white rounded-lg">
      <div className="text-center">
        <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
          Resume Roast
        </div>
        <p className="text-gray-400">Prepare to feel the burn!</p>
      </div>

      <Card className="h-full bg-black text-white rounded-lg p-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Resume Roast</CardTitle>
          <CardDescription className="text-gray-400">Brace yourself, it&apos;s about to get spicy!</CardDescription>
        </CardHeader>
        <CardContent className="bg-inherit">
          <div className="space-y-2 min-h-[200px]">
            {roastContent.length > 0 ? (
              <TypeAnimation
                sequence={[...roastContent.flatMap(line => [line, 1000]), () => setIsTypingComplete(true)]}
                wrapper="div"
                cursor={true}
                repeat={0}
                style={{ whiteSpace: "pre-line", height: "100%" }}
              />
            ) : (
              <p>Error Happend. It Happens sometimes. </p>
            )}
          </div>
        </CardContent>
      </Card>

      {isTypingComplete && (
        <div className="text-center">
          <Button asChild>
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Roast;
