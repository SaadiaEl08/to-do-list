import { motion } from "motion/react";
const Loading = ({ className, ...props }) => {
  return (
    <div
      className={
        `fixed top-0 left-0  w-full min-h-screen h-screen flex flex-col gap-2 justify-center items-center bg-background text-foreground ` +
        className
      }
      {...props}
    >
      <div
        className="logo"
        
      >
        <img src="/logo.svg" />
      </div>
      <span className="text-4xl font-bold">UpTodo</span>
    </div>
  );
};

export default Loading;
