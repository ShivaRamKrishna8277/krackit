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
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    navigate("/home");
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
          <button className="authenticationSubmitBtn">Login</button>
        </form>
      </div>
      <p className="redirectionLink">
        Dont have an account?{" "}
        <span>
          <Link to={"/signup"}>Signup</Link>
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
