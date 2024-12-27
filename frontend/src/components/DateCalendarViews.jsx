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
        slotProps={{
          day: {
            sx: {
              "&.Mui-selected": "bg-red-500 text-white",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
