import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import { checkAuthState } from "../Authentication/authService";
import { LocalNotifications } from "@capacitor/local-notifications"; // Directly import LocalNotifications

// Request Notification Permission
async function requestNotificationPermission() {
  const permissionStatus = localStorage.getItem("notificationPermission");

  if (!permissionStatus) {
    const result = await LocalNotifications.requestPermissions();
    if (result.display === "granted") {
      console.log("Notification permission granted!");
      localStorage.setItem("notificationPermission", "granted");
    } else {
      console.log("Notification permission denied!");
      localStorage.setItem("notificationPermission", "denied");
    }
  } else {
    console.log(`Permission already ${permissionStatus}`);
  }
}

export default function AuthStateCheck() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = checkAuthState((user) => {
      if (user) {
        navigate("/home", { replace: true });

        // Request notification permission for authenticated users
        requestNotificationPermission();
      } else {
        navigate("/onboard", { replace: true });
      }
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {loading ? <Spinner animation="border" variant="primary" /> : null}
    </div>
  );
}
