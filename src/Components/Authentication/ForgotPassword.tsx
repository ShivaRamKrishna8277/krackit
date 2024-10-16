import { useState } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../../firebase";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError(
        "Error sending password reset email. Please check if the email is correct."
      );
      setMessage("");
    }
  };

  return (
    <div
      className="p-6 h-screen text-white"
      style={{ backgroundColor: "#0c1419" }}
    >
      <div className="authenticationHeader">
        <p className="title">Forgot Password</p>
        <p className="subTitle">
          Please enter Email Address to get password reset link.
        </p>
      </div>
      <div className="authenticationFormWrapper mt-4">
        <form action="" id="loginForm" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <br />
          <button className="authenticationSubmitBtn">Reset Password</button>
        </form>
      </div>
      <p className="redirectionLink text-center">
        <span onClick={() => navigate("/login", { replace: true })}>
          Back to login
        </span>
      </p>
    </div>
  );
}
