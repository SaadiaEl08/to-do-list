import { use } from "react";
import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const proposalsTimers = [
    { id: 1, time: "01:00" },
    { id: 2, time: "05:00" },
    { id: 3, time: "15:00" },
  ];

  const [selectedTime, setSelectedTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const refs = {
    hours: useRef(null),
    minutes: useRef(null),
    seconds: useRef(null),
  };
  const itemHeight = 40;

  useEffect(() => {
    setTimeout(() => {
      if ((refs.hours.current, refs.minutes.current, refs.seconds.current)) {
        refs.hours.current.scrollTop = itemHeight ; // Set desired scroll position
        refs.minutes.current.scrollTop = itemHeight; // Set desired scroll position
        refs.seconds.current.scrollTop = itemHeight; // Set desired scroll position
      }
    }, 0); // Small delay to wait for rendering
  }, [refs.hours, refs.minutes, refs.seconds]);

  const createNumbers = (count) => Array.from({ length: count }, (_, i) => i);
  const Numbers = (unit) => {
    const totalItems = unit === "hours" ? 24 : 60;
    const numbers = createNumbers(totalItems);
    // Add extra items at the start and end for seamless infinite scrolling
    return numbers.map((num, index) => (
      <div
        key={`${unit}-${index}`}
        style={{ height: `${itemHeight}px` }}
        className={`snap-center flex justify-center items-center z-10 w-full ${
          selectedTime[unit] === num ? "text-primary font-bold" : ""
        }`}
      >
        {String(num).padStart(2, "0")}
      </div>
    ));
  };

  const handleScroll = (unit, e) => {
    const element = e.target;
    if (element.scrollTop < itemHeight) {
      const firstChild = refs[unit].current.firstElementChild; //00
      const lastChild = refs[unit].current.lastElementChild; //23

      if (lastChild) {
        // Move the last child to the top
        refs[unit].current.removeChild(lastChild);
        firstChild.before(lastChild);
      }
    } else if (
      element.scrollTop + element.clientHeight ===
      element.scrollHeight
    ) {
      const firstChild = refs[unit].current.firstElementChild;
      const lastChild = refs[unit].current.lastElementChild;

      if (firstChild) {
        // Move the first child to the bottom
        refs[unit].current.removeChild(firstChild);
        lastChild.after(firstChild);
      }
    }
  };

  return (
    <div className="container border flex flex-col justify-center items-center pt-3 gap-4">
      <div className="time-circle flex flex-col justify-center items-center border-[20px] border-slate-600 bg-primary rounded-full w-3/5 aspect-square">
        <span className="text-4xl text-foreground">
          {`${String(selectedTime.hours).padStart(2, "0")}:${String(
            selectedTime.minutes
          ).padStart(2, "0")}:${String(selectedTime.seconds).padStart(2, "0")}`}
        </span>
      </div>

      <div className="proposals-timers w-full flex justify-center items-center gap-4">
        {proposalsTimers.map((item) => (
          <div
            key={item.id}
            className="time-circle flex flex-col justify-center items-center border-4 border-slate-600 bg-slate-800 rounded-full w-1/4 aspect-square cursor-pointer"
          >
            <span className="text-2xl text-foreground">{item.time}</span>
          </div>
        ))}
      </div>

      <div className="relative time-selector border w-full flex justify-evenly items-center gap-4 text-foreground text-3xl overflow-hidden">
        {["hours", "minutes", "seconds"].map((unit) => (
          <div
            key={unit}
            ref={refs[unit]}
            style={{ height: `${itemHeight * 3}px` }}
            className="time-unit-container overflow-auto flex flex-col w-[60px] items-center snap-y snap-mandatory scroll-smooth"
            onScroll={(e) => handleScroll(unit, e)}
          >
            {Numbers(unit)}
          </div>
        ))}
        <div
          style={{
            height: `${itemHeight}px`,
          }}
          className="w-[350px] absolute rounded-full bg-slate-500 z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        ></div>
      </div>
    </div>
  );
};

export default Timer;
