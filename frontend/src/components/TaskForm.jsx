import { steps } from "@/constants";
import { AlarmClockPlus, LucideFlag, SendHorizonal, Tag } from "lucide-react";
import { useDispatch } from "react-redux";

const TaskForm = () => {
  const dispatch = useDispatch();

  return (
    <div className="min-w-[80vw] flex flex-col gap-4 ">
      <h1>Add Task</h1>
      <input
        type="text"
        placeholder="Title"
        className="bg-transparent h-10 rounded focus:p-3 focus:transition-all focus:duration-300 outline-none focus:border focus:border-muted-foreground w-full"
      />
      <input
        type="text"
        placeholder="Description"
        className="bg-transparent h-10 rounded focus:p-3 focus:transition-all focus:duration-300 outline-none focus:border focus:border-muted-foreground w-full"
      />
      <div className=" flex items-center justify-between  p-3">
        <div className="flex items-center justify-between gap-4">
          <AlarmClockPlus
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: steps.SCHEDULE })
            }
          />
          <Tag
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: steps.CATEGORY })
            }
          />
          <LucideFlag
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: steps.PRIORITY })
            }
          />
        </div>
        <SendHorizonal className="text-primary" />
      </div>
    </div>
  );
};

export default TaskForm;
