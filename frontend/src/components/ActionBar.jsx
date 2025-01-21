import { steps } from "@/constants";
import { useDispatch } from "react-redux";

const ActionBar = ({
  nextActionText = "Save",
  nextActionFunction,
  cancelActionFunction,
  nextClassName = "",
  disableNext = false,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full flex items-center justify-between  ">
      <button
        className="text-primary h-12 px-5 w-full"
        onClick={
          cancelActionFunction
            ? cancelActionFunction
            : () => dispatch({ type: "SET_STEP", payload: steps.TASK_FORM })
        }
      >
        Cancel
      </button>
      <button
        className={
          "text-foreground h-12 px-5 w-full bg-primary rounded disabled:bg-muted-foreground disabled:cursor-not-allowed " + nextClassName
        }
        onClick={
          nextActionFunction
            ? nextActionFunction
            : () => dispatch({ type: "SET_STEP", payload: steps.TASK_FORM })
        }
        disabled={disableNext}
      >
        {nextActionText}
      </button>
    </div>
  );
};

export default ActionBar;
