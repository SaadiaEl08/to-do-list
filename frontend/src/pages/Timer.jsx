import Loading from "@/components/Loading";
import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const itemHeight = 36;
  const createNumbers = (count) => Array.from({ length: count }, (_, i) => i);
  const [loading, setLoading] = useState(true);

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
  const getSelectedTimeFromVisibleItem = (unit) => {
    const container = refs[unit].current;
    const children = Array.from(container.children);
    // Find the child that is closest to the center of the container (or fully visible)
    const visibleChild = children.filter((child) => {
      const rect = child.getBoundingClientRect();
      // Check if the element is vertically within the container's visible area
      return (
        rect.top >= container.getBoundingClientRect().top &&
        rect.bottom <= container.getBoundingClientRect().bottom
      );
    });
    if (visibleChild) {
      return visibleChild[1].innerText; // Return the innerText of the visible element
    }
    return null; // Return null if no element is found (shouldn't happen in normal cases)
  };
  const handleScroll = (unit, e) => {
    const element = e.target;
    const firstChild = refs[unit].current.firstElementChild;
    const lastChild = refs[unit].current.lastElementChild;

    // Update the state when scroll reaches the top or bottom for infinite scroll behavior
    if (element.scrollTop <= itemHeight) {
      if (lastChild) {
        // Move the last child to the top
        refs[unit].current.removeChild(lastChild);
        firstChild.before(lastChild);
      }
    } else if (
      element.scrollTop + element.clientHeight ===
      element.scrollHeight
    ) {
      if (firstChild) {
        // Move the first child to the bottom
        refs[unit].current.removeChild(firstChild);
        lastChild.after(firstChild);
      }
    }
    // Get the value of the currently selected item
    const selectedValue = getSelectedTimeFromVisibleItem(unit);

    // Update the selected time for the specific unit (hours, minutes, or seconds)
    if (selectedValue) {
      setSelectedTime((prev) => ({
        ...prev,
        [unit]: parseInt(selectedValue, 10),
      }));
    }
    const audio = new Audio("/clockSoundEffect.mp3");
    audio.play()
     
  };
  // Function to simulate scroll
  const simulateScroll = (unit) => {
    const element = refs[unit].current;
    // Set scrollTop to simulate the scroll to the top (0)
    if (element) {
      element.scrollTop = 0;
      // Now trigger the scroll handler manually
      const event = new Event("scroll");
      element.dispatchEvent(event);
    }
  };

  useEffect(() => {
    if (refs.hours.current && refs.minutes.current && refs.seconds.current) {
      simulateScroll("hours");
      simulateScroll("minutes");
      simulateScroll("seconds");
    }
    setLoading(false);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container  flex flex-col justify-center items-center pt-3 gap-4">
        <div className="time-circle flex flex-col justify-center items-center border-[20px] border-slate-600 bg-primary rounded-full w-3/5 aspect-square">
          <span className="text-4xl text-foreground">
            {`${String(selectedTime.hours).padStart(2, "0")}:${String(
              selectedTime.minutes
            ).padStart(2, "0")}:${String(selectedTime.seconds).padStart(
              2,
              "0"
            )}`}
          </span>
        </div>

        <div className="proposals-timers w-full flex justify-center items-center gap-4">
          {proposalsTimers.map((item) => (
            <div
              key={item.id}
              className="time-circle flex flex-col justify-center items-center border-4 border-slate-600 bg-slate-800 rounded-full w-1/5 aspect-square cursor-pointer"
            >
              <span className="text-xl text-foreground">{item.time}</span>
            </div>
          ))}
        </div>

        <div className="relative time-selector  w-full flex justify-evenly items-center gap-4 text-foreground text-3xl overflow-hidden">
          {["hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              ref={refs[unit]}
              style={{ height: `${itemHeight * 3}px` }}
              className="time-unit-container hide-scrollbar overflow-auto flex flex-col w-[60px] items-center snap-y snap-mandatory scroll-smooth"
              onScroll={(e) => handleScroll(unit, e)}
            >
              {createNumbers(unit === "hours" ? 24 : 60).map((num, index) => (
                <div
                  key={`${unit}-${index}`}
                  style={{ height: `${itemHeight}px` }}
                  className={`snap-center flex justify-center items-center z-10 w-full ${
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
      </div>
    </>
  );
};

export default Timer;
