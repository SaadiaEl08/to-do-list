const BigTimerClock = ({selectedTime}) => {
  return (
    <div className="time-circle flex flex-col justify-center items-center border-[20px] border-slate-600 bg-primary rounded-full w-3/5 aspect-square">
      <span className="text-4xl text-foreground">
        {`${String(selectedTime.hours).padStart(2, "0")}:${String(
          selectedTime.minutes
        ).padStart(2, "0")}:${String(selectedTime.seconds).padStart(2, "0")}`}
      </span>
    </div>
  );
};

export default BigTimerClock;
