import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, GraduationCap } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Zod schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.literal("Theory"),
  branch: z.string().min(1, "Branch is required"),
  faculties: z
    .array(
      z.object({
        facultyName: z.string().min(1, "Faculty name required"),
        subject: z.string().min(1, "Subject required"),
      })
    )
    .min(1, "Add at least one faculty"),
});

export default function CreateTheoryFormButton() {
  const [open, setOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "Theory",
      branch: "",
      faculties: [{ facultyName: "", subject: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faculties",
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Reset form and close dialog on successful submission
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-[47%] sm:w-auto">
          <GraduationCap className="h-5 w-5 text-primary" />
          Create Theory Form
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="flex items-center gap-3 text-2xl text-foreground">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            Create Theory Form
          </DialogTitle>
          <p className="text-muted-foreground">
            Set up your theory course with faculty assignments
          </p>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Basic Information Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Form Name *
              </label>
              <Input
                {...register("name")}
                placeholder="Enter Form name"
                className="h-11 border-input bg-background focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
              {errors.name && (
                <p className="flex items-center gap-2 text-sm text-destructive">
                  <div className="h-1 w-1 rounded-full bg-destructive"></div>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Branch Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Branch *
              </label>
              <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 border-input bg-background focus:border-ring focus:ring-2 focus:ring-ring/20">
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DS">Data Science</SelectItem>
                      <SelectItem value="CS">Cyber Security</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.branch && (
                <p className="flex items-center gap-2 text-sm text-destructive">
                  <div className="h-1 w-1 rounded-full bg-destructive"></div>
                  {errors.branch.message}
                </p>
              )}
            </div>
          </div>

          {/* Type Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Form Type
            </label>
            <Input
              value="Theory"
              disabled
              className="h-11 cursor-not-allowed bg-muted/50 text-muted-foreground"
              {...register("type")}
            />
            <p className="text-xs text-muted-foreground">
              This field is automatically set to Theory
            </p>
          </div>

          {/* Faculties Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Faculty Assignments
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add faculty members and their subjects
                </p>
              </div>
              <Button
                type="button"
                onClick={() => append({ facultyName: "", subject: "" })}
                size="sm"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Add Faculty
              </Button>
            </div>

            {/* Faculty List */}
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-lg border border-border bg-muted/20 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 grid gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Faculty Name
                        </label>
                        <Input
                          {...register(`faculties.${index}.facultyName`)}
                          placeholder="Enter faculty name"
                          className="h-10 border-input bg-background focus:border-ring focus:ring-2 focus:ring-ring/20"
                        />
                        {errors.faculties?.[index]?.facultyName && (
                          <p className="text-xs text-destructive">
                            {errors.faculties[index].facultyName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Subject
                        </label>
                        <Input
                          {...register(`faculties.${index}.subject`)}
                          placeholder="Enter subject"
                          className="h-10 border-input bg-background focus:border-ring focus:ring-2 focus:ring-ring/20"
                        />
                        {errors.faculties?.[index]?.subject && (
                          <p className="text-xs text-destructive">
                            {errors.faculties[index].subject.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(index)}
                        className="h-10 w-10 shrink-0 border-destructive/20 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {errors.faculties && (
              <p className="flex items-center gap-2 text-sm text-destructive">
                <div className="h-1 w-1 rounded-full bg-destructive"></div>
                {errors.faculties.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              <GraduationCap className="h-4 w-4" />
              Create Form
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
