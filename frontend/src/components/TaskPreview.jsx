import { categories, getDay, priorities } from "@/constants";
import { Eye, Flag, Tag } from "lucide-react";
import { cloneElement, useState } from "react";
import TaskDetail from "./TaskDetail";

const TaskPreview = ({ task }) => {
  const { title, date, time, priority, category } = task;
  const [taskToShowDetail, setTaskToShowDetail] = useState(null);

  // Get category and priority info
  const categoryInfo = categories.find((item) => item.name === category) || {
    color: "#ccc",
    icon: <Tag />,
    name: "Unknown Category",
  };
  const priorityInfo = priorities.find((item) => item.name === priority) || {
    color: "#ccc",
    name: "No Priority",
  };

  // Formatted values
  const formattedTitle =
    title.length > 30 ? `${title.slice(0, 30)}... ` : title;
  const formattedTime = time.format("HH:mm");
  const formattedDate = getDay(date);

  // Handle showing task details
  const handleShowDetail = () => {
    const formattedTask = {
      ...task,
      category: categoryInfo,
      priority: priorityInfo,
      time: formattedTime,
      date: formattedDate,
    };
    setTaskToShowDetail(formattedTask);
  };

  return (
    <div className="w-full text-foreground flex items-center justify-between bg-dropDown rounded-lg">
      <Eye
        className="w-10 cursor-pointer"
        onClick={handleShowDetail}
        aria-label="View task details"
        role="button"
      />
      <div className="w-full flex flex-col p-2 gap-3">
        <h1 className="opacity-90">{formattedTitle}</h1>
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 w-full text-muted-foreground text-xs">
            <p>{formattedDate}</p>
            <span>At</span>
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div
              className="flex items-center gap-2 rounded px-3 py-2 text-sm"
              style={{ backgroundColor: `${categoryInfo.color}99` }}
            >
              {cloneElement(categoryInfo.icon, {
                className: "w-4 h-4 font-bold",
                stroke: categoryInfo.color,
                strokeWidth: 3,
              })}
              {categoryInfo.name}
            </div>
            <div
              className="flex items-center gap-2 rounded px-3 py-2 text-sm"
              style={{ backgroundColor: `${priorityInfo.color}99` }}
            >
              <Flag className="w-4 h-4" />
              {priorityInfo.name}
            </div>
          </div>
        </div>
      </div>
      {taskToShowDetail && (
        <TaskDetail
          task={taskToShowDetail}
          setTaskToShowDetail={setTaskToShowDetail}
        />
      )}
    </div>
  );
};

export default TaskPreview;
