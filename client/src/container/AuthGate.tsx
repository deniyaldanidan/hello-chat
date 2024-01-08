import LoadingPage from "../components/LoadingPage";
import useAuth from "../hooks/useAuth"
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthGate({ isAuth, redirectLink }: { isAuth: boolean, redirectLink: string }) {
    const { authState: { authed } } = useAuth();

    if (authed === "loading") {
        return <LoadingPage />
    }

    return authed === isAuth ? <Outlet /> : <Navigate to={redirectLink} replace />;
}