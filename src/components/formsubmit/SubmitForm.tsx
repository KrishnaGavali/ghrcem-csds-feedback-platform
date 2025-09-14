import React from "react";
import { Button } from "../ui/button";
import { databases } from "@/handlers/appwrite";
import { ID, Query } from "appwrite";
import { useSubmission } from "@/context/Submission";
import { useFeedbackFormData } from "@/context/Form";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useRatings } from "@/context/Ratings";

const SubmitForm = () => {
  const navigate = useNavigate();
  const { name, rollNo, div, submissions } = useSubmission();
  const { id, faculties } = useFeedbackFormData();
  const { setRatings } = useRatings();

  console.log("Faculties in submit form:", faculties);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!submissions || Object.keys(submissions).length === 0) {
      toast.error("Please provide feedback before submitting.");
      return;
    }

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

    // 🔥 Transform submissions into faculty-wise ratings
    const transformedRatings: Record<string, number[]> = {};
    faculties.forEach((faculty, index) => {
      const facultyKey = faculty.facultyName + " - " + faculty.subject;
      transformedRatings[facultyKey] = Object.keys(submissions).map(
        (questionKey) => submissions[questionKey][index]
      );
    });

    console.log("Faculty-wise ratings:", transformedRatings);

    // Keep original payload for DB
    const dataToSubmit = {
      FormId: id,
      StudentName: name,
      Division: div,
      Roll: rollNo,
      submission: JSON.stringify(submissions),
    };

    const toastId = toast.loading("Submitting your feedback...");

    try {
      await databases.createRow({
        databaseId: import.meta.env.VITE_DATABASE_ID,
        tableId: "submissions",
        rowId: ID.unique(),
        data: dataToSubmit,
      });

      // Fetch report row for this form
      const report = await databases.listRows({
        databaseId: import.meta.env.VITE_DATABASE_ID,
        tableId: "report",
        queries: [Query.equal("formId", id)],
      });

      const existingReport = report.rows[0];

      if (!existingReport || !existingReport.TotalSubmissions) {
        // First submission → initialize report
        const initialReport: Record<string, number[]> = {};
        Object.keys(transformedRatings).forEach((faculty) => {
          initialReport[faculty] = transformedRatings[faculty];
        });

        await databases.updateRow({
          databaseId: import.meta.env.VITE_DATABASE_ID,
          tableId: "report",
          rowId: existingReport.$id,
          data: {
            report: JSON.stringify(initialReport),
            TotalSubmissions: 1,
          },
        });
      } else {
        // Update existing report
        const parsedReport = JSON.parse(existingReport.report || "{}");

        Object.keys(transformedRatings).forEach((faculty) => {
          if (!parsedReport[faculty]) {
            parsedReport[faculty] = transformedRatings[faculty];
          } else {
            parsedReport[faculty] = parsedReport[faculty].map(
              (val: number, idx: number) =>
                val + transformedRatings[faculty][idx]
            );
          }
        });

        await databases.updateRow({
          databaseId: import.meta.env.VITE_DATABASE_ID,
          tableId: "report",
          rowId: existingReport.$id,
          data: {
            report: JSON.stringify(parsedReport),
            TotalSubmissions: existingReport.TotalSubmissions + 1,
          },
        });
      }

      setRatings({}); // reset ratings state

      toast.success("Feedback submitted successfully!", { id: toastId });
      navigate("/student/forms/success");
    } catch (error) {
      console.error("Submit error:", error);
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
    </div>
  );
};

export default SubmitForm;
