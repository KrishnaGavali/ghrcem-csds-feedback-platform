const Welcome: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
            GHRCEM Feedback Forms
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Here's your all feedbacks at one place.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
