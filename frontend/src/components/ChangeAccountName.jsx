import ActionBar from "./ActionBar";
import PopOver from "./PopOver";

const ChangeAccountName = ({ setChangeAccount }) => {
  return (
    <PopOver isOpen={true} toggle={() => setChangeAccount(null)}>
      <div className="flex flex-col items-center gap-4 p-4 w-[80vw]">
        <h3>Change account name</h3>
        <div className="w-full border "></div>
        <input
          type="text"
          placeholder="Enter new name"
          className="w-full p-2 bg-input focus:outline-none focus:border focus:border-muted-foreground"
        />
        <ActionBar cancelActionFunction={() => setChangeAccount(null)}  nextActionFunction={() => setChangeAccount(null)}/>
      </div>
    </PopOver>
  );
};

export default ChangeAccountName;
