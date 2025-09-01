import React, { useState } from "react";
import { Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type TeacherCardProps = {
  name: string;
  subject: string;
};

const TeacherCard: React.FC<TeacherCardProps> = ({ name, subject }) => {
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number>(0);

  console.log(`Rendering TeacherCard for ${name} - ${subject}`);

  return (
    <Card className="md:w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground">
            {name}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {subject}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer transition-colors ${
                star <= (hovered || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherCard;
