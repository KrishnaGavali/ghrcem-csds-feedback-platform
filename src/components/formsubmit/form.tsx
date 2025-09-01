import BasicDetailCard from "./basicDetailCard";
import QuestionCard from "./questioncard";
import theoryQuestion from "./questionTemplate/theory.json";
import practicalQuestion from "./questionTemplate/practical.json";
import { useFeedbackFormData } from "@/context/Form";
import { useEffect, useState } from "react";

type QuestionSet = Record<string, string>;

const FeedbackForm = () => {
  const { formType } = useFeedbackFormData();
  const [formQuestion, setFormQuestion] = useState<QuestionSet>({});

  useEffect(() => {
    if (formType === "Theory") {
      setFormQuestion(theoryQuestion as QuestionSet);
    } else if (formType === "Practical") {
      setFormQuestion(practicalQuestion as QuestionSet);
    } else {
      setFormQuestion({});
    }
  }, [formType]);

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <div className="max-w-sm sm:max-w-4xl flex flex-col gap-6 w-full justify-center items-center">
        <BasicDetailCard />
        {Object.entries(formQuestion).map(([key, question], index) => (
          <QuestionCard index={index + 1} key={key} question={question} />
        ))}
      </div>
    </div>
  );
};

export default FeedbackForm;
