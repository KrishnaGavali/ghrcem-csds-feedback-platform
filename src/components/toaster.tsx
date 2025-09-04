import { Toaster as SonnerToaster } from "./ui/sonner";
import { useTheme } from "next-themes";

const ToasterComponent = () => {
  const { theme, resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      position="bottom-right"
      theme={
        theme === "light"
          ? "light"
          : theme === "dark"
          ? "dark"
          : resolvedTheme === "light"
          ? "light"
          : "dark"
      }
      richColors
    />
  );
};

export default ToasterComponent;
