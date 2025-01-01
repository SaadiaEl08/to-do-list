const ActionBar = () => {
  return (
    <div className="w-full flex items-center justify-between  ">
      <button className="text-primary h-12 px-5 w-full">Cancel</button>
      <button className="text-foreground h-12 px-5 w-full bg-primary rounded ">
        Save
      </button>
    </div>
  );
};

export default ActionBar;
