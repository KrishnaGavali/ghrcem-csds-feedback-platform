import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type ratingsType = Record<string, number[]>;

interface RatingsContextType {
  ratings: ratingsType | null;
  setRatings: (ratings: ratingsType | null) => void;
}

const RatingsContext = createContext<RatingsContextType | null>(null);

export const RatingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [ratings, setRatings] = useState<ratingsType | null>(null);

  return (
    <RatingsContext.Provider value={{ ratings, setRatings }}>
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = (): RatingsContextType => {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error("useRatings must be used within a RatingsProvider");
  }
  return context;
};
