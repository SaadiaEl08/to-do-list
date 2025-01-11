/* eslint-disable react/prop-types */
import { categories, getDay, priorities } from "@/constants";
import { CheckCircle2, Circle, Eye, Flag, Tag } from "lucide-react";
import { cloneElement, useState } from "react";
import TaskDetail from "./TaskDetail";
import { useDispatch } from "react-redux";
import ConfirmDialog from "./ConfirmDialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskPreview = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });
  const dispatch = useDispatch();
  const { title, date, time, priority, category, isCompleted } = task;
  const [taskToShowDetail, setTaskToShowDetail] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

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
  const handleShowDetail = (e) => {
    console.log("Clicked Task:", task.id);
    const formattedTask = {
      ...task,
      categoryInfo: categoryInfo,
      priorityInfo: priorityInfo,
      formattedTime: formattedTime,
      formattedDate: formattedDate,
    };
    dispatch({ type: "SET_TASK_INFO", payload: task });
    setTaskToShowDetail(formattedTask);
  };

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
    console.log("Confirmed!");
    setOpenConfirmDialog(false);
  };
  const style = {
    transform: CSS.Transform.toString({
      ...transform,
      x: 0, 
    }),
    transition,
    PointerEvents: "none",
    zIndex: isDragging ? 2 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={(e) => e.stopPropagation()}
      style={style}
      className={`task-item w-full text-foreground flex items-center justify-between bg-dropDown rounded-lg pointer-events-auto }`}
    >
      {" "}
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
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleClose}
        onConfirm={confirmInfo.onConfirm}
        title={confirmInfo.title}
        message={confirmInfo.message}
      />
      <div className="w-full flex flex-col p-2 gap-3">
        <h1 className="opacity-90 flex items-center justify-between">
          {formattedTitle}{" "}
          <Eye
            className="w-4 cursor-pointer"
            onClick={handleShowDetail}
            aria-label="View task details"
            role="button"
          />
        </h1>
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
