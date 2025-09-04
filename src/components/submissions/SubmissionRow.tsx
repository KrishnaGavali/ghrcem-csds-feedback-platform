"use client";

import { TableCell, TableRow } from "@/components/ui/table";
interface SubmissionRowProps {
  id: number;
  name: string;
  branch: string;
  rollNo: number;
}

export default function SubmissionRow({
  name,
  branch,
  rollNo,
}: SubmissionRowProps) {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{branch}</TableCell>
      <TableCell>{rollNo}</TableCell>
    </TableRow>
  );
}
