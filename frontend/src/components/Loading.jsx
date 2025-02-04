const Loading = ({ className, ...props }) => {
  return (
    <div
      style={{ zIndex: "1000" }}
      className={
        `fixed top-0 left-0  w-full min-h-screen h-screen flex flex-col gap-2 justify-center items-center bg-background text-foreground ` +
        className
      }
      {...props}
    >
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <p className="logo-text text-4xl font-bold ">
        {["U", "p", "t", "o", "d", "o"].map((letter, index) => (
          <span
            key={letter + index}
            style={{ animationDelay: `${index * 0.2}s` }}
            className="inline-block"
          >
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Loading;
