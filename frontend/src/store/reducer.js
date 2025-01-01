const initialState = {
      currentStep: "",
      isOpenAddTask: false,
      taskInfo: {
            title: "",
            description: "",
            date: "",
            priority: "",
            time: "",
            category: "",
      },
};
const reducer = (state = initialState, action) => {
      switch (action.type) {
            case "SET_STEP":
                  return { ...state, currentStep: action.payload };
            case "UPDATE_TASK_INFO":
                  return { ...state, taskInfo: { ...state.taskInfo, ...action.payload } };
            case "SET_IS_OPEN_ADD_TASK":
                  return { ...state, isOpenAddTask: action.payload };
            default:
                  return state;
      }
};
export default reducer;