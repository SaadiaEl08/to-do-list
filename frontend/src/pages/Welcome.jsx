import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen h-screen flex flex-col justify-start items-center bg-background text-foreground p-4 pb-10 ">
      <div className="w-full pt-5 md:w-1/2">
        <ChevronLeft
          onClick={() => navigate("/")}
        />
      </div>
      <div className=" w-full h-full flex flex-col justify-between items-center md:w-1/2 ">
        <div className="w-full h-[50%] flex flex-col justify-center items-center gap-6">
          <h1 className="title text-3xl font-bold">Welcome to UpTodo</h1>
          <p className="text w-full text-center text-foreground opacity-80">
            Please login to your account or create new account to continue
          </p>
        </div>
        <div className="w-full  flex flex-col justify-between items-center gap-4">
          <Link to="/login" className="w-full">
            <button className="w-full h-12 bg-primary px-6 py-3 rounded ">
              LOGIN
            </button>
          </Link>
          <Link to="/register" className="w-full">
            <button className="w-full h-12 border-2 border-primary text-foreground">
              CREATE ACCOUNT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
