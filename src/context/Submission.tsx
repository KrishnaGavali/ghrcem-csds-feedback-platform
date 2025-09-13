import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type FormSubmission = Record<string, number[]>;
interface SubmissionContextType {
  name: string;
  setName: (name: string) => void;
  div: string;
  setDiv: (div: string) => void;
  rollNo: number;
  setRollNo: (rollNo: number) => void;
  formId: string;
  setFormId: (formId: string) => void;
  submissions: FormSubmission | null;
  setSubmissions: (submissions: FormSubmission | null) => void;
}

const SubmissionContext = createContext<SubmissionContextType | undefined>(
  undefined
);

export const SubmissionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formId, setFormId] = useState<string>("");
  const [submissions, setSubmissions] = useState<FormSubmission | null>(null);
  const [name, setName] = useState<string>("");
  const [div, setDiv] = useState<string>("");
  const [rollNo, setRollNo] = useState<number>(0);

  return (
    <SubmissionContext.Provider
      value={{
        formId,
        setFormId,
        submissions,
        setSubmissions,
        name,
        setName,
        div,
        setDiv,
        rollNo,
        setRollNo,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmission = (): SubmissionContextType => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error("useSubmission must be used within a SubmissionProvider");
  }
  return context;
};
