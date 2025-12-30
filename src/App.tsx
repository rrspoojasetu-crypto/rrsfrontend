import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import SeekerDashboard from "./pages/SeekerDashboard";
import PriestDashboard from "./pages/PriestDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServiceManagement from "./pages/AdminServiceManagement";
import RitualRequest from "./pages/RitualRequest";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SeekerRegistration from "./pages/SeekerRegistration";
import PriestRegistration from "./pages/PriestRegistration";

import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

// Component to handle landing page redirect
const LandingOrDashboard = () => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is authenticated
  if (user && userRole) {
    if (userRole === 'unassigned') {
      return <Navigate to="/onboarding" replace />;
    }
    return <Navigate to={`/dashboard/${userRole}`} replace />;
  }

  // Otherwise show landing page
  return <Landing />;
};

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const App = () => (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingOrDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />

              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute allowedRoles={['unassigned', 'seeker', 'priest']}>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/seeker"
                element={<SeekerDashboard />}
              />

              <Route
                path="/dashboard/priest"
                element={<PriestDashboard />}
              />

              <Route
                path="/dashboard/admin"
                element={<AdminDashboard />}
              />

              <Route
                path="/ritual/request"
                element={
                  <ProtectedRoute allowedRoles={['seeker']}>
                    <RitualRequest />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/services"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminServiceManagement />
                  </ProtectedRoute>
                }
              />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
