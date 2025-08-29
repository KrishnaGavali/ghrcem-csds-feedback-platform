import CreateFrom from "@/components/dashboard/createfrom";
import FormsList from "@/components/dashboard/forms";
import Navbar from "@/components/dashboard/navbar";
import Welcome from "@/components/dashboard/welcome";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex flex-col items-start px-6 py-3 gap-2 md:gap-4 max-w-7xl mx-auto w-full">
        <Welcome name="Krishna Gavali" />
        <Separator className="my-2 w-full" />
        <CreateFrom />
        <FormsList />
      </main>
    </div>
  );
};

export default Dashboard;
