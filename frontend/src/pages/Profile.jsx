import ChangeAccountName from "@/components/ChangeAccountName";
import ChangeAccountPassword from "@/components/ChangeAccountPassword";
import ChangeAccountImage from "@/components/ChangeAccountImage";
import {
  Camera,
  HelpCircle,
  Info,
  KeyRound,
  Lightbulb,
  LogOut,
  LucideHandshake,
  Settings,
  User,
} from "lucide-react";
import { useState , useContext} from "react";
import {  useNavigate } from "react-router";
import AppInfo from "@/components/AppInfo";
import ListItem from "@/components/ListItem";
import { useSelector } from "react-redux";
import { AuthContext } from "@/contexts/AuthContext";

const Profile = () => {
  const [changeAccount, setChangeAccount] = useState(null);
  const [appInfos, setAppInfos] = useState(null);
  const { name, image } = useSelector((state) => state.accountInfo);
  const nav = useNavigate();
  const listItems = [
    {
      title: "Setting",
      sections: [
        {
          icon: Settings,
          title: "App Settings",
          onClick: () => nav("/setting"),
        },
      ],
    },
    {
      title: "Account",
      sections: [
        {
          icon: User,
          title: "Change account name",
          onClick: () => setChangeAccount("name"),
        },
        {
          icon: KeyRound,
          title: "Change account password",
          onClick: () => setChangeAccount("password"),
        },
        {
          icon: Camera,
          title: "Change account Image",
          onClick: () => setChangeAccount("image"),
        },
      ],
    },
    {
      title: "Uptodo",
      sections: [
        {
          icon: HelpCircle,
          title: "About US",
          onClick: () => setAppInfos("about"),
        },
        {
          icon: Info,
          title: "FAQ",
          onClick: () => setAppInfos("faq"),
        },
        {
          icon: Lightbulb,
          title: "Help & Feedback",
          onClick: () => setAppInfos("help"),
        },
        {
          icon: LucideHandshake,
          title: "Support US",
          onClick: () => setAppInfos("support"),
        },
      ],
    },
  ];
  const notCompletedTasks = useSelector(
    (state) => state.tasks.filter((task) => !task.isCompleted).length
  );
  const completedTasks = useSelector(
    (state) => state.tasks.filter((task) => task.isCompleted).length
  );
  const { logout } =useContext(AuthContext);
  return (
    <div className=" w-full text-foreground flex flex-col items-center gap-4 md:w-[86%]  ">
      <img
        src={image}
        alt="profile photo"
        className={`rounded-full w-20 h-20  object-fill ${
          image.includes("ui-avatars.com") ? "" : "-scale-x-100"
        }  border border-primary`}
      />
      <span className="capitalize">{name}</span>
      <div className=" w-full flex flex-wrap justify-evenly items-center px-4 py-2 gap-3">
        <div className="text-center px-9 py-4 bg-popover rounded-lg">
          {notCompletedTasks} Task{notCompletedTasks > 1 ? "s" : ""} left
        </div>
        <div className="text-center px-9 py-4 bg-popover rounded-lg">
          {completedTasks} Task{completedTasks > 1 ? "s" : ""} Done
        </div>
      </div>
      <div className="w-full flex flex-col gap-6 ">
        {listItems.map((item, index) => (
          <ListItem item={item} key={index} />
        ))}
      </div>
      <div className="w-full p-4 pb-6 flex  ">
        <button
          onClick={logout}
          className="text-red-500  flex items-center justify-between "
        >
          <LogOut className="mr-2  w-6 h-6" />
          <span>Log out</span>
        </button>
      </div>
      {changeAccount === "name" && (
        <ChangeAccountName setChangeAccount={setChangeAccount} />
      )}
      {changeAccount === "password" && (
        <ChangeAccountPassword setChangeAccount={setChangeAccount} />
      )}
      {changeAccount === "image" && (
        <ChangeAccountImage setChangeAccount={setChangeAccount} />
      )}
      {appInfos && <AppInfo appInfos={appInfos} setAppInfos={setAppInfos} />}
    </div>
  );
};

export default Profile;
