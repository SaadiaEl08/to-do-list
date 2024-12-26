const Loading = ({ className, ...props }) => {
  return (
    <div className={`w-full h-screen flex flex-col gap-2 justify-center items-center bg-background text-foreground ` + className} {...props}>
      <div className="logo">
        <img src="/logo.svg" />
      </div>
      <span className="text-4xl font-bold">
        UpTodo
      </span>
    </div>
  );
};

export default Loading;