import { ChevronLeft, Eye, EyeClosed } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLoginWithGoogle, useRegister } from "../hooks/Auth.jsx";
import { myToast } from "@/constants.jsx";
import "react-phone-number-input/style.css";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { AuthContext } from "@/contexts/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [registerMethod, setRegisterMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const { mutate, isPending, isError } = useRegister();
  const { lastLocation } = useContext(AuthContext);
  const { register } = useContext(AuthContext);
  const { mutate: googleLoginMutation, isPending: googleLoginPending } =
    useLoginWithGoogle();

  const registerValidation = useCallback(() => {
    if (name === "") {
      return { status: false, message: "Name is required" };
    }
    if (registerMethod === "phone" && !isPossiblePhoneNumber(phoneNumber)) {
      return { status: false, message: "Invalid Phone Number" };
    }
    if (registerMethod == "email" && email === "") {
      return { status: false, message: "Email is required" };
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (registerMethod == "email" && !emailRegex.test(email)) {
      return { status: false, message: "Invalid Email" };
    }
    if (password === "") {
      return { status: false, message: "Password is required" };
    }
    if (password !== confirmedPassword) {
      return { status: false, message: "Passwords do not match" };
    }
    return { status: true, message: "Registration successful" };
  }, [name, registerMethod, phoneNumber, email, password, confirmedPassword]);
  const handleRegister = () => {
    const validated = registerValidation().status;
    if (validated) {
      mutate(
        {
          name,
          email,
          password,
          phoneNumber,
          registerMethod,
        },
        {
          onSuccess: (data) => {
            register(data);
            navigate(lastLocation || "/home", { replace: true });
            myToast(registerValidation().message, "success");
          },
          onError: (error) => {
            console.log(error);
            myToast(
              `Registration failed : ${error.response.data.error.message}`,
              "error"
            );
          },
        }
      );
    }
  };

  const handleGoogleRegister = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Mutate the data when Google login is successful
      googleLoginMutation(tokenResponse.access_token, {
        onSuccess: (data) => {
          register(data);
          navigate(lastLocation || "/home", { replace: true });
          myToast(registerValidation().message, "success");
        },
        onError: (error) => {
          // Handle error
          console.error("Google Registration failed:", error);
          myToast(
            `Registration failed : ${error.response.data.error.message}`,
            "error"
          );
        },
      });
    },
    onError: (error) => {
      console.error("Google login error:", error);
      myToast("Google login failed", "error");
    },
  });

  return (
    <main className="w-full min-h-screen  bg-background text-foreground flex flex-col justify-evenly items-start p-4">
      <div className="w-full h-full  flex flex-col justify-evenly items-start md:w-1/2  m-auto ">
        <div className="w-full">
          <ChevronLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
        </div>
        <h1 className="text-3xl font-bold">Register</h1>
        <div className=" w-full flex flex-col gap-4 justify-start items-start my-5">
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your Name"
              className="w-full p-2 placeholder:text-muted-foreground placeholder:opacity-50  border-2 border-muted-foreground bg-input rounded outline-none"
            />
          </div>
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label htmlFor="email" className="w-full flex justify-between">
              {registerMethod === "" || registerMethod === "email"
                ? "Email"
                : "Phone Number"}
              <span
                className="text-muted-foreground text-end cursor-pointer"
                onClick={() => {
                  setRegisterMethod(
                    registerMethod === "" || registerMethod != "phone"
                      ? "phone"
                      : "email"
                  );
                }}
              >
                or use your{" "}
                {registerMethod !== "phone" ? "Phone Number" : "Email"}
              </span>
            </label>
            {registerMethod == "email" || registerMethod == "" ? (
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Enter your Email"
                className="w-full p-2 placeholder:text-muted-foreground placeholder:opacity-50  border-2 border-muted-foreground bg-input rounded outline-none"
              />
            ) : (
              <div className="w-full flex items-start gap-2  flex-col ">
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="US"
                  className="w-full p-2 border-2 border-muted-foreground bg-input rounded"
                  onChange={setPhoneNumber}
                  value={phoneNumber || ""}
                />
                {phoneNumber != "" &&
                  !isPossiblePhoneNumber(phoneNumber || "") && (
                    <span className="text-red-500 text-xs">
                      Invalid Phone Number
                    </span>
                  )}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label htmlFor="password">Password</label>
            <div className="w-full flex items-center">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                className="w-full  p-2 placeholder:text-muted-foreground placeholder:opacity-50  border-y-2 border-s-2 border-muted-foreground bg-input rounded-s outline-none"
              />
              {showPassword ? (
                <Eye
                  className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-11  text-center pe-3 "
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeClosed
                  className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-11  text-center pe-3 "
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="w-full flex items-center">
              <input
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                type={showConfirmedPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="re-enter your Password"
                className="w-full  p-2 placeholder:text-muted-foreground placeholder:opacity-50  border-y-2 border-s-2 border-muted-foreground bg-input rounded-s outline-none"
              />
              {showConfirmedPassword ? (
                <Eye
                  className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-11  text-center pe-3 "
                  onClick={() => setShowConfirmedPassword(false)}
                />
              ) : (
                <EyeClosed
                  className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-11  text-center pe-3 "
                  onClick={() => setShowConfirmedPassword(true)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          className="w-full p-2 bg-primary rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            registerValidation().status === false ||
            isPending ||
            googleLoginPending
          }
          onClick={handleRegister}
        >
          Register{isPending && !isError && "ing..."}
        </button>
        <div className="w-full h-fit flex items-center justify-center gap-1">
          <div className="w-full border border-muted-foreground gap-2"></div>
          <div className="pb-1 flex items-center justify-center text-muted-foreground">
            or
          </div>
          <div className="w-full border border-muted-foreground"></div>
        </div>
        <div className="w-full flex flex-col gap-4 items-center">
          <button
            onClick={handleGoogleRegister}
            disabled={isPending || googleLoginPending}
            className="w-full border border-primary h-12 rounded flex gap-1 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/google.svg" alt="google icon" /> Register with Google
          </button>
          <button
            disabled={isPending || googleLoginPending}
            className="w-full border border-primary h-12 rounded flex gap-1 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src="/apple.svg" alt="apple icon" /> Register with Appel
          </button>
        </div>
        <div className="text-xs mx-auto mt-3">
          <span className="text-muted-foreground">
            Already have an account?
          </span>{" "}
          <Link to="/login">Login</Link>{" "}
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default SignUp;
