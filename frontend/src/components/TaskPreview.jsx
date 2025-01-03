import { categories, priorities } from "@/constants";
import dayjs from "dayjs";
import { Eye, Flag, FlagIcon } from "lucide-react";
import { cloneElement } from "react";

const TaskPreview = ({ task }) => {
  console.log(task);
  const { title, date, time, priority, category } = task;
  // Get category and priority info
  const categoryInfo = categories.find((item) => item.name === category) || {};
  const priorityInfo = priorities.find((item) => item.name === priority) || {};

  // Format time and date
  const formattedTime = time.format("HH:mm");
  const getDate = (date) => {
    if (date === dayjs()) return "Today";
    if (date === dayjs().add(1, "day")) return "Tomorrow";
    return date.format("dddd, MMM DD");
  };
  return (
    <div className="w-full text-foreground flex items-center justify-between bg-dropDown rounded">
      <Eye className="w-10" />
      <div className=" w-full flex flex-col p-2 gap-3">
        <h1 className="opacity-90">{title}</h1>
        <div className=" w-full flex items-center justify-between gap-2 ">
          <div className="flex flex-wrap gap-1 w-full text-muted-foreground text-xs ">
            <p>{getDate(date)}</p>
            <span>At </span>
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div
              className={"flex items-center gap-2 rounded px-3 py-2 text-sm "}
              style={{ backgroundColor: categoryInfo.color }}
            >
              {cloneElement(categoryInfo.icon, {
                className: "w-4 h-4",
              })}
              {categoryInfo.name}
            </div>
            <div
              className={"flex items-center gap-2 rounded px-3 py-2 text-sm "}
              style={{ backgroundColor: priorityInfo.color }}
            >
              <Flag className="w-4 h-4" />
              {priorityInfo.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPreview;
