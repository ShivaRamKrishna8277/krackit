import { useNavigate } from "react-router-dom";
import "./Authentication.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { logIn } from "./authService";
import { FirebaseError } from "firebase/app";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoggingIn(true);
    try {
      await logIn(data.email, data.password);
      navigate("/home", { replace: true });
    } catch (error) {
      setIsLoggingIn(false);
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          setError("email", {
            type: "manual",
            message: "Invalid Credentials",
          });
          setError("password", {
            type: "manual",
            message: "Invalid Credentials",
          });
        } else if (error.code === "auth/user-not-found") {
          setError("email", {
            type: "manual",
            message: "No user found with this email.",
          });
        } else if (error.code === "auth/user-disabled") {
          setError("email", {
            type: "manual",
            message: "This user has been disabled.",
          });
        } else if (error.code === "auth/too-many-requests") {
          setError("email", {
            type: "manual",
            message:
              "Too many unsuccessful login attempts. Please try again later.",
          });
        } else if (error.code === "auth/operation-not-allowed") {
          setError("email", {
            type: "manual",
            message: "The operation is not allowed. Please contact support.",
          });
        } else {
          console.error("Login error:", error.message);
        }
      }
    }
  };

  const [ShowPassword, setShowPassword] = useState(false);
  return (
    <div
      className="p-6 h-screen text-white"
      style={{ backgroundColor: "#0c1419" }}
    >
      <div className="authenticationHeader">
        <p className="title">Login</p>
        <p className="subTitle">Please enter your details below to login.</p>
      </div>
      <div className="authenticationFormWrapper mt-4">
        <form action="" id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                if (!value.includes("@")) {
                  return "Invalid Email Address";
                }
                return true;
              },
            })}
            type="text"
            placeholder="Email Address"
            id="loginEmail"
            className={errors.email && "errorBorder"}
          />
          {errors.email && (
            <span className="errorMessage">{errors.email.message}</span>
          )}
          <br />
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must atleast 6 characters.",
                },
              })}
              type="password"
              placeholder="Password"
              id="loginPassword"
              className={errors.password && "errorBorder"}
              onPaste={(e) => e.preventDefault()}
            />
            <FontAwesomeIcon
              icon={ShowPassword ? faEye : faEyeSlash}
              size="sm"
              className="absolute right-5 bottom-5 cursor-pointer"
              onClick={() => setShowPassword(!ShowPassword)}
            />
          </div>
          {errors.password && (
            <span className="errorMessage">{errors.password.message}</span>
          )}
          <button
            className="authenticationSubmitBtn"
            disabled={isLoggingIn && true}
          >
            {isLoggingIn ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ps-2">Logging In...</span>
              </>
            ) : (
              "Login In"
            )}
          </button>
        </form>
      </div>
      <div className="flex items-center justify-between">
        <p className="redirectionLink">
          Dont have an account?{" "}
          <span onClick={() => navigate("/signup", { replace: true })}>
            Signup
          </span>
        </p>
        <p
          className="redirectionLink text-blue-700"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password
        </p>
      </div>
    </div>
  );
}
