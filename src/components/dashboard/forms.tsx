import React from "react";
import FormCard from "./formcard";

const FormsList = () => {
  return (
    <div className="flex flex-wrap gap-6 mt-4">
      <FormCard />
      <FormCard />
      <FormCard />
    </div>
  );
};

export default FormsList;
