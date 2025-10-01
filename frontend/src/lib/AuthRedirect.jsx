import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore.js";

export default function AuthRedirect({ children }) {
  const { user } = useUserStore();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function ProtectedRoute({ children }) {
  const { user } = useUserStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export function ProtectedRoutedRole({ children, role }) {
  const { user } = useUserStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
}
