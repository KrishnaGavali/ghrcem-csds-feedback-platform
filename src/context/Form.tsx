import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Faculty = {
  Name: string;
  Subject: string;
};

interface FacultyContextType {
  faculties: Faculty[];
  setFaculties: (faculties: Faculty[]) => void;
  formType: string;
  setFormType: (formType: string) => void;
}

const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [formType, setFormType] = useState<string>("");

  return (
    <FacultyContext.Provider
      value={{ faculties, setFaculties, formType, setFormType }}
    >
      {children}
    </FacultyContext.Provider>
  );
};

export const useForm = (): FacultyContextType => {
  const context = useContext(FacultyContext);
  if (!context) {
    throw new Error("useFaculty must be used within a FacultyProvider");
  }
  return context;
};
