import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import dayjs from "dayjs";

export default function DateCalendarViews() {
  const [date, setDate] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={date}
        views={["year", "month", "day"]}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        disablePast={true}
        showDaysOutsideCurrentMonth={true}
        slotProps={{
          day: {
            sx: {
              "&.Mui-selected": {
                backgroundColor: "var(--primary)",
                color: "var(--foreground)",
              },
              "&.MuiPickersDay-dayWithMargin": {
                color: "var(--foreground)",
              },
              "&.MuiPickersDay-dayOutsideMonth": {
                color: "var(--muted-foreground)",
              },
              "&.MuiPickersDay-today": {
                border: "2px solid var(--primary)", 
              },
            },
          },
          leftArrowIcon: {
            sx: {
                color: "var(--foreground)",
              
            },
          },
          nextIconButton: {
            sx: {
                color: "var(--foreground)",
              
            },
          },
          switchViewIcon: {
            sx: {
                color: "var(--foreground)",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
