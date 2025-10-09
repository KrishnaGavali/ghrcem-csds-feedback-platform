"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle, Info } from "lucide-react";
import { Link } from "react-router";

export default function SuccessPage() {
  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Info Icon */}
      <Link to="/app-info">
        <Info className="absolute top-4 right-4 w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
      </Link>

      <Card className="p-10 text-center shadow-lg rounded-2xl space-y-6 max-w-md">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
        <h2 className="text-2xl font-semibold">
          Form Submitted Successfully 🎉
        </h2>
        <p className="text-muted-foreground">
          Thank you for your response. Your feedback has been recorded.
        </p>
      </Card>
    </div>
  );
}
