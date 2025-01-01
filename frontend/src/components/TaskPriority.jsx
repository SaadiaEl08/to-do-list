import { useState } from "react";

const TaskPriority = () => {
  const [selectedPriority, setSelectedPriority] = useState(null);

  const priority = [
    {
      name: "High",
      color: "#f43f5e",
    },
    {
      name: "Medium",
      color: "#f59e0b",
    },
    {
      name: "Low",
      color: "#3b82f6",
    },
  ];
  return (
    <div className=" w-[80vw] ">
      <h1 className="text-xl font-bold">Task Priority</h1>
      <div className="flex gap-4 p-2  ">
        {priority.map((item) => (
          <div
            key={item.name}
            className={`transition-all duration-300 rounded flex flex-col gap-2 items-center justify-center  aspect-square w-1/3 ${selectedPriority === item.name ? "bg-primary" : ""}`}
            onClick={() => setSelectedPriority(item.name)}
          >
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: item.color }}></div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPriority;
