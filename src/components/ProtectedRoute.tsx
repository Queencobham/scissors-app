import { Navigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = UserAuth();


    if (!user) {
        return <Navigate to='/' />
    }
    return <>{children}</>
   
}

export default ProtectedRoute