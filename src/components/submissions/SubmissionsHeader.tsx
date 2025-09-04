export default function SubmissionsHeader() {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h2 className="text-lg font-semibold">Name : Feedback_SEM2</h2>
        <h2 className="text-lg font-semibold">Branch: CSE-DS</h2>
        <p className="text-muted-foreground">Type: Theory</p>
      </div>
      <div className="text-right">
        <h1 className="text-3xl font-bold">24</h1>
        <p className="text-muted-foreground text-sm">submissions</p>
      </div>
    </div>
  );
}
