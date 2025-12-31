import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;
  if (!user) return <Navigate to="/" />;

  return children;
}
