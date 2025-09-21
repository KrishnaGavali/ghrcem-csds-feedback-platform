import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { useFeedbackFormData } from "@/context/Form";
import { useSubmission } from "@/context/Submission";
import { toast } from "sonner";

// ✅ Validation Schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  rollno: z.string().min(1, { message: "Roll No. is required." }),
  division: z.string().min(1, { message: "Division is required." }),
});

const BasicDetailCard = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rollno: "",
      division: "",
    },
  });

  const { setName, setDiv, setRollNo } = useSubmission();
  const { Name, branch, setShowForm } = useFeedbackFormData();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ Using toast.promise for better UX
    toast.promise(
      new Promise<void>((resolve, reject) => {
        try {
          setName(values.name);
          setDiv(values.division);
          setRollNo(Number(values.rollno));
          resolve();

          setShowForm(true);
        } catch (err) {
          reject(err);
        }
      }),
      {
        loading: "Updating student details...",
        success: "Details updated successfully 🎉",
        error: "Failed to update details. Try again.",
      }
    );
  }

  return (
    <div className="flex justify-center w-full">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl p-4 sm:p-6 mb-8 shadow-md rounded-2xl">
        <CardHeader>
          {/* ✅ Highlighted Form Info */}
          <div className="space-y-1">
            <p className="text-xl font-bold text-foreground">{Name}</p>
            <p className="text-sm text-muted-foreground">
              Branch: <span className="text-foreground">{branch}</span>
            </p>
          </div>

          <Separator className="my-4" />

          <CardTitle className="text-lg font-semibold text-foreground">
            Student Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter student name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Roll No */}
              <FormField
                control={form.control}
                name="rollno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll No.</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter roll number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Division */}
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter division" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Update Button */}
              <Button type="submit" className="w-full sm:w-auto">
                Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicDetailCard;
