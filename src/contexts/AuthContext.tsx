import { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import api from '@/lib/api';
import { toast } from "sonner";

// Define User type based on our backend model
export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'seeker' | 'priest' | 'admin' | 'unassigned';
  phone?: string;
  clerkId: string;
}

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  login: () => void; // Deprecated/Placeholder
  register: () => void; // Deprecated/Placeholder
  signOut: () => void;
  checkAuth: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const { signOut: clerkSignOut, getToken } = useClerkAuth();

  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isClerkLoaded) {
      if (clerkUser) {
        checkAuth();
      } else {
        setUser(null);
        setUserRole(null);
        setLoading(false);
      }
    }
  }, [isClerkLoaded, clerkUser]);

  const checkAuth = async () => {
    try {
      // Get token from Clerk
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }

      // Configure api client with token (if not already handled by interceptor, but let's be safe or rely on interceptor)
      // Assuming api.js/ts might need update or we set header here.
      // Better: we update the interceptor to use getToken equivalent.
      // For now, let's manually set it in this request or ensure interceptor works.
      // Since `api` is imported, we can't easily injection token factory. 
      // We'll pass it in header for this specific call.

      const { data } = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(data);
      setUserRole(data.role);
    } catch (error) {
      console.error('Auth sync failed:', error);
      toast.error("Failed to connect to server. Please check your connection.");
      setUser(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    clerkSignOut();
    setUser(null);
    setUserRole(null);
    setLoading(false); // ?
  };

  // Placeholders to satisfy interface if components use them
  const login = () => { console.warn("Use Clerk <SignIn />"); };
  const register = () => { console.warn("Use Clerk <SignUp />"); };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, login, register, signOut, checkAuth, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
