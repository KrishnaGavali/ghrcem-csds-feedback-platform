import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type FacultySectionProps = {
  facultyData: { facultyName: string; subject: string }[];
};

export default function FacultySection({ facultyData }: FacultySectionProps) {
  return (
    <Card className="w-full border shadow-sm bg-background">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl font-bold">
          Faculty Information
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Assigned faculty members and their respective subjects.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {facultyData.map((faculty, index) => (
            <div
              key={index}
              className="flex flex-col p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Name</p>
                <p className="text-sm sm:text-base font-medium break-words">
                  {faculty.facultyName}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Subject
                </p>
                <p className="text-sm sm:text-base font-medium break-words">
                  {faculty.subject}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
