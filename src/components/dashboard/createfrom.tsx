import React from "react";
import { Button } from "../ui/button";

const CreateFrom = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
      <h2 className="text-2xl font-extrabold text-foreground leading-tight">
        Feedback Forms
      </h2>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          Create Theory Form
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          Create Practical Form
        </Button>
      </div>
    </div>
  );
};

export default CreateFrom;
