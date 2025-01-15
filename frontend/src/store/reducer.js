import dayjs from "dayjs";

const initialState = {
      currentStep: "",
      isOpenAddTask: false,
      taskInfo: {
            id: 0,
            title: "",
            description: "",
            date: dayjs(),
            priority: "",
            time: dayjs().add(1, "minute"),
            category: "",
            order: 0,
      },
      tasks: [],
      mode: "create"
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
                  return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
            case "UPDATE_TASK":
                  return { ...state, tasks: state.tasks.map((task) => task.id === state.taskInfo.id ? state.taskInfo : task) };
            case "CREATE_TASK":
                  return { ...state, tasks: [...state.tasks, state.taskInfo] };
            case "MARK_TASK_AS_COMPLETED":
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
            default:
                  return state;
      }
};
export default reducer;





