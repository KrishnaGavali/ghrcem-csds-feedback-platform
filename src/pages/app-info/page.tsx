import React from "react";
import Disclaimer from "@/components/app-info/Disclaimer";
import Navbar from "@/components/auth/navbar";
import { SelectSeparator } from "@/components/ui/select";
import AnalyticsPage from "@/components/app-info/Analytics";
import AnalyticsSection from "@/components/app-info/Analytics";
import Footer from "@/components/app-info/Footer";

const AppInfoPage = () => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <Disclaimer />
      <div className="mx-auto mt-10 max-w-4xl px-4">
        {/* Header */}
        <h1 className="mb-2 text-4xl font-extrabold leading-tight tracking-tight text-primary md:text-5xl lg:text-6xl">
          GHRCEM CSDS Feedback System 🎓
        </h1>
        <h3 className="mb-4 text-xl font-bold text-muted-foreground md:text-2xl">
          A feedback management system that saves faculty 8+ hours every
          semester.
        </h3>
        <div className="flex gap-2">
          <img
            src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"
            alt="React"
          />
          <img
            src="https://img.shields.io/badge/Appwrite-F02E65?style=flat&logo=appwrite&logoColor=white"
            alt="Appwrite"
          />
          <img
            src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white"
            alt="Vercel"
          />
        </div>

        <SelectSeparator className="my-8" />

        {/* The Problem & Solution */}
        <div className="my-8">
          <h2 className="mb-4 text-3xl font-bold">The Problem & My Solution</h2>
          <div className="pl-4">
            <p className="text-muted-foreground leading-relaxed">
              My professor was spending <strong>8+ hours per semester</strong>{" "}
              creating repetitive Google Forms for feedback. I built a system
              that automates the process, letting faculty generate complete
              forms in <strong>under 30 seconds</strong>.
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5 leading-relaxed">
              <li className=" text-destructive">
                <strong>Before:</strong> Manual forms, scattered responses, no
                insights.
              </li>
              <li className=" text-green-400">
                <strong>After:</strong> Automated form creation, centralized
                data, real-time analytics.
              </li>
            </ul>
          </div>
        </div>

        <SelectSeparator className="my-8" />

        {/* How it works */}
        <div className="my-8">
          <h2 className="mb-4 text-3xl font-bold">How It Works (Demo Video)</h2>
          <div className="w-full bg-card aspect-video flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400">
            <span className="text-gray-600 text-lg">
              Placeholder for Demo Video
            </span>
          </div>
        </div>

        <SelectSeparator className="my-8" />

        {/* Key Features & Tech Stuff */}
        <div className="my-8">
          <h2 className="mb-4 text-3xl font-bold">Key Features & Tech Stack</h2>
          <div className="pl-4">
            <p className="mb-4 text-muted-foreground leading-relaxed">
              This system provides a full-stack solution with the following
              features and technologies:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground leading-relaxed">
              <li>
                <strong>For Teachers:</strong> Create forms, share unique links,
                and view real-time feedback analytics.
              </li>
              <li>
                <strong>For Students:</strong> Fill forms quickly on any device
                without needing to register.
              </li>
              <li>
                <strong>Tech Stack:</strong>
                <span>
                  <strong className="">React</strong> (Frontend),{" "}
                </span>
                <span>
                  <strong className="">Appwrite</strong> (Backend, DB, Auth),{" "}
                </span>
                <span>
                  <strong className="">Vercel</strong>(Hosting),{" "}
                </span>
              </li>
            </ul>
            <p className="mt-4 text-gray-500 italic">
              Note: The analytics UI was intentionally kept simple for easy PDF
              printing, but I'm capable of building more complex dashboards.
            </p>
          </div>
        </div>

        <SelectSeparator className="" />

        <AnalyticsSection />
      </div>
      <Footer />
    </div>
  );
};

export default AppInfoPage;
