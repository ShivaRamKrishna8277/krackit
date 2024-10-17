import { Link } from "react-router-dom";
import openArrow from "../../../assets/icons/basketArrow.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface props {
  question: string;
  index: number;
  id: string;
  day: string;
  time: string;
  status: string;
}

export default function BasketListQuestion({
  question,
  index,
  id,
  day,
  time,
  status,
}: props) {
  return (
    <Link to={`/read/${id}/${day}/${time}/${index}`}>
      <div className="ListQuestion flex items-center justify-between border-b py-2">
        <span className="flex items-center gap-1">
          <span>
            {status === "completed" ? (
              <CheckCircleIcon color="success" fontSize="small" />
            ) : (
              `${index + 1} . `
            )}
          </span>
          <span>{question}</span>
        </span>
        <img src={openArrow} alt="" style={{ width: "10px" }} />
      </div>
    </Link>
  );
}
