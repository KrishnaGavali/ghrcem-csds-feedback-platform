import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b border-border bg-background shadow-sm mb-10">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold tracking-tight">
            GHRCEM{" "}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              CSDS Feedback
            </span>
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-md"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-blue-500" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
