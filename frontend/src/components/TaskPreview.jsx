/* eslint-disable react/prop-types */
import { categories, getDay, priorities } from "@/constants";
import { CheckCircle2, Circle, Eye, Flag } from "lucide-react";
import { cloneElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmDialog from "./ConfirmDialog";
import { useNavigate } from "react-router";

const TaskPreview = ({
  task,
  className,
  draggable = false,
  setActiveTask = () => {},
  onDrop = () => {},
}) => {
  const { id, title, date, time, priority, category, isCompleted } = task;
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const nav=useNavigate()

  // Get category and priority info
  const categoryInfo =
    categories.find((item) => item.name === category) || null;
  const priorityInfo =
    priorities.find((item) => item.name === priority) || null;

  // Formatted values
  const formattedTitle =
    title.length > 30 ? `${title.slice(0, 30)}... ` : title;
  const formattedTime = time.format("HH:mm");
  const formattedDate = getDay(date);

  const handleMarkAsCompleted = () => {
    setConfirmInfo({
      title: "Mark as Completed",
      message: "Are you sure you want to mark this task as completed?",
      onConfirm: handleConfirm,
    });
    setOpenConfirmDialog(true);
  };

  const handleMarkAsUnCompleted = () => {
    setConfirmInfo({
      title: "Mark as Uncompleted",
      message: "Are you sure you want to mark this task as uncompleted?",
      onConfirm: handleConfirm,
    });
    setOpenConfirmDialog(true);
  };

  const handleClose = () => setOpenConfirmDialog(false);

  const handleConfirm = () => {
    dispatch({ type: "MARK_TASK_AS_COMPLETED", payload: id });
    setOpenConfirmDialog(false);
  };
  const style = {
    transform: CSS.Transform.toString({
      ...transform,
    }),
    transition,
    PointerEvents: "none",
    zIndex: isDragging ? 2 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        onClick={(e) => e.stopPropagation()}
        style={style}
        className={`show-task-animation task-item w-full text-foreground flex items-center justify-between bg-dropDown rounded-lg  md:w-[48%]  min-h-24  ${className}`}
      >
        {handle && (
          <div {...attributes} {...listeners}>
            <div
              className={`w-4 h-full flex flex-wrap gap-1 items-center justify-center ms-2 cursor-grab active:cursor-grabbing`}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="border-2 border-foreground rounded-full bg-foreground"
                ></div>
              ))}
            </div>
          </div>
        )}

        {!isCompleted ? (
          <Circle
            className="w-10 cursor-pointer"
            onClick={handleMarkAsCompleted}
            aria-label="mark as completed"
            role="button"
          />
        ) : (
          <CheckCircle2
            className="w-10 cursor-pointer text-green-500"
            onClick={handleMarkAsUnCompleted}
            aria-label="mark as uncompleted"
            role="button"
          />
        )}
        <div className="w-full min-h-24 flex flex-col justify-between p-2 gap-3">
          <div className="flex items-center justify-between">
            <h1>{formattedTitle}</h1>
            <Eye
              className="w-4 md:w-6 cursor-pointer"
              onClick={() => nav(`/edit/${id}`)}
              aria-label="View task details"
              role="button"
            />
          </div>
          <div className="w-full flex items-center justify-between gap-2 min-h-10 flex-wrap">
            <div className="flex flex-wrap gap-1 w-fit text-muted-foreground">
              <p className="text-xs sm:text-sm lg:text-base">
                {formattedDate} At {formattedTime}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2">
              {categoryInfo && (
                <div
                  className="flex items-center gap-2 rounded px-3 py-2 text-sm"
                  style={{ backgroundColor: `${categoryInfo.color}99` }}
                >
                  {categoryInfo.icon &&
                    cloneElement(categoryInfo.icon, {
                      className: "w-4 h-4 font-bold",
                      strokeWidth: 3,
                    })}
                  <span className="lg:text-base">{categoryInfo.name}</span>
                </div>
              )}

              {priorityInfo && (
                <div
                  className="flex items-center gap-2 rounded px-3 py-2 text-sm"
                  style={{ backgroundColor: `${priorityInfo.color}99` }}
                >
                  <Flag className="w-4 h-4" />
                  <span className="lg:text-base">{priorityInfo.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleClose}
        onConfirm={confirmInfo.onConfirm}
        title={confirmInfo.title}
        message={confirmInfo.message}
      />
    </>
  );
};

export default TaskPreview;
