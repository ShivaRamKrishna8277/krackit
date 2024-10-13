import "./DisplayBasket.css";
import basketArrow from "../../../assets/icons/basketArrow.svg";
import completedTickIcon from "../../../assets/icons/completedTickIcon.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface props {
  id: number;
  basketType: string;
  width: number;
  startDate: string;
  endDate: string;
  basketTitle: string;
}

export default function DisplayBasket({
  id,
  basketType,
  width,
  basketTitle,
  startDate,
  endDate,
}: props) {
  function getDateDifference(endDate: string): number {
    // Get current date
    const date = new Date(); // Get the current date
    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
    const year = date.getFullYear();
    const currentDate = `${day}-${month}-${year}`;

    // Parse the date strings in DD-MM-YYYY format
    const [startDay, startMonth, startYear] = currentDate
      .split("-")
      .map(Number);
    const [endDay, endMonth, endYear] = endDate.split("-").map(Number);

    // Create Date objects
    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    // Calculate the difference in time (milliseconds)
    const timeDifference = end.getTime() - start.getTime();

    // Convert time difference to days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference < 0 ? 0 : daysDifference;
  }

  const [randomColor, setrandomColor] = useState("#fafafa");
  const colors: string[] = ["#F8FD91", "#CB9AFB", "#6BE1B3"];
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  useEffect(() => {
    setrandomColor(getRandomColor());
  }, []);

  return (
    <Link to={`/basket/${id}`}>
      <div className="basketDisplayWrapper relative">
        <div className="basketDLeft">
          {basketType === "pending" ? (
            <div
              className="basketTimer"
              style={{ backgroundColor: `${randomColor}` }}
            >
              <p className="daysLeft">{getDateDifference(endDate)}</p>
              <p className="daysLeftText">days left</p>
            </div>
          ) : (
            <div
              className="basketTimer"
              style={{ backgroundColor: `${randomColor}` }}
            >
              <img src={completedTickIcon} alt="-" />
            </div>
          )}
          <div className="basketDetails">
            <p className="basketTitle truncate" style={{ width: "70%" }}>
              {basketTitle}
            </p>
            <div className="basketTimeline">
              <p className="createdOn">{startDate}</p>
              <p>--</p>
              <p className="createdOn">{endDate}</p>
            </div>
          </div>
        </div>
        <div className="basketRight" style={{ width: "10%" }}>
          <img src={basketArrow} alt="open" className="mx-auto" />
        </div>
        <div
          className="basketProgressBar absolute"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </Link>
  );
}
