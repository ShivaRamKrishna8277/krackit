import "./Notification.css";
import Navbar from "../Navbar/Navbar";
import Notification from "./NotificationsComponent";
import notifications from "../../../assets/Data/notifications.json";

interface notificationData {
  id: number;
  title: string;
  subTitle: string;
  to: string;
  status: string;
}
const AllNotifications: notificationData[] = notifications.notifications;

export default function Notifications() {
  return (
    <>
      <Navbar />
      <div className="px-4 bg-white h-screen">
        <p className="subTitle mb-2">Notifications</p>
        <div>
          <ul id="notificationWrapper" className="border rounded">
            {AllNotifications.map((notification) => (
              <li key={notification.id}>
                <Notification
                  title={notification.title}
                  subTitle={notification.subTitle}
                  to="/home"
                  status={notification.status}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
