import { Card } from "../ui/card";

const QuestionCard = () => {
  return (
    <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl p-4 sm:p-6 shadow-md rounded-2xl">
      <p className="text-base sm:text-lg font-medium text-foreground">
        Q1.{" "}
        <span className="text-muted-foreground">Your question goes here</span>
      </p>
    </Card>
  );
};

export default QuestionCard;
