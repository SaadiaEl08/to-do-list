import { useReducer } from "react";
import PopOver from "./PopOver";
import DateCalendarViews from "./DateCalendarViews";
import MyTimeClock from "./MyTimeClock";
import TaskPriority from "./TaskPriority";
import TaskCategory from "./TaskCategory";
import CreateCategory from "./CreateCategory";
import TaskForm from "./TaskForm";

const steps = {
  TASK_FORM: "taskForm",
  SCHEDULE: "schedule",
  TIMER: "timer",
  PRIORITY: "priority",
  CATEGORY: "category",
  CREATE_CATEGORY: "createCategory",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "UPDATE_TASK_INFO":
      return { ...state, taskInfo: { ...state.taskInfo, ...action.payload } };
    default:
      return state;
  }
};

const initialState = {
  currentStep: steps.TASK_FORM,
  taskInfo: {
    title: "",
    description: "",
    date: "",
    priority: "",
    time: "",
    category: "",
  },
};

const AddTask = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSave = () => {
    // Perform save logic
    console.log(state.taskInfo);
  };
  const handleStepChange = (step) => {
    dispatch({ type: "SET_STEP", payload: step });
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case steps.TASK_FORM:
        return <TaskForm steps={steps}  handleStepChange={handleStepChange} />;
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
