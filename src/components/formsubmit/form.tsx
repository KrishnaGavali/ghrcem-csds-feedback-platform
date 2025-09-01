import BasicDetailCard from "./basicDetailCard";
import QuestionCard from "./questioncard";
import theoryQuestion from "./questionTemplate/theory.json";
import practicalQuestion from "./questionTemplate/practical.json";

const FeedbackForm = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <div className=" max-w-sm sm:max-w-4xl flex flex-col gap-6 w-full justify-center items-center">
        <BasicDetailCard />
        <QuestionCard />
        <QuestionCard />
      </div>
    </div>
  );
};

export default FeedbackForm;
