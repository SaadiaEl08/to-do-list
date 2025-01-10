/* eslint-disable react/prop-types */
import { useRef, useCallback, useMemo } from "react";
const SelectTime = ({ selectedTime, setSelectedTime }) => {
  const itemHeight = 36;
  const timeUnits = useMemo(() => ["hours", "minutes", "seconds"], []);
  // Create numbers for each unit
  const createNumbers = (count) => Array.from({ length: count }, (_, i) => i);

  // Refs for each time unit
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const refs = useMemo(
    () => ({
      hours: hoursRef,
      minutes: minutesRef,
      seconds: secondsRef,
    }),
    []
  );

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const handleScroll = useCallback(() => {
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
      return visibleChild ? Number(visibleChild.innerText) : 0;
    };
    timeUnits.forEach((unit) => {
      const newValue = getSelectedTimeFromVisibleItem(unit);
      if (newValue) {
        setSelectedTime((prevSelectedTime) => ({
          ...prevSelectedTime,
          [unit]: newValue,
        }));
      }
    });
  }, [refs, setSelectedTime, timeUnits]);
  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, 100),
    [handleScroll]
  );

  return (
    <div className="relative time-selector w-full flex justify-evenly items-center gap-4 text-foreground text-3xl overflow-hidden">
      {timeUnits.map((unit) => (
        <div
          key={unit}
          ref={refs[unit]}
          style={{ height: `${itemHeight * 3}px` }}
          onScroll={debouncedHandleScroll}
          className={`time-${unit}-container hide-scrollbar overflow-auto flex flex-col w-[60px] items-center snap-y snap-mandatory scroll-smooth`}
        >
          <div
            className="w-full text-transparent "
            style={{ height: `${itemHeight}px` }}
          >
            j
          </div>
          {createNumbers(unit === "hours" ? 24 : 60).map((num) => (
            <div
              key={`${unit}-${num}`}
              style={{ height: `${itemHeight}px` }}
              className={`time-unit snap-center flex justify-center items-center z-10 w-full cursor-pointer ${
                selectedTime[unit] == num ? "text-primary font-bold" : ""
              }`}
            >
              {String(num).padStart(2, "0")}
            </div>
          ))}
          <div
            className="w-full text-transparent "
            style={{ height: `${itemHeight}px` }}
          >
            j
          </div>
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
