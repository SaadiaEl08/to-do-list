import { StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import ActionBar from "./ActionBar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { myToast, steps } from "@/constants";
import { useState } from "react";

export default function MyTimeClock() {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.taskInfo.time);
  const date = useSelector((state) => state.taskInfo.date);
  const [selectedTime, setSelectedTime] = useState(time);

  const validateTime = (newTime) => {
    const isValidTime = newTime.isAfter(dayjs());
    if (!isValidTime) {
      myToast("Time must be in the next 5 minutes or more", "error");
    } else {
      dispatch({ type: "UPDATE_TASK_INFO", payload: { time: dayjs(selectedTime, "HH:mm:ss")  } });
      dispatch({ type: "SET_STEP", payload: steps.TASK_FORM });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticTimePicker
        views={["hours", "minutes"]}
        ampmInClock={false}
        ampm={false}
        minTime={date.isBefore(dayjs()) ? dayjs().add(5, "minute") : date}
        displayStaticWrapperAs="mobile"
        value={selectedTime}
        onChange={(newValue) => setSelectedTime(newValue)}
        slotProps={{
          nextIconButton: {
            sx: {
              color: "white",
            },
          },
          previousIconButton: {
            sx: {
              color: "white",
            },
          },
          actionBar: {
            sx: {
              display: "none",
            },
          },
          toolbar: {
            sx: {
              "& .MuiPickersToolbarText-root": {
                color: "var(--foreground)",
              },
              "& .MuiTypography-root": {
                color: "var(--foreground)",
              },
              "& .Mui-selected": {
                color: "var(--primary) !important",
              },
            },
          },
        }}
        sx={{
          "& .MuiClock-clock": {
            backgroundColor: "var(--primary)",
            backgroundOpacity: "0.5",
          },
          "&.MuiPickersLayout-root": {
            backgroundColor: "transparent",
            border: "none",
          },
        }}
      />
      <ActionBar nextActionFunction={() => validateTime(time)} />
      <ToastContainer />
    </LocalizationProvider>
  );
}
