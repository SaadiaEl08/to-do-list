import { useDispatch } from "react-redux";

const ActionBar = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-full flex items-center justify-between  ">
      <button className="text-primary h-12 px-5 w-full" onClick={() => dispatch({ type: "SET_IS_OPEN_ADD_TASK", payload: false })}>Cancel</button>
      <button className="text-foreground h-12 px-5 w-full bg-primary rounded ">
        Save
      </button>
    </div>
  );
};

export default ActionBar;
