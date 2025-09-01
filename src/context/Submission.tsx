import { createContext, useContext, useState } from "react";

type QuestionSubmission = {
  questionId: string;
  rating: number; // Assuming rating is a number, adjust as needed
};
