"use client";

export default function FacultySection() {
  const facultyList = [
    { name: "Prof. Manisha Patil", subject: "Data Structures" },
    { name: "Prof. Sunil Joshi", subject: "Algorithms" },
    { name: "Prof. A. Sharma", subject: "Operating Systems" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facultyList.map((faculty, index) => (
          <div
            key={index}
            className="flex flex-col p-3 rounded-md border bg-background shadow-sm hover:shadow-md transition"
          >
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="text-base font-medium text-foreground">
              {faculty.name}
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
