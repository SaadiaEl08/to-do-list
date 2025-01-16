import { ChevronLeft, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <main className="w-full min-h-screen h-screen bg-background text-foreground flex flex-col justify-evenly items-start p-4">
      <div className="w-full h-full flex flex-col justify-evenly items-start md:w-1/2  m-auto">
        <div className="w-full">
          <ChevronLeft onClick={() => navigate(-1)} />
        </div>
        <h1 className="text-3xl font-bold">Register</h1>
        <div className="w-full flex flex-col gap-4 justify-start items-start">
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your Username"
              className="w-full p-2 placeholder:text-muted-foreground placeholder:opacity-50  border-2 border-muted-foreground bg-input rounded outline-none"
            />
          </div>
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label htmlFor="password">Password</label>
            <div className="w-full flex items-center">
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
                className="w-full  p-2 placeholder:text-muted-foreground placeholder:opacity-50  border-y-2 border-s-2 border-muted-foreground bg-input rounded-s outline-none"
              />
              <EyeClosed className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-full  text-center pe-3 " />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 justify-start items-start">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="w-full flex items-center">
              <input
                type="password"
                id="confirmPassword"
                placeholder="re-enter your Password"
                className="w-full  p-2 placeholder:text-muted-foreground placeholder:opacity-50  border-y-2 border-s-2 border-muted-foreground bg-input rounded-s outline-none"
              />
              <EyeClosed className="border-y-2 border-e-2 border-muted-foreground bg-input rounded-e w-12 h-full  text-center pe-3 " />
            </div>
          </div>
        </div>
        <button
          className="w-full p-2 bg-primary rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
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
