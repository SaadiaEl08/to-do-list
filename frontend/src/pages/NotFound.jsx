const NotFound = () => {
  return (
    <main
      className={` w-full h-screen bg-background flex flex-col gap-10 items-center justify-center`}
    >
      <img src="/logo.svg" alt="logo" />
      <p className="text-foreground text-4xl font-bold ">
        <span className="text-primary font-bold">U</span>p
        <span className="text-primary font-bold">T</span>odo
      </p>
      <div className=" flex flex-col gap-4 justify-center items-center">
        <h3 className="text-4xl font-bold text-foreground text-center">Not Found !</h3>
        <p className="text-foreground text-lg font-medium text-center">
          The page you are looking for is not found
          <a href="/home" className="text-primary">
            {" "}
            click here
          </a>{" "}
          to go back to home page
        </p>
      </div>
    </main>
  );
};

export default NotFound;
