import { useFeedbackFormData } from "@/context/Form";
import { Card } from "../ui/card";
import TeacherCard from "./teachercard";

interface QuestionCardProps {
  index: number;
  question: string;
}

const QuestionCard = ({ index, question }: QuestionCardProps) => {
  const { faculties } = useFeedbackFormData();

  console.log(faculties);

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
        />
      ))}
    </Card>
  );
};

export default QuestionCard;
