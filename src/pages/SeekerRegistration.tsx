import { SignUp } from "@clerk/clerk-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SeekerRegistration = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <SignUp />
      </main>
      <Footer />
    </div>
  );
};

export default SeekerRegistration;
