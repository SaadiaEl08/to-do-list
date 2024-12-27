import { AlarmClockPlus, LucideFlag, SendHorizonal, Tag } from "lucide-react";
import PopOver from "./PopOver";
import { useState } from "react";
import DateCalendarViews from "./DateCalendarViews";

const AddTask = () => {
  const [date, setDate] = useState(new Date());
  const [isOpenTaskForm, setIsOpenTaskForm] = useState(true);
  const [isOpenSchedule, setIsOpenSchedule] = useState(false);
  const [isOpenTimer, setIsOpenTimer] = useState(false);
  const [isOpenPriority, setIsOpenPriority] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
    date: "",
    priority: "",
    time: "",
    category: "",
  });

  const handleScheduleClick = () => {
    setIsOpenTaskForm(false);
    setIsOpenSchedule(true);
  };

  const handleTimerClick = () => {
    setIsOpenTaskForm(false);
    setIsOpenTimer(true);
  };

  const handlePriorityClick = () => {
    setIsOpenTaskForm(false);
    setIsOpenPriority(true);
  };

  const handleCategoryClick = () => {
    setIsOpenTaskForm(false);
    setIsOpenCategory(true);
  };
  return (
    <PopOver isOpen={true} toggle={() => {}}>
      {" "}
      {isOpenTaskForm && (
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
              <AlarmClockPlus onClick={handleScheduleClick} />
              <Tag onClick={handleCategoryClick} />
              <LucideFlag onClick={handlePriorityClick} />
            </div>
            <SendHorizonal className="text-primary" />
          </div>
        </div>
      )}
      {isOpenSchedule && (
        <div className="flex flex-col gap-4 ">
          <DateCalendarViews />
          <div className="w-full  flex items-center justify-between  ">
            <button className="text-primary h-12 px-5 w-full">Cancel</button>
            <button className="text-foreground h-12 px-5 w-full bg-primary rounded ">
              Choose Time
            </button>
          </div>
        </div>
      )}
      {isOpenTimer && <div>Timer</div>}
      {isOpenPriority && <div>Priority</div>}
      {isOpenCategory && <div>Category</div>}
    </PopOver>
  );
};

export default AddTask;
