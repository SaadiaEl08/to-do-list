import { steps } from "@/constants";
import { AlarmClockPlus, LucideFlag, SendHorizonal, Tag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const TaskForm = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const taskInfo = useSelector((state) => state.taskInfo);
  const handleSaveTask = () => {
    console.log("save task");
    dispatch({ type: "SET_IS_OPEN_ADD_TASK", payload: false });
  };

  return (
    <div className="w-[80vw] flex flex-col gap-4 sm:w-[50vw] lg:w-[40vw]">
      <h1>{mode === "create" ? "Add" : "Edit"} Task</h1>
      <input
        type="text"
        placeholder="Title"
        className="bg-transparent h-10 rounded focus:p-3 focus:transition-all focus:duration-300 outline-none focus:border focus:border-muted-foreground w-full"
        onChange={(e) =>
          dispatch({
            type: "UPDATE_TASK_INFO",
            payload: { title: e.target.value },
          })
        }
        value={taskInfo.title}
      />
      <input
        type="text"
        placeholder="Description"
        className="bg-transparent h-10 rounded focus:p-3 focus:transition-all focus:duration-300 outline-none focus:border focus:border-muted-foreground w-full"
        onChange={(e) =>
          dispatch({
            type: "UPDATE_TASK_INFO",
            payload: { description: e.target.value },
          })
        }
        value={taskInfo.description}
      />
      <div className=" flex items-center justify-between  p-3">
        <div className="flex items-center justify-between gap-4">
          <AlarmClockPlus
            title="Schedule task"
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: steps.SCHEDULE })
            }
            className={`cursor-pointer ${
              taskInfo.date && taskInfo.time ? "text-primary" : ""
            }`}
          />
          <Tag
            className={`cursor-pointer ${
              taskInfo.category ? "text-primary" : ""
            }`}
            title="Add category"
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: steps.CATEGORY })
            }
          />
          <LucideFlag
            className={`cursor-pointer ${
              taskInfo.priority ? "text-primary" : ""
            }`}
            title="Set priority"
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: steps.PRIORITY })
            }
          />
        </div>
        <SendHorizonal
          title="Save task"
          onClick={handleSaveTask}
          className={`text-primary  ${
            taskInfo.title && taskInfo.description
              ? "cursor-pointer opacity-100 pointer-events-auto"
              : "cursor-not-allowed opacity-30 pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
};

export default TaskForm;
