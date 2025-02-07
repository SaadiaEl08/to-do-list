import { ChevronLeft, Eye, EyeClosed } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { useLogin } from "@/hooks/Auth";
import { myToast } from "@/constants";
import { AuthContext } from "@/contexts/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { mutate, isPending, isError } = useLogin();
  const [loginMethod, setLoginMethod] = useState("email");
  const { setIsAuthenticated, lastLocation } = useContext(AuthContext);

  const loginValidation = useCallback(() => {
    if (email === "" && phoneNumber === "") {
      return { status: false, message: "Email or Phone number is required" };
    }
    if (password === "") {
      return { status: false, message: "Password is required" };
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (loginMethod === "email" && !emailRegex.test(email)) {
      return { status: false, message: "Invalid Email" };
    }
    if (loginMethod === "phone" && !isPossiblePhoneNumber(phoneNumber)) {
      return { status: false, message: "Invalid Phone Number" };
    }
    return { status: true, message: "Login successful" };
  }, [email, phoneNumber, password, loginMethod]);
  const handleLogin = () => {
    const validated = loginValidation().status;
    if (!validated) {
      myToast(loginValidation().message, "error");
      return;
    }
    const identifier = loginMethod === "email" ? email : phoneNumber;
    const credentials = { identifier, password };
    mutate(
      { credentials },
      {
        onSuccess: () => {
          setIsAuthenticated(true);
          navigate(lastLocation || "/home", { replace: true });
          myToast("Login Successful", "success");
        },
        onError: (error) => {
          setIsAuthenticated(false);
          myToast(error.response.data.error.message, "error");
        },
      }
    );
  };
  const handleFakeLogin = () => {
    localStorage.setItem("user", "fake-user");
    navigate("/home");
  };
  const {fakeLogin}=useContext(AuthContext);
  return (
    <main className="w-full min-h-screen h-screen bg-background text-foreground flex flex-col justify-evenly items-start p-4">
      <div className="w-full h-full flex flex-col justify-evenly items-start md:w-1/2  m-auto">
        <div className="w-full">
          <ChevronLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
        </div>
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="w-full flex flex-col gap-4 justify-start items-start">
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label htmlFor="email" className="w-full flex justify-between">
              {loginMethod === "email" ? "Email" : "Phone Number"}
              <span
                className="text-muted-foreground text-end cursor-pointer"
                onClick={() => {
                  setLoginMethod(loginMethod === "phone" ? "email" : "phone");
                }}
              >
                or use your {loginMethod === "email" ? "Phone Number" : "Email"}
              </span>
            </label>
            {loginMethod !== "phone" ? (
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

          <div className="w-full flex flex-col gap-2 justify-start items-start mb-3">
            <label htmlFor="password">Password</label>
            <div className="w-full flex items-center">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                className="w-full h-full p-2 placeholder:text-muted-foreground placeholder:opacity-50  border-y-2 border-s-2 border-muted-foreground bg-input rounded-s outline-none"
              />
              {showPassword ? (
                <Eye
                  className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-12  text-center pe-3 "
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeClosed
                  className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-12  text-center pe-3 "
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          className="w-full p-2 bg-primary rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loginValidation().status === false || isPending}
          onClick={handleLogin}
        >
          Login{isPending && !isError && "..."}
        </button>
        <button
          className="w-full p-2 bg-primary rounded disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={fakeLogin}
        >
          Login without a real authentication needed only to view the work
        </button>
        <div className="w-full h-fit flex items-center justify-center gap-1">
          <div className="w-full border border-muted-foreground gap-2"></div>
          <div className="pb-1 flex items-center justify-center text-muted-foreground">
            or
          </div>
          <div className="w-full border border-muted-foreground"></div>
        </div>
        <div className="w-full flex flex-col gap-4 items-center">
          <button className="w-full border border-primary h-12 rounded flex gap-1 items-center justify-center">
            <img src="/google.svg" alt="google icon" /> Login with Google
          </button>
          <button className="w-full border border-primary h-12 rounded flex gap-1 items-center justify-center">
            <img src="/apple.svg" alt="apple icon" /> Login with Appel
          </button>
        </div>
        <div className="text-xs mx-auto">
          <span className="text-muted-foreground">Don’t have an account?</span>{" "}
          <Link to="/register">Register</Link>{" "}
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default SignIn;
