import PopOver from "./PopOver";
import DateCalendarViews from "./DateCalendarViews";
import MyTimeClock from "./MyTimeClock";
import TaskPriority from "./TaskPriority";
import TaskCategory from "./TaskCategory";
import CreateCategory from "./CreateCategory";
import TaskForm from "./TaskForm";
import {  useSelector } from "react-redux";
import { steps } from "@/constants";

const AddTask = () => {
  const currentStep = useSelector((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case steps.TASK_FORM:
        return <TaskForm  />;
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
    <PopOver isOpen={true} toggle={() => {}}>
      {renderStep()}
    </PopOver>
  );
};

export default AddTask;
