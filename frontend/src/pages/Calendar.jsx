import CalendarComponent from "@/components/CalendarComponent";
import { useSelect } from "@mui/base";

const Calendar = () => {
  const tasks = useSelect((state) => state.tasks);
  return (
    <div className="border ">
      <CalendarComponent tasks={tasks} />
    </div>
  );
};

export default Calendar;
