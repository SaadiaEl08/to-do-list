import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ActionBar from "./ActionBar";
import { useDispatch, useSelector } from "react-redux";
import { categories, steps } from "@/constants";

const TaskCategory = () => {
  const taskCategory = useSelector((state) => state.taskInfo.category);
  const [selectedCategory, setSelectedCategory] = useState(taskCategory);
  const dispatch = useDispatch();
  return (
    <div className="w-[80vw] sm:w-[50vw]  ">
      <h1 className="text-xl font-bold">Task Category</h1>
      <div className="flex flex-wrap gap-4 items-center justify-evenly py-4">
        {categories.map((item) => (
          <div
            key={item.name}
            className={` transition-all duration-100 rounded flex flex-col items-center justify-center ${
              selectedCategory === item.name ? "border-2 border-primary" : ""
            }`}
            onClick={() =>
              selectedCategory !== item.name
                ? setSelectedCategory(item.name)
                : setSelectedCategory("")
            }
          >
            <div
              className="w-16 h-16 flex items-center justify-center rounded  text-black"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
        <div
          className={`rounded flex flex-col items-center justify-center `}
          onClick={() =>
            dispatch({ type: "SET_STEP", payload: steps.CREATE_CATEGORY })
          }
        >
          <div className="border w-16 h-16 flex items-center justify-center rounded bg-[#80FFD1] text-black">
            <PlusCircle />
          </div>
          <p>Create New</p>
        </div>
      </div>
      <ActionBar
        nextActionFunction={() => {
          dispatch({
            type: "UPDATE_TASK_INFO",
            payload: {
              categories: selectedCategory,
            },
          });
          dispatch({ type: "SET_STEP", payload: steps.TASK_FORM });
        }}
       
      />
    </div>
  );
};

export default TaskCategory;
