import React from "react";
import { Button } from "../ui/button";
import { databases } from "@/handlers/appwrite";
import { ID } from "appwrite";
import { useSubmission } from "@/context/Submission";
import { useFeedbackFormData } from "@/context/Form";
import { toast } from "sonner";

const SubmitForm = () => {
  const { name, rollNo, div, submissions } = useSubmission();
  const { id } = useFeedbackFormData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!submissions || Object.keys(submissions).length === 0) {
      toast.error("Please provide feedback before submitting.");
      return;
    }

    //check if all fields are filled
    if (!name || !rollNo || !div) {
      toast.error("Please fill all the basic details before submitting.");
      return;
    }

    let submissionAreGiven = true;

    Object.values(submissions).forEach((value) => {
      value.forEach((rating) => {
        if (rating === 0) {
          submissionAreGiven = false;
          return;
        }
      });
    });

    if (!submissionAreGiven) {
      toast.error(
        "Please provide ratings for all questions before submitting."
      );
      return;
    }

    const dataToSubmit = {
      FormId: id,
      StudentName: name,
      Division: div,
      Roll: rollNo,
      submission: JSON.stringify(submissions),
    };

    // Show loading toast
    const toastId = toast.loading("Submitting your feedback...");

    try {
      await databases.createRow({
        databaseId: import.meta.env.VITE_DATABASE_ID,
        tableId: "submissions",
        rowId: ID.unique(),
        data: dataToSubmit,
      });

      // Replace loading with success
      toast.success("Feedback submitted successfully!", {
        id: toastId,
      });
    } catch (error) {
      console.error("Submit error:", error);

      // Replace loading with error
      toast.error("Failed to submit feedback. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-start items-center w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mb-10">
      <Button
        type="submit"
        className="w-full bg-foreground text-background font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-foreground/90 active:scale-95"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      {/* <Toaster position="bottom-right" richColors /> */}
    </div>
  );
};

export default SubmitForm;
