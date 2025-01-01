import { steps } from "@/constants";

export const initialState = {
      currentStep: steps.TASK_FORM,
      taskInfo: {
            title: "",
            description: "",
            date: "",
            priority: "",
            time: "",
            category: "",
      },
};
const reducer = (state, action) => {
      switch (action.type) {
            case "SET_STEP":
                  return { ...state, currentStep: action.payload };
            case "UPDATE_TASK_INFO":
                  return { ...state, taskInfo: { ...state.taskInfo, ...action.payload } };
            default:
                  return state;
      }
};
export default reducer;