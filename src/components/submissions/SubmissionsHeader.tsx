type propsType = {
  Name: string;
  Branch: string;
  Type: string;
  submissions: number;
};

export default function SubmissionsHeader({
  Name = "Feedback_SEM2",
  Branch = "CSE-DS",
  Type = "Theory",
  submissions = 24,
}: propsType) {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <h2 className="text-lg font-semibold">Name: {Name}</h2>
        <h2 className="text-lg font-semibold">Branch: {Branch}</h2>
        <p className="text-muted-foreground">Type: {Type}</p>
      </div>
      <div className="text-right">
        <h1 className="text-3xl font-bold">{submissions}</h1>

        <p className="text-muted-foreground text-sm">submissions</p>
      </div>
    </div>
  );
}
