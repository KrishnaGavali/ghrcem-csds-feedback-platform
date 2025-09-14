import { databases } from "@/handlers/appwrite";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Query } from "appwrite";
import { useState, useEffect } from "react";
import TheoryQuestion from "@/components/formsubmit/questionTemplate/theory.json";
import PracticalQuestion from "@/components/formsubmit/questionTemplate/practical.json";

type faculties = {
  facultyName: string;
  subject: string;
};

type FormSummaryProps = {
  id: string;
  type: string;
};

const FormSummary = ({ id, type }: FormSummaryProps) => {
  const [noEntry, setNoEntry] = useState(false);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [facultyList, setFacultyList] = useState<faculties[]>([]);

  // Pick the right question set based on type
  const questions =
    type === "theory"
      ? Object.values(TheoryQuestion)
      : Object.values(PracticalQuestion);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reportData = await databases.listRows({
          databaseId: import.meta.env.VITE_DATABASE_ID,
          tableId: "report",
          queries: [Query.equal("formId", id)],
        });

        if (
          !reportData.rows.length ||
          reportData.rows[0].TotalSubmissions === 0
        ) {
          setNoEntry(true);
          return;
        }

        const existingReport = reportData.rows[0];
        const parsedReport: Record<string, number[]> = JSON.parse(
          existingReport.report || "{}"
        );
        const totalSubmissions = existingReport.TotalSubmissions;

        // faculties in consistent order
        const facultyKeys = Object.keys(parsedReport);
        const facultyMeta = facultyKeys.map((key) => {
          const [facultyName, subject] = key.split(" - ");
          return { facultyName, subject };
        });
        setFacultyList(facultyMeta);

        const questionCount = parsedReport[facultyKeys[0]].length;
        const calculatedData: string[][] = [];

        // Loop over each question index
        for (let qIndex = 0; qIndex < questionCount; qIndex++) {
          const row: string[] = [];

          // Add actual question text
          row.push(questions[qIndex] || `Question ${qIndex + 1}`);

          // Add each faculty’s average for this question
          facultyKeys.forEach((facultyKey) => {
            const avg = parsedReport[facultyKey][qIndex] / totalSubmissions;
            row.push(avg.toFixed(2));
          });

          calculatedData.push(row);
        }

        // Add Total Avg row
        const totalRow: string[] = ["Total Avg"];
        facultyKeys.forEach((facultyKey) => {
          const sum = parsedReport[facultyKey].reduce(
            (acc, val) => acc + val,
            0
          );
          const avg = sum / (totalSubmissions * questionCount);
          totalRow.push(avg.toFixed(2));
        });
        calculatedData.push(totalRow);

        // Add Avg Feedback (%) row
        const percentRow: string[] = ["Avg Feedback (%)"];
        facultyKeys.forEach((facultyKey) => {
          const sum = parsedReport[facultyKey].reduce(
            (acc, val) => acc + val,
            0
          );
          const avg = sum / (totalSubmissions * questionCount);
          const percent = (avg / 5) * 100; // max rating = 5
          percentRow.push(percent.toFixed(1));
        });
        calculatedData.push(percentRow);

        setTableData(calculatedData);
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    fetchReport();
  }, [id, type]);

  if (noEntry) {
    return (
      <div className="text-center mt-6 font-medium text-red-500">
        No feedback submitted yet.
      </div>
    );
  }

  return (
    <div className="w-[98%] mx-auto mt-6">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
        Summary
      </h2>

      <div className="overflow-x-auto rounded-xl border border-border shadow-md bg-background">
        <Table className="min-w-[700px] text-xs sm:text-sm md:text-base">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="md:sticky md:left-0 md:z-10 md:bg-muted font-semibold whitespace-pre-wrap min-w-[180px]">
                Questions
              </TableHead>
              {facultyList.map((f, idx) => (
                <TableHead
                  key={idx}
                  className="whitespace-nowrap text-center min-w-[150px]"
                >
                  {f.facultyName} <br />
                  <span className="font-medium">({f.subject})</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, i) => (
              <TableRow
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-background" : "bg-muted/30"
                } hover:bg-muted/50 transition-colors`}
              >
                <TableCell className="md:sticky md:left-0 md:z-10 md:bg-inherit font-medium min-w-[180px] whitespace-pre-wrap">
                  {row[0]}
                </TableCell>
                {row.slice(1).map((val, j) => (
                  <TableCell key={j} className="text-center min-w-[100px]">
                    {val}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormSummary;
