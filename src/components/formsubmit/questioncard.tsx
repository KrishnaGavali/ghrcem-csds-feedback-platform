import { useFeedbackFormData } from "@/context/Form";
import { Card } from "../ui/card";
import TeacherCard from "./teachercard";
import { useEffect, useState } from "react";
import { useSubmission } from "@/context/Submission";

interface QuestionCardProps {
  index: number;
  question: string;
}

const QuestionCard = ({ index, question }: QuestionCardProps) => {
  const { faculties } = useFeedbackFormData();
  const { setSubmissions } = useSubmission();
  const [ratings, setRatings] = useState<number[] | null>(null);

  useEffect(() => {
    setRatings(Array(faculties.length).fill(0));
  }, [faculties]);

  const setRatingAtIndex = (idx: number, rating: number) => {
    if (!ratings) return;
    const newRatings = [...ratings];
    newRatings[idx] = rating;
    setRatings(newRatings);

    // Update submissions in context
    if (!setSubmissions) return;
    setSubmissions((prev) => {
      const updated = { ...prev };
      const key = "Q" + index;
      updated[key] = newRatings.filter((r) => r > 0);
      return updated;
    });
  };

  return (
    <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl p-4 sm:p-6 shadow-md rounded-2xl">
      <p className="text-base sm:text-lg font-medium text-foreground">
        Q{index}. <span className="text-muted-foreground">{question}</span>
      </p>
      {faculties.map((faculty, idx) => (
        <TeacherCard
          key={idx}
          name={faculty.facultyName}
          subject={faculty.subject}
          questionNo={index}
          setRatingAtIndex={setRatingAtIndex}
          facultyIndex={idx}
        />
      ))}
    </Card>
  );
};

export default QuestionCard;
