import { SignIn } from "@clerk/clerk-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <SignIn forceRedirectUrl="/" />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
