import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Faculty = {
  facultyName: string;
  subject: string;
};

interface FormContextType {
  faculties: Faculty[];
  setFaculties: (faculties: Faculty[]) => void;
  formType: string;
  setFormType: (formType: string) => void;
  Name: string;
  setName: (Name: string) => void;
  branch: string;
  setBranch: (branch: string) => void;
  type: string;
  setType: (type: string) => void;
  id: string;
  setId: (id: string) => void;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
}

const FacultyContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [formType, setFormType] = useState<string>("");
  const [Name, setName] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <FacultyContext.Provider
      value={{
        faculties,
        setFaculties,
        formType,
        setFormType,
        Name,
        setName,
        branch,
        setBranch,
        type,
        setType,
        id,
        setId,
        showForm,
        setShowForm,
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
};

export const useFeedbackFormData = (): FormContextType => {
  const context = useContext(FacultyContext);
  if (!context) {
    throw new Error("useFaculty must be used within a FacultyProvider");
  }
  return context;
};
