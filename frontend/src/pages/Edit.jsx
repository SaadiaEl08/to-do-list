import TaskDetail from "@/components/TaskDetail";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const Edit = () => {
  const id = useParams().taskId;
  const tasks = useSelector((state) => state.tasks);
  const [taskToShowDetail, setTaskToShowDetail] = useState(null);
  const loginMode = useSelector((state) => state.loginMode);
  useEffect(() => {
    const task = tasks.find((task) => loginMode == "fake-user" ? task.id == id : task.documentId == id);
    setTaskToShowDetail(task);
  }, [id, loginMode, tasks]);
  return taskToShowDetail ? <TaskDetail task={taskToShowDetail} /> : <h1 className="text-center text-foreground">No tasks available under the given id</h1>;
};

export default Edit;
