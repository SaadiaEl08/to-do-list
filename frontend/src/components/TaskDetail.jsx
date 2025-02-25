import { Clock, Flag, PenLine, Tag, Trash2Icon, X } from "lucide-react";
import { cloneElement, useState } from "react";
import { useDispatch } from "react-redux";
import { steps } from "@/constants";
import ConfirmDialog from "./ConfirmDialog";
import { categories, getDay, priorities } from "@/constants";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { useDeleteTask } from "@/apis/Task";

const TaskDetail = ({ task = {} }) => {
  const { id,documentId, title, description, date, time, priority, category } = task;
  // Get category and priority info
  const categoryInfo =
    categories.find((item) => item.name === category?.name) || null;
  const priorityInfo =
    priorities.find((item) => item.name === priority) || null;

  // Formatted values
  const formattedTime = dayjs(time).format("HH:mm");
  const formattedDate = getDay(date);
  const dispatch = useDispatch();
  const nav = useNavigate();
  // Delete task
  const { mutate: deleteTask } = useDeleteTask();
  const handleEditTask = () => {
    dispatch({ type: "SET_IS_OPEN_ADD_TASK", payload: true });
    dispatch({ type: "SET_STEP", payload: steps.TASK_FORM });
    dispatch({ type: "SET_MODE", payload: "edit" });
    dispatch({ type: "UPDATE_TASK_INFO", payload: task });
  };
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleClose = () => {
    setOpenConfirmDialog(false);
    nav(-1);
  };
  const handleConfirm = () => {
    deleteTask({documentId}, {
      onSuccess: () => {
        dispatch({ type: "DELETE_TASK", payload: id });
        handleClose();
      },
      onError: (er) => {
        console.log(er);
      },
    });
  };

  const handleDeleteTask = () => {
    setOpenConfirmDialog(true);
  };
  return (
    <div className="text-foreground fixed w-full min-h-full h-fit  bg-background z-20 top-0 left-0 p-4 flex flex-col items-start gap-5 lg:p-20  xl:p-10 ">
      <div className="w-full flex justify-end">
        <X className="w-6 h-6 cursor-pointer" onClick={() => nav("/home")} />
      </div>
      <div className="w-full flex  justify-between items-start">
        <div className=" w-10/12 flex flex-col justify-between">
          <h1 className="text-xl font-normal ">{title}</h1>
          <p className="text-base text-muted-foreground  ">{description}</p>
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
            <span>Task Time :</span>
          </div>
          <div className="rounded-md p-2 bg-dropDown ">
            <span>
              {formattedDate} At {formattedTime}
            </span>
          </div>
        </div>
        {categoryInfo && (
          <div className=" flex items-center justify-between ">
            <div className=" flex items-center  gap-3 ">
              <Tag className="w-6 h-6 " />
              <span>Task Category :</span>
            </div>
            <div
              className="flex items-center gap-3 rounded-md px-4 py-2 bg-dropDown "
              style={{ backgroundColor: categoryInfo.color + 50 }}
            >
              {cloneElement(categoryInfo.icon, {
                className: "w-6 h-6",
              })}
              <span> {categoryInfo.name}</span>
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
              <span style={{ color: priorityInfo.color }} className="font-bold">
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
