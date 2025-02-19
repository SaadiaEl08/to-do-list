import { myToast } from "@/constants";

const initialState = {
      currentStep: "",
      isOpenAddTask: false,
      taskInfo: {},
      tasks: [],
      mode: "create",
      accountInfo: {
            name: "User",
            username: "",
            image: "https://ui-avatars.com/api/?name=" + "User",
      },
      loginMode: "fake-user",
      search: {
            title: "",
            date: "Today",
            isCompleted: "",
      }
};
const reducer = (state = initialState, action) => {
      switch (action.type) {
            case "SET_STEP":
                  return { ...state, currentStep: action.payload };
            case "UPDATE_TASK_INFO":
                  return { ...state, taskInfo: { ...state.taskInfo, ...action.payload } };
            case "SET_IS_OPEN_ADD_TASK":
                  return { ...state, isOpenAddTask: action.payload };
            case "SET_TASKS":
                  return { ...state, tasks: action.payload };
            case "DELETE_TASK":
                  myToast("Task deleted successfully", "success");
                  return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
            case "UPDATE_TASK":
                  myToast("Task updated successfully", "success");
                  return { ...state, tasks: state.tasks.map((task) => task.id === state.taskInfo.id ? state.taskInfo : task) };
            case "CREATE_TASK":
                  myToast("Task created successfully", "success");
                  return { ...state, tasks: [...state.tasks, state.taskInfo] };
            case "MARK_TASK_AS_COMPLETED":
                  myToast("Task marked as completed successfully", "success");
                  return { ...state, tasks: state.tasks.map((task) => task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task) };
            case "SET_TASKS_ORDER":
                  return {
                        ...state, tasks: state.tasks.map((task) => {
                              const newOrder = action.payload.findIndex((payloadTask) => task.id === payloadTask.id) + 1;
                              return { ...task, order: newOrder };
                        }).sort((a, b) => a.order - b.order)
                  };
            case "SET_MODE":
                  return { ...state, mode: action.payload };
            case "SET_LOGIN_MODE":
                  return { ...state, loginMode: action.payload };
            case "SET_ACCOUNT_INFO":
                  return { ...state, accountInfo: { ...state.accountInfo, ...action.payload } };
            case "SET_SEARCH":
                  return { ...state, search: { ...state.search, ...action.payload } };
            default:
                  return state;
      }
};
export default reducer;





