const SmallClocks = ({setSelectedTime,scrollToTime}) => {
  const proposalsTimers = [
    { id: 1, time: "01:00" },
    { id: 2, time: "05:00" },
    { id: 3, time: "15:00" },
  ];
  const handleMiniClockClick = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    setSelectedTime({ hours, minutes, seconds: 0 });
    scrollToTime("hours", hours);
    scrollToTime("minutes", minutes);
    scrollToTime("seconds", 0); // Default to 0 seconds
  };
  return (
    <div className="proposals-timers w-full flex justify-center items-center gap-4">
      {proposalsTimers.map((item) => (
        <div
          key={item.id}
          className="time-circle flex flex-col justify-center items-center border-4 border-slate-600 bg-slate-800 rounded-full w-1/5 aspect-square cursor-pointer"
          onClick={() => handleMiniClockClick(item.time)}
        >
          <span className="text-xl text-foreground">{item.time}</span>
        </div>
      ))}
    </div>
  );
};

export default SmallClocks;
