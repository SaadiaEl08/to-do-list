import { Clock, Flag, PenLine, Tag, Trash2Icon, X } from "lucide-react";
import { cloneElement, useState } from "react";
import { useDispatch } from "react-redux";
import { steps } from "@/constants";
import ConfirmDialog from "./ConfirmDialog";

const TaskDetail = ({ task = {}, setTaskToShowDetail }) => {
  const {
    title,
    description,
    formattedDate,
    formattedTime,
    priorityInfo,
    categoryInfo,
  } = task;
  const dispatch = useDispatch();
  const handleEditTask = () => {
    dispatch({ type: "SET_IS_OPEN_ADD_TASK", payload: true });
    dispatch({ type: "SET_STEP", payload: steps.TASK_FORM });
    dispatch({ type: "SET_MODE", payload: "edit" });
    dispatch({ type: "UPDATE_TASK_INFO", payload: task });
  };
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleClose = () => setOpenConfirmDialog(false);
  const handleConfirm = () => {
    console.log("Confirmed!");
    setOpenConfirmDialog(false);
  };

  const handleDeleteTask = () => {
    setOpenConfirmDialog(true);
  };
  return (
    <div className="fixed w-full min-h-full h-screen overflow-scroll bg-black z-10 top-0 left-0 p-4 flex flex-col items-start gap-5">
      <div>
        <X onClick={() => setTaskToShowDetail(null)} />
      </div>
      <div className="w-full flex  justify-between items-start">
        <div className=" w-10/12 flex flex-col justify-between">
          <h1 className="text-xl font-normal">{title}</h1>
          <p className="text-base text-muted-foreground">{description}</p>
        </div>
        <div>
          <PenLine onClick={handleEditTask} />
        </div>
      </div>
      <div className=" w-full flex flex-col gap-5 ">
        <div className=" flex items-center justify-between">
          <div className=" flex items-center  gap-3">
            <Clock />
            <span>Task Time :</span>
          </div>
          <div className="rounded-md px-4 py-2 bg-dropDown">
            {formattedDate} At {formattedTime}
          </div>
        </div>
        <div className=" flex items-center justify-between ">
          <div className=" flex items-center  gap-3 ">
            <Tag />
            <span>Task Category :</span>
          </div>
          <div className="flex items-center gap-3 rounded-md px-4 py-2 bg-dropDown ">
            {cloneElement(categoryInfo.icon, {
              className: "w-6 h-6",
              style: { color: categoryInfo.color },
            })}
            {categoryInfo.name}
          </div>
        </div>
        <div className=" flex items-center justify-between ">
          <div className=" flex items-center  gap-3 ">
            <Flag />
            <span>Task Priority :</span>
          </div>
          <div className="flex items-center gap-3 rounded-md px-4 py-2 bg-dropDown ">
            <span style={{ color: priorityInfo.color }}>
              {priorityInfo.name}
            </span>
          </div>
        </div>
      </div>
      <button
        className="  flex items-center gap-2 w-fit  text-red-600 h-12 px-5 border-2
       border-red-600 rounded hover:bg-red-600 hover:text-foreground hover:border-foreground"
        onClick={handleDeleteTask}
      >
        <Trash2Icon />
        <span>Delete this task</span>
      </button>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task ?"
        className={"bg-red-600"}
      />
    </div>
  );
};

export default TaskDetail;
