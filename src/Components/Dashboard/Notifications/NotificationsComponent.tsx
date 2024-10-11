import { Link } from "react-router-dom";
import unReadIcon from "../../../assets/icons/unReadIcon.svg";

interface notificationData {
  title: string;
  subTitle: string;
  to: string;
  status: string;
}

export default function Notification({
  title,
  subTitle,
  to,
  status,
}: notificationData) {
  return (
    <Link to={to}>
      <div
        className={`NotificationContentWrapper ${
          status === "unread" ? "opacity-100" : "opacity-30"
        }`}
      >
        <div>
          <p className="NotificationTitle">{title}</p>
          <p className="NotificationSubTitle">{subTitle}</p>
        </div>
        {status === "unread" && (
          <img src={unReadIcon} alt="-" className="notificationIcon" />
        )}
      </div>
    </Link>
  );
}
