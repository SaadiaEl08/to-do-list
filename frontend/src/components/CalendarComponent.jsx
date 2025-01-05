/* eslint-disable react/prop-types */
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { PickersDay } from "@mui/x-date-pickers";

export default function DateCalendarViews() {
  const tasks = useSelector((state) => state.tasks);
  const highlightedDays =tasks.map((task) => task.date) || [];
    console.log(tasks);

  const ServerDay = ({ ...props }) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isHighlighted = highlightedDays.includes(day);

   

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
        />
        <Box {...props} />
      </Badge>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={dayjs()}
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
