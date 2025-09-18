interface WelcomeProps {
  name: string;
}

const Welcome: React.FC<WelcomeProps> = ({ name }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-extrabold text-foreground leading-tight">
            Welcome 👋
          </h1>
          <h2 className="text-3xl text-foreground">
            Prof. <span className="font-semibold text-primary">{name}</span>
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
