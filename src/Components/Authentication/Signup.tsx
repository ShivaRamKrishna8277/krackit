import { useNavigate } from "react-router-dom";
import "./Authentication.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { signUp } from "./authService";
import { FirebaseError } from "firebase/app";

type Inputs = {
  email: string;
  password: string;
  confirmpassword: string;
  fullname: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsSigningUp(true);
      await signUp(data.email, data.password, data.fullname);
      navigate("/signupsuccess", { replace: true });
      // You can now handle any redirects or further actions
    } catch (error) {
      setIsSigningUp(false);

      // Assert that the error is of type FirebaseError
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-email") {
          setError("email", {
            type: "manual",
            message: "Invalid Email Address",
          });
        } else if (error.code === "auth/email-already-in-use") {
          setError("email", {
            type: "manual",
            message: "Email is already in use",
          });
        } else {
          console.error("Sign-up error:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const password = watch("password");
  const [ShowPassword, setShowPassword] = useState(false);

  return (
    <div
      className="p-6 h-screen text-white"
      style={{ backgroundColor: "#0c1419" }}
    >
      <div className="authenticationHeader">
        <p className="title">Signup</p>
        <p className="subTitle">
          Please enter your details below to create a new account.
        </p>
      </div>
      <div className="authenticationFormWrapper mt-4">
        <form action="" id="signupForm" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("fullname", {
              required: "Full Name is required",
            })}
            type="text"
            placeholder="Full Name"
            id="signupFullName"
            className={errors.fullname && "errorBorder"}
          />
          {errors.fullname && (
            <span className="errorMessage">{errors.fullname.message}</span>
          )}
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
            id="signupEmail"
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
                  message: "Password must be at least 6 characters.",
                },
              })}
              type={ShowPassword ? "text" : "password"}
              placeholder="Password"
              id="signupPassword"
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
          <input
            {...register("confirmpassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            placeholder="Confirm Password"
            id="signupConfirmPassword"
            className={errors.confirmpassword && "errorBorder"}
            onPaste={(e) => e.preventDefault()}
          />
          {errors.confirmpassword && (
            <span className="errorMessage">
              {errors.confirmpassword.message}
            </span>
          )}
          <button
            className="authenticationSubmitBtn"
            disabled={isSigningUp && true}
          >
            {isSigningUp ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ps-2">Creating Account...</span>
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
      <p className="redirectionLink">
        Already have an account?{" "}
        <span onClick={() => navigate("/login", { replace: true })}>Login</span>
      </p>
    </div>
  );
}
