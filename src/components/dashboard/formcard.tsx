import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FormCard = ({
  branch = "CSE-DS",
  type = "Theory",
  name = "Krishna Gavali",
}) => {
  return (
    <Card className="w-full sm:w-72 bg-card shadow-md hover:shadow-lg transition-shadow duration-300 border border-border rounded-xl">
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Name */}
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        </div>

        {/* Branch */}
        <div>
          <p className="text-sm text-muted-foreground">Branch</p>
          <h3 className="text-lg font-medium text-foreground">{branch}</h3>
        </div>

        {/* Type */}
        <div>
          <p className="text-sm text-muted-foreground">Type</p>
          <h3 className="text-lg font-medium text-foreground">{type}</h3>
        </div>

        {/* Separator */}
        <div className="border-t border-border mt-2"></div>

        {/* Submissions Button */}
        <Button className="w-full mt-2" variant="outline">
          Submissions
        </Button>
      </CardContent>
    </Card>
  );
};

export default FormCard;
