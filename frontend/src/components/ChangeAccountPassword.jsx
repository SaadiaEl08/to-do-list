/* eslint-disable react/prop-types */
import { useState } from "react";
import ActionBar from "./ActionBar";
import PopOver from "./PopOver";
import { Eye, EyeClosed} from "lucide-react";

const ChangeAccountPassword = ({ setChangeAccount }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <PopOver isOpen={true} toggle={() => setChangeAccount(null)}>
      <div className="flex flex-col items-center gap-4 p-4 w-[80vw]">
        <h3>Change account Password</h3>
        <div className="w-full border "></div>
        <div className="w-full grid gap-2">
          <label htmlFor="oldPassword" className="text-sm">
            Enter old password
          </label>
          <div className="flex items-center gap-1">
            <input
              id="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter old password"
              className="w-full p-2 bg-input focus:outline-none focus:border focus:border-muted-foreground"
            />
            {showOldPassword ? (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowOldPassword(false)}
              />
            ) : (
              <EyeClosed
                className="cursor-pointer"
                onClick={() => setShowOldPassword(true)}
              />
            )}
          </div>
        </div>
        <div className="w-full grid gap-2">
          <label htmlFor="newPassword" className="text-sm">
            Enter new password
          </label>
          <div className="flex items-center gap-1">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full p-2 bg-input focus:outline-none focus:border focus:border-muted-foreground"
            />
            {showNewPassword ? (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowNewPassword(false)}
              />
            ) : (
              <EyeClosed
                className="cursor-pointer"
                onClick={() => setShowNewPassword(true)}
              />
            )}
          </div>
        </div>
        <div className="w-full grid gap-2">
          <label htmlFor="confirmNewPassword" className="text-sm">
            Confirm new password
          </label>
          <div className="flex items-center gap-1">
            <input
              id="confirmNewPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full p-2 bg-input focus:outline-none focus:border focus:border-muted-foreground"
            />
            {showConfirmPassword ? (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <EyeClosed
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>
        </div>
        <ActionBar
          cancelActionFunction={() => setChangeAccount(null)}
          nextActionFunction={() => setChangeAccount(null)}
        />
      </div>
    </PopOver>
  );
};

export default ChangeAccountPassword;
