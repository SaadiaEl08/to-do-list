const BigTimerClock = ({selectedTime}) => {
  return (
    <div className="time-circle flex flex-col justify-center items-center border-[12px] border-slate-600 bg-primary rounded-full w-3/5 aspect-square lg:w-1/2 xl:w-2/5">
      <span className="text-4xl text-foreground sm:text-6xl  xl:text-4xl ">
        {`${String(selectedTime.hours).padStart(2, "0")}:${String(
          selectedTime.minutes
        ).padStart(2, "0")}:${String(selectedTime.seconds).padStart(2, "0")}`}
      </span>
    </div>
  );
};

export default BigTimerClock;
