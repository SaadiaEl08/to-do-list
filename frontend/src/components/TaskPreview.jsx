import { Eye } from "lucide-react";

const TaskPreview = ({ task }) => {
  return (
    <div className="border w-full text-foreground flex items-center justify-between">
      <Eye className="w-10" />
      <div className=" w-full flex flex-col p-2 gap-3">
        <h1 className="opacity-90">Do Math Homework</h1>
        <div className=" w-full  flex items-center justify-between gap-2 ">
          <span className="text-muted-foreground w-fit text-nowrap">Today At 16:45</span>
          <div className="w-full flex items-center justify-between">
            <div className="border rounded px-3 py-2">University</div>
            <div>priority</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPreview;
