"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubmissionRow from "./SubmissionRow";
import { Button } from "../ui/button";

const dummyData = [
  {
    id: 1,
    name: "Krishna Gavali",
    branch: "CSE-DS",
    rollNo: 26,
    email: "krishnagavali973@gmail.com",
  },
  {
    id: 2,
    name: "Dummy Student",
    branch: "CSE-DS",
    rollNo: 27,
    email: "dummy@gmail.com",
  },
];

export default function SubmissionTable() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {" "}
        <h2 className="text-lg font-semibold mb-4">Student Submissions</h2>
        <Button className=" bg-foreground text-background">Refresh</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Roll No</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((student) => (
            <SubmissionRow key={student.id} {...student} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
