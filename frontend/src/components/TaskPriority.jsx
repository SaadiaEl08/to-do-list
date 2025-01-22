import { useState } from "react";
import ActionBar from "./ActionBar";
import { useDispatch, useSelector } from "react-redux";
import { priorities, steps } from "@/constants";

const TaskPriority = () => {
  const dispatch = useDispatch();
  const taskPriority = useSelector((state) => state.taskInfo.priority);
  const [selectedPriority, setSelectedPriority] = useState(taskPriority);
  return (
    <div className=" w-[80vw] sm:w-[50vw] lg:w-[40vw]">
      <h1 className="text-xl font-bold">Task Priority</h1>
      <div className="flex gap-4 p-2  ">
        {priorities.map((item) => (
          <div
            key={item.name}
            className={`transition-all duration-300 rounded flex flex-col gap-2 items-center justify-center  aspect-square w-1/3 border cursor-pointer  ${
              selectedPriority === item.name ? "bg-primary" : ""
            }`}
            onClick={() =>
              selectedPriority === item.name
                ? setSelectedPriority("")
                : setSelectedPriority(item.name)
            }
          >
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <ActionBar
        nextActionFunction={() => {
          dispatch({
            type: "UPDATE_TASK_INFO",
            payload: {
              priority: selectedPriority,
            },
          });
          dispatch({ type: "SET_STEP", payload: steps.TASK_FORM });
        }}
      />
    </div>
  );
};

export default TaskPriority;
