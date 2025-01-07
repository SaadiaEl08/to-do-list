import { useState, useRef } from "react";
import BigTimerClock from "@/components/BigTimerClock";
import SelectTime from "@/components/SelectTime";
import { Pause, Play, RotateCcw } from "lucide-react";

const Timer = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [selectedTime, setSelectedTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const proposalsTimers = [
    { id: 1, time: "01:00" },
    { id: 2, time: "05:00" },
    { id: 3, time: "15:00" },
  ];

  const scrollRef = useRef(null);

  const handleMiniClockClick = (time) => {
    const [hours, minutes] = time.split(":").map(Number);

    // Update selected time
    setSelectedTime({ hours, minutes, seconds: 0 });

    // Simulate scroll for each unit
    if (scrollRef.current) {
      scrollRef.current.hours(hours);
      scrollRef.current.minutes(minutes);
      scrollRef.current.seconds(0);
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center pt-3 gap-4">
      <BigTimerClock selectedTime={selectedTime} />

      {/* Mini Clocks */}
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

      <SelectTime
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        simulateScrollToTime={(methods) => (scrollRef.current = methods)}
      />

      {/* Timer Controls */}
      <div className="flex justify-evenly items-center w-full text-primary">
        <RotateCcw
          className="w-8 h-8 cursor-pointer hover:animate-spin"
          onClick={() => {
            setSelectedTime({ hours: 0, minutes: 0, seconds: 0 });
            if (scrollRef.current) {
              scrollRef.current.hours(0);
              scrollRef.current.minutes(0);
              scrollRef.current.seconds(0);
            }
          }}
        />
        {isCounting ? (
          <Pause
            onClick={() => setIsCounting(false)}
            className="w-8 h-8 cursor-pointer"
          />
        ) : (
          <Play
            onClick={() => setIsCounting(true)}
            className="w-8 h-8 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Timer;
