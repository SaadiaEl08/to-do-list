import { useState, useRef, useMemo, useEffect } from "react";
import BigTimerClock from "@/components/BigTimerClock";
import SelectTime from "@/components/SelectTime";
import { Pause, Play, RotateCcw } from "lucide-react";
import SmallClocks from "@/components/SmallClocks";

const Timer = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [selectedTime, setSelectedTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const intervalRef = useRef(null); // Ref to store the interval ID
  const audio = useMemo(() => new Audio("/clockSoundEffect.mp3"), []);

  const scrollToTime = (unit, value) => {
    const container = document.querySelector(`.time-${unit}-container`);
    if (container) {
      const targetChild = container.querySelector(
        `.time-unit:nth-child(${value + 2})`
      );
      if (targetChild) {
        targetChild.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleResetTime = () => {
    audio.pause();
    setSelectedTime({ hours: 0, minutes: 0, seconds: 0 });
    scrollToTime("hours", 0);
    scrollToTime("minutes", 0);
    scrollToTime("seconds", 0);
    setIsCounting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Stop the interval
      intervalRef.current = null;
    }
  };

  const startCounting = () => {
    setIsCounting(true);
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      audio.loop = false; // Ensure it doesn't loop automatically
      audio.pause();
      audio.currentTime = 1.5;
      audio.play();
      setSelectedTime((prevTime) => {
        const { hours, minutes, seconds } = prevTime;
        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        } else {
          audio.pause();
          audio.currentTime = 0;
          clearInterval(intervalRef.current); // Stop the interval when the timer reaches zero
          intervalRef.current = null;
          setIsCounting(false);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
  };

  const stopCounting = () => {
    if (audio) {
      audio.pause(); // Explicitly pause the audio
      audio.currentTime = 0; // Reset the audio to the beginning
    }
    setIsCounting(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Stop the interval
      intervalRef.current = null;
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center p-3  gap-6 h-[80%] sm:gap-10 xl:flex-row xl:flex-wrap xl:gap-0">
      <div className="flex flex-col justify-center items-center w-full gap-y-4  md:flex-row  xl:w-[55%] ">
        <BigTimerClock selectedTime={selectedTime} />
        {/* Mini Clocks */}
        <SmallClocks
          setSelectedTime={setSelectedTime}
          scrollToTime={scrollToTime}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 xl:w-[40%]">
        {!isCounting && (
          <SelectTime
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        )}

        {/* Timer Controls */}
        <div className="flex justify-evenly items-center w-full text-primary">
          <RotateCcw
            className="w-8 h-8 cursor-pointer sm:w-12 sm:h-12 xl:w-10 xl:h-10"  
            onClick={handleResetTime}
          />
          {isCounting ? (
            <Pause
              onClick={stopCounting}
              className="w-8 h-8 cursor-pointer sm:w-12 sm:h-12 xl:w-10 xl:h-10"
            />
          ) : (
            <Play
              onClick={startCounting}
              className="w-8 h-8 cursor-pointer sm:w-12 sm:h-12 xl:w-10 xl:h-10"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
