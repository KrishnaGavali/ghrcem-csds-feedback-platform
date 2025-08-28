import LoginForm from "@/components/auth/login";
import Navbar from "@/components/auth/navbar";

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col bg-red-300">
      <Navbar />
      <LoginForm />
    </div>
  );
};

export default Auth;
