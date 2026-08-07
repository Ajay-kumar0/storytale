import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Wraps routes that require login (Dashboard, CreateStory, Story).
// Redirects to the login page if there's no token.
export function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

// Wraps routes that only make sense when logged OUT (Login, Register).
// Redirects an already-logged-in user straight to the dashboard.
export function PublicOnlyRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
