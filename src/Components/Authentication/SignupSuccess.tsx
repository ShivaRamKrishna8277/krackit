import confetti from "canvas-confetti";
import successIcon from "../../assets/icons/signupSuccessIcon.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function ConfettiSideCannons() {
  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = () => {
    const end = Date.now() + 2 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 1,
        angle: 60,
        spread: 50,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/home", { replace: true });
  }, 5000);

  return (
    <div className="h-screen w-full grid place-items-center">
      <div className="text-center">
        <img src={successIcon} alt="Signup Success" className="mx-auto" />
        <p className="title">Congrats!</p>
        <p className="subTitle w-64">
          You have signed up successfully. Redirecting to home....
        </p>
      </div>
    </div>
  );
}
