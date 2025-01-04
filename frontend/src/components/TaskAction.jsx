import PopOver from "./PopOver";
import DateCalendarViews from "./DateCalendarViews";
import MyTimeClock from "./MyTimeClock";
import TaskPriority from "./TaskPriority";
import TaskCategory from "./TaskCategory";
import CreateCategory from "./CreateCategory";
import TaskForm from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { steps } from "@/constants";
import dayjs from "dayjs";


// this component is used to add a new task or edit an existing task
const TaskAction = () => {
  const currentStep = useSelector((state) => state.currentStep);
  const dispatch = useDispatch();
  const renderStep = () => {
    switch (currentStep) {
      case steps.TASK_FORM:
        return <TaskForm />;
      case steps.SCHEDULE:
        return <DateCalendarViews />;
      case steps.TIMER:
        return <MyTimeClock />;
      case steps.PRIORITY:
        return <TaskPriority />;
      case steps.CATEGORY:
        return <TaskCategory />;
      case steps.CREATE_CATEGORY:
        return <CreateCategory />;
      default:
        return null;
    }
  };

  return (
    <PopOver
      isOpen={true}
      toggle={() => {
        dispatch({ type: "SET_IS_OPEN_ADD_TASK", payload: false });
        dispatch({
          type: "UPDATE_TASK_INFO",
          payload: {
            title: "",
            description: "",
            date: dayjs(),
            priority: "",
            time: dayjs().add(1, "minute"),
            category: "",
          },
        });
      }}
    >
      {renderStep()}
    </PopOver>
  );
};

export default TaskAction;
