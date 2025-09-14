import React from "react";

type FormInfoProps = {
  Name: string;
  Type: string;
  Branch: string;
};

const FormInfo = ({ Name, Type, Branch }: FormInfoProps) => {
  return (
    <div className="w-[98%] mx-auto p-4 sm:p-6 border-b border-muted-foreground/50">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
        {Name}
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground">
        <span className="font-medium">Type:</span> {Type}
      </p>
      <p className="text-sm sm:text-base text-muted-foreground">
        <span className="font-medium">Branch:</span> {Branch}
      </p>
    </div>
  );
};

export default FormInfo;
