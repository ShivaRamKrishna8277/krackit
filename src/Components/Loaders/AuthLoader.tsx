import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { checkAuthState } from "../Authentication/authService";

export default function AuthStateCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = checkAuthState((user) => {
      if (user) {
        navigate("/home", { replace: true });
      } else {
        navigate("/onboard", { replace: true });
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
