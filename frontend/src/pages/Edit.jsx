import TaskDetail from "@/components/TaskDetail";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const Edit = () => {
  const id = useParams().taskId;
  const tasks = useSelector((state) => state.tasks);
  const [taskToShowDetail, setTaskToShowDetail] = useState(null);
  useEffect(() => {
    const task = tasks.find((task) => task.id == id);
    setTaskToShowDetail(task);
  }, [id, tasks]);
  return taskToShowDetail && <TaskDetail task={taskToShowDetail} />;
};

export default Edit;
