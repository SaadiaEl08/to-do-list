import { ChevronLeft, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegister } from "../hooks/Auth.jsx";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const { mutate, isLoading, error } = useRegister();
  console.log(mutate);

  const handleRegister = () => {
    mutate({ username, password }, { onSuccess: () => navigate("/home") });
    error && console.log(error);
  };
  return (
    <main className="w-full min-h-screen h-screen bg-background text-foreground flex flex-col justify-evenly items-start p-4">
      <div className="w-full h-full flex flex-col justify-evenly items-start md:w-1/2  m-auto">
        <div className="w-full">
          <ChevronLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
        </div>
        <h1 className="text-3xl font-bold">Register</h1>
        <div className="w-full flex flex-col gap-4 justify-start items-start">
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label htmlFor="username">Username, Email or Phone Number</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              placeholder="Enter your Username, Email or Phone Number"
              className="w-full p-2 placeholder:text-muted-foreground placeholder:opacity-50  border-2 border-muted-foreground bg-input rounded outline-none"
            />
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
                  className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-full  text-center pe-3 "
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeClosed
                  className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-full  text-center pe-3 "
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
                  className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-full  text-center pe-3 "
                  onClick={() => setShowConfirmedPassword(false)}
                />
              ) : (
                <EyeClosed
                  className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-full  text-center pe-3 "
                  onClick={() => setShowConfirmedPassword(true)}
                />
              )}
            </div>
          </div>
        </div>
        <button
          className="w-full p-2 bg-primary rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            username != "" && password != "" && confirmedPassword === password
              ? false
              : true
          }
          onClick={handleRegister}
        >
          Register
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
            <img src="/google.svg" alt="google icon" /> Register with Google
          </button>
          <button className="w-full border border-primary h-12 rounded flex gap-1 items-center justify-center">
            <img src="/apple.svg" alt="apple icon" /> Register with Appel
          </button>
        </div>
        <div className="text-xs mx-auto">
          <span className="text-muted-foreground">
            Already have an account?
          </span>{" "}
          <Link to="/login">Login</Link>{" "}
        </div>
      </div>
    </main>
  );
};

export default SignUp;
