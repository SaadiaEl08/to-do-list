import { useCategories } from "@/apis/Category";
import { useCreateTask, useUpdateTask } from "@/apis/Task";
import { myToast, steps } from "@/constants";
import { AlarmClockPlus, LucideFlag, SendHorizonal, Tag } from "lucide-react";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const TaskForm = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const taskInfo = useSelector((state) => state.taskInfo);
  const loginMode = useSelector((state) => state.loginMode);
  const { data: categories = [] } = useCategories();
  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();

  const handleSaveTask = useCallback(() => {
    // Check if title and description are provided
    if (taskInfo.title && taskInfo.description) {
      let { id, ...data } = taskInfo;
      data.priority === "" && (data.priority = "null");
      data.category == "" || data.category?.name === "null"
        ? (data.category = categories.find((c) => c.name == "null")?.id)
        : (data.category = categories.find((c) => c.name == data.category)?.id);
      // Handle create mode
      if (mode === "create") {
        if (loginMode !== "fake-user") {
          // If not fake-user, create the task via API
          createTask(
            { data: data },
            {
              onSuccess: () => {
                // Dispatch the task to state
                dispatch({ type: "CREATE_TASK", payload: taskInfo });
                dispatch({ type: "SET_IS_OPEN_ADD_TASK", payload: false });
              },
              onError: (err) => {
                // Log the error from API response
                myToast(err.response.data.error.message, "error");
              },
            }
          );
        } else {
          // If fake-user, create the task locally via dispatch
          dispatch({ type: "CREATE_TASK", payload: taskInfo });
          dispatch({ type: "SET_IS_OPEN_ADD_TASK", payload: false });
        }
      }
      // Handle edit mode
      else if (mode === "edit") {
        if (loginMode !== "fake-user") {
          // If not fake-user, update the task via API
          updateTask(
            { id: id, data: data },
            {
              onSuccess: () => {
                // Dispatch the updated task to state
                dispatch({ type: "UPDATE_TASK", payload: taskInfo });
                dispatch({ type: "SET_IS_OPEN_ADD_TASK", payload: false });
              },
              onError: (err) => {
                // Log the error from API response
                myToast(err.response.data.error.message, "error");
              },
            }
          );
        } else {
          // If fake-user, update the task locally via dispatch
          dispatch({ type: "UPDATE_TASK", payload: taskInfo });
          dispatch({ type: "SET_IS_OPEN_ADD_TASK", payload: false });
        }
      }
    } else {
      // If title or description is missing, alert the user
      alert("Please fill all the fields");
    }
  console.log("taskInfo22",taskInfo);

  }, [categories, createTask, dispatch, loginMode, mode, taskInfo, updateTask]);

  useEffect(() => {
    const enterClickEvent = (e) => {
      if (e.key === "Enter") {
        handleSaveTask();
      }
    };
    window.addEventListener("keydown", enterClickEvent);
    return () => {
      window.removeEventListener("keydown", enterClickEvent);
    };
  }, [handleSaveTask]);

  return (
    <div className={`w-[80vw] flex flex-col gap-4 sm:w-[50vw] lg:w-[40vw]`}>
      <h1>{mode === "create" ? "Add" : "Edit"} Task</h1>
      <input
        type="text"
        placeholder="Title"
        className="bg-transparent h-10 rounded focus:p-3 focus:transition-all focus:duration-300 outline-none focus:border focus:border-muted-foreground w-full"
        onChange={(e) =>
          dispatch({
            type: "UPDATE_TASK_INFO",
            payload: { title: e.target.value },
          })
        }
        value={taskInfo.title}
      />
      <input
        type="text"
        placeholder="Description"
        className="bg-transparent h-10 rounded focus:p-3 focus:transition-all focus:duration-300 outline-none focus:border focus:border-muted-foreground w-full"
        onChange={(e) =>
          dispatch({
            type: "UPDATE_TASK_INFO",
            payload: { description: e.target.value },
          })
        }
        value={taskInfo.description}
      />
      <div className=" flex items-center justify-between  p-3">
        <div className="flex items-center justify-between gap-4">
          <AlarmClockPlus
            title="Schedule task"
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: steps.SCHEDULE })
            }
            className={`cursor-pointer ${
              taskInfo.date && taskInfo.time ? "text-primary" : ""
            }`}
          />
          <Tag
            className={`cursor-pointer ${
              taskInfo.category ? "text-primary" : ""
            }`}
            title="Add category"
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: steps.CATEGORY })
            }
          />
          <LucideFlag
            className={`cursor-pointer ${
              taskInfo.priority !== "" && taskInfo.priority !== "null" ? "text-primary" : ""
            }`}
            title="Set priority"
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: steps.PRIORITY })
            }
          />
        </div>
        <SendHorizonal
          title="Save task"
          id="saveTask"
          onClick={handleSaveTask}
          className={`text-primary  ${
            taskInfo.title && taskInfo.description
              ? "cursor-pointer opacity-100 pointer-events-auto"
              : "cursor-not-allowed opacity-30 pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
};

export default TaskForm;
