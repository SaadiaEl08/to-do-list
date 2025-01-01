import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import ActionBar from "./ActionBar";
import { useDispatch, useSelector } from "react-redux";
import { steps } from "@/constants";

export default function DateCalendarViews() {
  const dispatch = useDispatch();
  const taskDate = useSelector((state) => state.taskInfo.date);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={taskDate || dayjs()}
        views={["year", "month", "day"]}
        onChange={(newValue) => {
          dispatch({ type: "UPDATE_TASK_INFO", payload: { date: newValue } });
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
      <ActionBar nextActionText="Choose Time" nextActionFunction={() => {dispatch({ type: "SET_STEP", payload: steps.TIMER })}}/>
    </LocalizationProvider>
  );
}
