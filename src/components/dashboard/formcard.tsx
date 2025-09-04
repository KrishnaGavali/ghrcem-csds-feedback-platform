import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { databases } from "@/handlers/appwrite";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router";

interface FormCardProps {
  id: string;
  branch?: string;
  type?: string;
  name?: string;
}

const FormCard = ({
  id,
  branch = "CSE-DS",
  type = "Theory",
  name = "Krishna Gavali",
}: FormCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting form...");
    try {
      await databases.deleteRow({
        databaseId: import.meta.env.VITE_DATABASE_ID,
        tableId: "forms",
        rowId: id,
      });
      toast.success("Form deleted successfully!", { id: toastId });
      setDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(`Failed to delete form: ${error.message}`, { id: toastId });
    }
  };

  return (
    <>
      <Card className="relative w-full sm:w-72 bg-card shadow-md hover:shadow-lg transition-shadow duration-300 border border-border rounded-xl">
        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="absolute top-3 right-3 p-1 rounded-lg"
              variant="destructive"
              size="icon"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the form <strong>{name}</strong>
                ? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <CardContent className="flex flex-col gap-4 p-6">
          {/* Name */}
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          </div>

          {/* Branch */}
          <div>
            <p className="text-sm text-muted-foreground">Branch</p>
            <h3 className="text-lg font-medium text-foreground">{branch}</h3>
          </div>

          {/* Type */}
          <div>
            <p className="text-sm text-muted-foreground">Type</p>
            <h3 className="text-lg font-medium text-foreground">{type}</h3>
          </div>

          {/* Separator */}
          <div className="border-t border-border mt-2"></div>

          {/* Submissions Button */}
          <Link
            to={`/faculty/forms/submissions?formId=${id}`}
            className="w-full"
          >
            <Button
              className="w-full mt-2 border border-border rounded-md px-4 py-2"
              variant="outline"
            >
              Submissions
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Sonner Toaster
      <Toaster
        position="bottom-right"
        theme={
          theme === "light"
            ? "light"
            : theme === "dark"
            ? "dark"
            : resolvedTheme === "light"
            ? "light"
            : "dark"
        }
        richColors
      /> */}
    </>
  );
};

export default FormCard;
