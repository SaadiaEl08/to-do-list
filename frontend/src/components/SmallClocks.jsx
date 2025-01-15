const SmallClocks = ({setSelectedTime,scrollToTime}) => {
  const proposalsTimers = [
    { id: 1, time: "01:00" },
    { id: 2, time: "05:00" },
    { id: 3, time: "15:00" },
  ];
  const handleMiniClockClick = (time) => {
    const minutes = time.split(":").map(Number)[0];
    setSelectedTime({ hours: 0, minutes, seconds: 0 });
    scrollToTime("hours", 0);
    scrollToTime("minutes", minutes);
    scrollToTime("seconds", 0); 
  };
  return (
    <div className="proposals-timers w-full flex justify-center items-center gap-4 md:flex-col md:w-1/2 lg:w-1/3 xl:w-1/3  ">
      {proposalsTimers.map((item) => (
        <div
          key={item.id}
          className="time-circle flex flex-col justify-center items-center border-4 border-primary bg-muted rounded-full w-1/5 aspect-square cursor-pointer md:w-2/4 xl:w-1/3"
          onClick={() => handleMiniClockClick(item.time)}
        >
          <span className="text-xl text-foreground sm:text-3xl xl:text-xl">{item.time}</span>
        </div>
      ))}
    </div>
  );
};

export default SmallClocks;
