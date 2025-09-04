"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface SubmissionRowProps {
  id: number;
  name: string;
  branch: string;
  rollNo: number;
  email: string;
}

export default function SubmissionRow({
  name,
  branch,
  rollNo,
  email,
}: SubmissionRowProps) {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{branch}</TableCell>
      <TableCell>{rollNo}</TableCell>
      <TableCell>{email}</TableCell>
    </TableRow>
  );
}
