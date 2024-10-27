import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Flame, FileText } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Flame className="h-6 w-6 text-red-600" />
          <span className="ml-2 text-2xl font-bold">ResumeRoast</span>
        </Link>
      </header>
      <main className="flex-1 dark:bg-black">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Wanna check your resume worth or
                  <span className="text-red-600"> get roasted </span>
                  on your resume?
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  We&apos;ve got you covered! Get honest feedback or a hilarious roast. Your choice, your career!
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className="bg-green-600 hover:bg-green-700" size="lg">
                  <Link href="/review">Check My Resume</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/roast">Roast Me!</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 dark:bg-black">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Us?</h2>
            <div className="grid gap-6 items-center md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                  <h3 className="text-xl font-bold">Expert Review</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Get your resume reviewed not by an industry expert 🙃 but an AI
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Flame className="w-12 h-12 text-red-500" />
                  <h3 className="text-xl font-bold">Hilarious Roasts</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Laugh while you learn with our witty resume roasts
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <FileText className="w-12 h-12 text-blue-500" />
                  <h3 className="text-xl font-bold">Detailed Feedback</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Receive actionable insights to improve your resume
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Level Up Your Resume?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Whether you want a professional review or a good laugh, we&apos;re here to help. Choose your path!
                </p>
              </div>
              <div className="flex space-x-4">
                <Button asChild className="bg-green-600 hover:bg-green-700" size="lg">
                  <Link href="/review">Get Reviewed</Link>
                </Button>
                <Button asChild className="bg-red-600 hover:bg-red-700" size="lg">
                  <Link href="/roast">Get Roasted</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 ResumeRoast. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
