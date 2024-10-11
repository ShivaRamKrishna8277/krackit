import { Link, useNavigate } from "react-router-dom";
import "./Authentication.css";
import { useForm, SubmitHandler } from "react-hook-form";
import gooogleIcon from "../../assets/icons/Google.png";
import facebookIcon from "../../assets/icons/Facebook.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

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
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    navigate("/signupsuccess");
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
          <button className="authenticationSubmitBtn">Create Account</button>
        </form>
      </div>
      <p className="redirectionLink">
        Already have an account?{" "}
        <span>
          <Link to={"/login"}>Login</Link>
        </span>
      </p>
      <div className="otherAuthWrapper">
        <button className="otherAuthBtn">
          <img src={gooogleIcon} alt="" className="otherAuthIcon" />
          <span>Continue with Google</span>
        </button>
        <button className="otherAuthBtn">
          <img src={facebookIcon} alt="" className="otherAuthIcon" />
          <span>Continue with Facebook</span>
        </button>
      </div>
    </div>
  );
}
