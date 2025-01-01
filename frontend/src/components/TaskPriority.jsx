import { useEffect, useState } from "react";
import ActionBar from "./ActionBar";
import { useDispatch, useSelector } from "react-redux";
import { priorities } from "@/constants";

const TaskPriority = () => {
  const dispatch = useDispatch();
  const taskPriority = useSelector((state) => state.taskInfo.priority);
  const [selectedPriority, setSelectedPriority] = useState(taskPriority);

  useEffect(() => {
    if (selectedPriority) {
      dispatch({
        type: "UPDATE_TASK_INFO",
        payload: {
          priority: selectedPriority,
        },
      });
    }
  }, [selectedPriority, dispatch]);

  return (
    <div className=" w-[80vw] ">
      <h1 className="text-xl font-bold">Task Priority</h1>
      <div className="flex gap-4 p-2  ">
        {priorities.map((item) => (
          <div
            key={item.name}
            className={`transition-all duration-300 rounded flex flex-col gap-2 items-center justify-center  aspect-square w-1/3 ${
              selectedPriority === item.name ? "bg-primary" : ""
            }`}
            onClick={() => {
              setSelectedPriority(item.name);
            }}
          >
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <ActionBar />
    </div>
  );
};

export default TaskPriority;
