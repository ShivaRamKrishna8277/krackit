import React, { useState, useEffect } from "react";

const NotificationPermission: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission
  );

  useEffect(() => {
    console.log("Initial permission:", Notification.permission);
    setPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }

    if (permission === "granted") {
      alert("You have already granted notification permission.");
    } else if (permission === "denied") {
      alert(
        "You have denied notification permission. Please check your browser settings to allow notifications."
      );
    } else {
      try {
        const newPermission = await Notification.requestPermission();
        setPermission(newPermission);

        if (newPermission === "granted") {
          sendTestNotification(); // Trigger a test notification
        } else if (newPermission === "denied") {
          alert("Notification permission denied.");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    }
  };

  const sendTestNotification = () => {
    const notification = new Notification("Test Notification", {
      body: "This is a test notification!",
      icon: "https://via.placeholder.com/100", // Optional: Replace with your icon
    });
  };

  return (
    <div>
      <h1>Notification Permission Demo</h1>
      <p>Current permission: {permission}</p>
      <button onClick={requestPermission}>
        Request Notification Permission
      </button>
    </div>
  );
};

export default NotificationPermission;
