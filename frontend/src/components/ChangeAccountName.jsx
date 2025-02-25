import { useState } from "react";
import ActionBar from "./ActionBar";
import PopOver from "./PopOver";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUser } from "@/apis/User";
import { myToast } from "@/constants";

const ChangeAccountName = ({ setChangeAccount }) => {
  const dispatch = useDispatch();
  const accountInfo = useSelector((state) => state.accountInfo);
  const [name, setName] = useState(
    accountInfo?.name ||
      JSON.parse(localStorage.getItem("accountInfo"))?.name ||
      ""
  );
  const loginMode = useSelector((state) => state.loginMode);
  const { mutate } = useUpdateUser();
  const handleSubmitNewName = () => {
    if (loginMode !== "fake-user") {
      mutate(
        { id: accountInfo.id, data: { name: name } },
        {
          onSuccess: () => {
            dispatch({
              type: "SET_ACCOUNT_INFO",
              payload: { name: name },
            });
            const accountInfo =
              JSON.parse(localStorage.getItem("accountInfo")) || {};
            accountInfo.name = name;
            localStorage.setItem("accountInfo", JSON.stringify(accountInfo));
            setChangeAccount(null);
            myToast("Name changed successfully", "success");
          },
          onError: () => {},
        }
      );
    } else {
      dispatch({
        type: "SET_ACCOUNT_INFO",
        payload: { name: name },
      });
      const accountInfo = JSON.parse(localStorage.getItem("accountInfo")) || {};
      accountInfo.name = name;
      localStorage.setItem("accountInfo", JSON.stringify(accountInfo));
      setChangeAccount(null);
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value.slice(0, 30));
  };
  return (
    <PopOver isOpen={true} toggle={() => setChangeAccount(null)}>
      <div className="flex flex-col items-center gap-4 p-4 w-[80vw]">
        <h3>Change account name</h3>
        <div className="w-full border "></div>
        <input
          min={8}
          value={name}
          onChange={handleNameChange}
          type="text"
          placeholder="Enter new name"
          className="w-full p-2 bg-input focus:outline-none focus:border focus:border-muted-foreground"
        />
        <ActionBar
          cancelActionFunction={() => setChangeAccount(null)}
          nextActionFunction={handleSubmitNewName}
        />
      </div>
    </PopOver>
  );
};

export default ChangeAccountName;
