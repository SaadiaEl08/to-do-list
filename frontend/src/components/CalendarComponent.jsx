/* eslint-disable react/prop-types */
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers";

export default function DateCalendarViews({selectedDay, setSelectedDay}) {
  const tasks = useSelector((state) => state.tasks);
  const highlightedDays =
    tasks.map((task) => task.date.format("YYYY-MM-DD")) || [];
  const ServerDay = ({ ...props }) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isHighlighted = highlightedDays.includes(day.format("YYYY-MM-DD"));
    return (
      <Badge
        overlap="circular"
        color="primary"
        variant={isHighlighted ? "dot" : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />{" "}
      </Badge>
    );
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDay}
        onChange={(newValue) => setSelectedDay(newValue)}
        views={["year", "month", "day"]}
        showDaysOutsideCurrentMonth={true}
        style={{
          backgroundColor: "var(--popover)",
          width: "100%",
          color: "var(--foreground)",
        }}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
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
          previousIconButton: {
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
