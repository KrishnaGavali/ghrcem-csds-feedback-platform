type FacultySectionProps = {
  facultyData: { facultyName: string; subject: string }[];
};

export default function FacultySection({ facultyData }: FacultySectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facultyData.map((faculty, index) => (
          <div
            key={index}
            className="flex flex-col p-3 rounded-md border bg-background shadow-sm hover:shadow-md transition"
          >
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="text-base font-medium text-foreground">
              {faculty.facultyName}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Subject</p>
            <p className="text-base font-medium text-foreground">
              {faculty.subject}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
