import { useState } from "react";
import onBoard1 from "../../assets/images/onBoard1.png";
import onBoard2 from "../../assets/images/onBoard2.png";
import "./Onboarding.css";
import { Link } from "react-router-dom";

export default function OnboardOne() {
  const [onBoard, setOnBoard] = useState(1);
  return (
    <div
      className="h-full onBoardWrapper"
      style={{ backgroundColor: "#0c1419" }}
    >
      <div className="h-full flex flex-col items-center justify-between p-6">
        <div className="onBoardHeader">
          <img
            src={onBoard === 1 ? onBoard1 : onBoard2}
            alt="OnBoard Illustration"
            className="onBoardImg md:mx-auto"
          />
          <p className="onBoardTitle md:text-center">
            {onBoard === 1 ? "Ease Your Exam Prep" : "Study Smart"}
          </p>
          <p className="onBoardSubTitle sm:text-center">
            {onBoard === 1
              ? "Upload your questions with answers, and we will send reminders to help you stay on track with your study."
              : "Get personalized reminders to help you stay on track and ace your exams."}
          </p>
        </div>
        <div className="onBoardFooter w-full">
          {onBoard === 1 ? (
            <button className="onBoardBtn" onClick={() => setOnBoard(2)}>
              Next
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="onBoardBtn">Get Started</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
