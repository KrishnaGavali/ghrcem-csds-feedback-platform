import React from "react";
import { Button } from "../ui/button";
import CreateTheoryForm from "./theoryformdialog";
import CreatePracticalFormButton from "./practicalformdialog";

const CreateFrom = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
      <h2 className="text-2xl font-extrabold text-foreground leading-tight">
        Feedback Forms
      </h2>
      <div className="flex gap-2 flex-row sm:gap-3 items-center justify-center">
        <CreateTheoryForm />
        <CreatePracticalFormButton />
      </div>
    </div>
  );
};

export default CreateFrom;
