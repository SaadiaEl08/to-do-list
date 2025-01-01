import { AlarmClockPlus, LucideFlag, SendHorizonal, Tag } from "lucide-react";

const TaskForm = ({handleStepChange ,steps}) => {
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
          <AlarmClockPlus  onClick={() => handleStepChange(steps.SCHEDULE)}/>
          <Tag  onClick={() => handleStepChange(steps.CATEGORY)}/>
          <LucideFlag onClick={() => handleStepChange(steps.PRIORITY)} />
        </div>
        <SendHorizonal className="text-primary" />
      </div>
    </div>
  );
};

export default TaskForm;
