import { Clock, Flag, PenLine, Tag, Trash2Icon, X } from "lucide-react";
import { cloneElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { steps } from "@/constants";
import ConfirmDialog from "./ConfirmDialog";

const TaskDetail = ({ task = {}, setTaskToShowDetail }) => {
  const {
    id,
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
    setTaskToShowDetail(null);
  };
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleClose = () => setOpenConfirmDialog(false);
  const handleConfirm = () => {
    dispatch({ type: "DELETE_TASK", payload: id });
    handleClose();
    setTaskToShowDetail(null);
  };

  const handleDeleteTask = () => {
    setOpenConfirmDialog(true);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setTaskToShowDetail(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="text-foreground fixed w-full min-h-full h-fit  bg-background z-20 top-0 left-0 p-4 flex flex-col items-start gap-5 lg:p-20  xl:p-10 ">
      <div className="w-full flex justify-end">
        <X
          className="w-6 h-6 cursor-pointer"
          onClick={() => setTaskToShowDetail(null)}
        />
      </div>
      <div className="w-full flex  justify-between items-start">
        <div className=" w-10/12 flex flex-col justify-between">
          <h1 className="text-xl font-normal ">
            {title}
          </h1>
          <p className="text-base text-muted-foreground  ">
            {description}
          </p>
        </div>
        <div>
          <PenLine
            className="w-6 h-6 cursor-pointer"
            onClick={handleEditTask}
          />
        </div>
      </div>
      <div className=" w-full flex flex-col gap-5 ">
        <div className=" flex items-stretch justify-between gap-4">
          <div className=" flex items-center gap-3">
            <Clock className="w-6 h-6 " />
            <span >Task Time :</span>
          </div>
          <div className="rounded-md p-2 bg-dropDown ">
            <span >
              {formattedDate} At {formattedTime}
            </span>
          </div>
        </div>
        {categoryInfo && (
          <div className=" flex items-center justify-between ">
            <div className=" flex items-center  gap-3 ">
              <Tag className="w-6 h-6 " />
              <span >Task Category :</span>
            </div>
            <div
              className="flex items-center gap-3 rounded-md px-4 py-2 bg-dropDown "
              style={{ backgroundColor: categoryInfo.color + 50 }}
            >
              {cloneElement(categoryInfo.icon, {
                className: "w-6 h-6",
              })}
              <span>
                {" "}
                {categoryInfo.name}
              </span>
            </div>
          </div>
        )}
        {priorityInfo && (
          <div className=" flex items-center justify-between ">
            <div className=" flex items-center  gap-3 ">
              <Flag className="w-6 h-6" />
              <span>Task Priority :</span>
            </div>
            <div
              className="flex items-center gap-3 rounded-md px-4 py-2 bg-dropDown "
              style={{ backgroundColor: priorityInfo.color + 50 }}
            >
              <span
                style={{ color: priorityInfo.color }}
                className="font-bold"
              >
                {priorityInfo.name}
              </span>
            </div>
          </div>
        )}
      </div>
      <button
        className="flex items-center gap-2 w-fit  text-red-600  px-5 py-2 border-2
       border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-red-600  transition-all "
        onClick={handleDeleteTask}
      >
        <Trash2Icon className="w-6 h-6 " />
        <span>Delete this task</span>
      </button>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task ?"
        className={"bg-red-600 "}
      />
    </div>
  );
};

export default TaskDetail;
