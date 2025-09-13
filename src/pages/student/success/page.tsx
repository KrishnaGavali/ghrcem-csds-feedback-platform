"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center h-screen">
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
