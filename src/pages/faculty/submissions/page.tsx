import { Card, CardContent, CardTitle } from "@/components/ui/card";
import SubmissionsHeader from "@/components/submissions/SubmissionsHeader";
import SubmissionTable from "@/components/submissions/SubmissionTable";
import FacultySection from "@/components/submissions/FacultySection";

export default function SubmissionsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <Card className="">
        <CardContent className="p-4">
          <SubmissionsHeader />
        </CardContent>
      </Card>

      {/* Faculty Info */}
      <Card className="">
        <CardTitle className="p-4 text-lg font-bold">
          Faculty Information
        </CardTitle>
        <CardContent className="p-4">
          <FacultySection />
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card className="">
        <CardContent className="p-4">
          <SubmissionTable />
        </CardContent>
      </Card>
    </div>
  );
}
