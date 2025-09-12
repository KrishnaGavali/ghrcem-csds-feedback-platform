import { Button } from "@/components/ui/button"; // Assuming shadcn button is here
import { Copy, ListTodo } from "lucide-react"; // Lucide icon
import { toast } from "sonner"; // Sonner toaster
import { useState } from "react";

type propsType = {
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
}: propsType) {
  const [link] = useState(
    `${window.location.origin}/student/forms/submit?formId=${id}`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h2 className="text-lg font-semibold">Name: {Name}</h2>
        <h2 className="text-lg font-semibold">Branch: {Branch}</h2>
        <p className="text-muted-foreground">Type: {Type}</p>
      </div>
      <div className="text-right">
        <h1 className="text-3xl font-bold">{submissions}</h1>
        <p className="text-muted-foreground text-sm">submissions</p>
        <Button
          onClick={handleCopy}
          className="mt-2 flex items-center gap-2"
          variant="outline"
        >
          <Copy className="w-4 h-4" />
          Copy Link
        </Button>

        <Button
          onClick={() => window.open(link, "_blank")}
          className="mt-2 flex items-center gap-2"
          variant="outline"
        >
          <ListTodo className="w-4 h-4" />
          Open Form
        </Button>
      </div>
    </div>
  );
}
