/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

const SelectTime = ({
  selectedTime,
  setSelectedTime,
  simulateScrollToTime,
}) => {
  const [scrollDone, setScrollDone] = useState(false);
  const itemHeight = 36;
  const timeUnits = ["hours", "minutes", "seconds"];

  // Create numbers for each unit
  const createNumbers = (count) => Array.from({ length: count }, (_, i) => i);

  // Refs for each time unit
  const refs = timeUnits.reduce((acc, unit) => {
    acc[unit] = useRef(null);
    return acc;
  }, {});

  // Get selected time from the visible item in the container
  const getSelectedTimeFromVisibleItem = (unit) => {
    const container = refs[unit].current;
    const children = Array.from(container.children);
    const visibleChild = children.filter((child) => {
      const rect = child.getBoundingClientRect();
      return (
        rect.top >= container.getBoundingClientRect().top &&
        rect.bottom <= container.getBoundingClientRect().bottom
      );
    })[1];
    return visibleChild ? visibleChild.innerText : null;
  };

  // Handle scrolling logic
  const handleScroll = (unit, e) => {
    const container = refs[unit].current;
    const firstChild = container.firstElementChild;
    const lastChild = container.lastElementChild;

    if (e.target.scrollTop <= itemHeight) {
      // Scroll up
      lastChild && container.prepend(container.removeChild(lastChild));
    } else if (
      e.target.scrollTop + e.target.clientHeight >=
      e.target.scrollHeight
    ) {
      // Scroll down
      firstChild && container.append(container.removeChild(firstChild));
    }

    setScrollDone(true);
  };

  // Programmatically simulate a scroll event
  const scrollToTime = (unit, value) => {
    const container = refs[unit].current;
    if (container) {
      const scrollPosition = value * itemHeight;
      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Expose scrollToTime for external use
  useEffect(() => {
    if (simulateScrollToTime) {
      simulateScrollToTime({
        hours: (value) => scrollToTime("hours", value),
        minutes: (value) => scrollToTime("minutes", value),
        seconds: (value) => scrollToTime("seconds", value),
      });
    }
  }, [simulateScrollToTime]);

  // Update selected time when scrolling is done
  useEffect(() => {
    if (scrollDone) {
      const updatedTime = timeUnits.reduce((acc, unit) => {
        const value = getSelectedTimeFromVisibleItem(unit);
        if (value) acc[unit] = parseInt(value, 10);
        return acc;
      }, {});

      setSelectedTime(updatedTime);
      setScrollDone(false);
    }
  }, [scrollDone, setSelectedTime]);

  return (
    <div className="relative time-selector w-full flex justify-evenly items-center gap-4 text-foreground text-3xl overflow-hidden">
      {timeUnits.map((unit) => (
        <div
          key={unit}
          ref={refs[unit]}
          style={{ height: `${itemHeight * 3}px` }}
          className="time-unit-container hide-scrollbar overflow-auto flex flex-col w-[60px] items-center snap-y snap-mandatory scroll-smooth"
          onScroll={(e) => handleScroll(unit, e)}
        >
          {createNumbers(unit === "hours" ? 24 : 60).map((num) => (
            <div
              key={`${unit}-${num}`}
              style={{ height: `${itemHeight}px` }}
              className={`time-unit snap-center flex justify-center items-center z-10 w-full cursor-pointer ${
                selectedTime[unit] === num ? "text-primary font-bold" : ""
              }`}
            >
              {String(num).padStart(2, "0")}
            </div>
          ))}
        </div>
      ))}
      <div
        style={{
          height: `${itemHeight}px`,
        }}
        className="w-[350px] absolute rounded-full bg-slate-500 z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      ></div>
    </div>
  );
};

export default SelectTime;
