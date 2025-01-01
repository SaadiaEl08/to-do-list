import { StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";

export default function MyTimeClock() {
  const [value, setValue] = useState(dayjs());
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticTimePicker
        views={["hours", "minutes"]}
        ampmInClock={false}
        ampm={false}
        displayStaticWrapperAs="mobile"
        value={value}
        onChange={(newValue) => setValue(newValue)}
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
                color: "var(--primary)",
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
          "&.MuiPickersArrowSwitcher-nextIconButton": {
            color: "red",
            border: "none",
          },
        }}
      />
    </LocalizationProvider>
  );
}