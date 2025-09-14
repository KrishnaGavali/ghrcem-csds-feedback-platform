import { Button } from "@/components/ui/button";
import { Copy, ListTodo, FileBarChart2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type SubmissionsHeaderProps = {
  id: string;
  Name: string;
  Branch: string;
  Type: string;
  submissions: number;
};

export default function SubmissionsHeader({
  id = "",
  Name = "Feedback_SEM2",
  Branch = "CSE-DS",
  Type = "Theory",
  submissions = 24,
}: SubmissionsHeaderProps) {
  const [link] = useState(
    `${window.location.origin}/student/forms/submit?formId=${id}`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  return (
    <Card className="w-full border shadow-sm bg-background">
      {/* Header */}
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-left sm:text-start">
          <CardTitle className="text-lg sm:text-xl font-semibold text-foreground break-words">
            {Name}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {Branch} • {Type}
          </CardDescription>
        </div>

        <div className="sm:text-right">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs sm:text-sm font-medium">
            {submissions} submissions
          </span>
        </div>
      </CardHeader>

      {/* Actions */}
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button
            onClick={handleCopy}
            className="flex items-center gap-2 w-full sm:w-auto"
            variant="outline"
          >
            <Copy className="w-4 h-4" />
            Copy Link
          </Button>

          <Button
            onClick={() => window.open(link, "_blank")}
            className="flex items-center gap-2 w-full sm:w-auto"
            variant="secondary"
          >
            <ListTodo className="w-4 h-4" />
            Open Form
          </Button>

          <Button
            onClick={() =>
              window.open(
                `/faculty/forms/submissions/report?formId=${id}`,
                "_blank"
              )
            }
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <FileBarChart2 className="w-4 h-4" />
            View Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
