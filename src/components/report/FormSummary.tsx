import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type submissionsType = {
  id: number;
  StudentName: string;
  Roll: number;
};

type FormSummaryProps = {
  submissions: submissionsType[];
};

const FormSummary = ({ submissions }: FormSummaryProps) => {
  console.log("Submissions data in FormSummary:", submissions);

  const data = [
    ["Resources to perform practical available?", "4.63", "4.46", "4.63"],
    ["Explained experiment before conduction?", "4.66", "4.40", "4.66"],
    ["Proper attention in practical implementation?", "4.69", "4.34", "4.60"],
    ["Gave checklist/steps for completion?", "4.66", "4.37", "4.57"],
    ["Encouraged additional/advanced experiments?", "4.57", "4.17", "4.49"],
    [
      "Precise, updated aids of explanatory lab manuals?",
      "4.40",
      "4.17",
      "4.26",
    ],
    ["Performance of equipment maintained?", "4.37", "4.31", "4.51"],
    ["Experiments/practicals compulsory?", "4.57", "4.31", "4.46"],
    ["Teacher elaborates real implications?", "4.49", "4.51", "4.60"],
    ["Total Avg", "4.55", "4.35", "4.52"],
    ["Avg Feedback (%)", "91", "87", "90.4"],
  ];

  const faculties = [
    { name: "Prof. Nishigandha Vyawahare", subject: "OOP" },
    { name: "Prof. Geetanjali Rokade", subject: "CN" },
    { name: "Prof. Gayatri Deshmukh", subject: "MLA" },
  ];

  return (
    <div className="w-[98%] mx-auto mt-6">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
        Form Summary Table
      </h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-xl border border-border shadow-md bg-background">
        <Table className="min-w-[700px] text-xs sm:text-sm md:text-base">
          <TableHeader>
            <TableRow className="bg-muted">
              {/* Sticky only on md+ screens */}
              <TableHead className="md:sticky md:left-0 md:z-10 md:bg-muted font-semibold whitespace-pre-wrap min-w-[180px]">
                Questions
              </TableHead>
              {faculties.map((f, idx) => (
                <TableHead
                  key={idx}
                  className="whitespace-nowrap text-center min-w-[150px]"
                >
                  {f.name} <br />
                  <span className="font-medium">({f.subject})</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-background" : "bg-muted/30"
                } hover:bg-muted/50 transition-colors`}
              >
                {/* Sticky only on md+ screens */}
                <TableCell className="md:sticky md:left-0 md:z-10 md:bg-inherit font-medium min-w-[180px] whitespace-pre-wrap">
                  {row[0]}
                </TableCell>
                <TableCell className="text-center min-w-[100px]">
                  {row[1]}
                </TableCell>
                <TableCell className="text-center min-w-[100px]">
                  {row[2]}
                </TableCell>
                <TableCell className="text-center min-w-[100px]">
                  {row[3]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormSummary;
