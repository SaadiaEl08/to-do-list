import {
  Camera,
  ChevronRight,
  HelpCircle,
  Info,
  KeyRound,
  Lightbulb,
  LogOut,
  LucideHandshake,
  Settings,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const Profile = () => {
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
          onClick: () => console.log("Change account name"),
        },
        {
          icon: KeyRound,
          title: "Change account password",
          onClick: () => console.log("Change account password"),
        },
        {
          icon: Camera,
          title: "Change account Image",
          onClick: () => console.log("Change account Image"),
        },
      ],
    },
    {
      title: "Uptodo",
      sections: [
        {
          icon: HelpCircle,
          title: "About US",
          onClick: () => console.log("About US"),
        },
        {
          icon: Info,
          title: "FAQ",
          onClick: () => console.log("FAQ"),
        },
        {
          icon: Lightbulb,
          title: "Help & Feedback",
          onClick: () => console.log("Help & Feedback"),
        },
        {
          icon: LucideHandshake,
          title: "Support US",
          onClick: () => console.log("Support US"),
        },
      ],
    },
  ];
  return (
    <div className=" w-full text-foreground flex flex-col items-center gap-4">
      <img
        src="/logo.svg"
        alt="profile photo"
        className="rounded-full w-20 h-20  object-fill "
      />
      <span className="capitalize">User name</span>
      <div className=" w-full flex flex-wrap justify-evenly items-center px-4 py-2">
        <div className="text-center px-9 py-4 bg-popover rounded-lg">
          Task left
        </div>
        <div className="text-center px-9 py-4 bg-popover rounded-lg">
          Task Done
        </div>
      </div>
      <div className="w-full flex flex-col gap-6 ">
        {listItems.map((item) => (
          <div key={item.title} className=" w-full flex flex-col gap-4 px-4  ">
            <h3 className="text-[#AFAFAF]">{item.title}</h3>
            {item.sections.map((section) => (
              <div
                key={section.title}
                className="flex items-center justify-between gap-2 w-full cursor-pointer hover:bg-popover rounded-lg p-2"
                onClick={section.onClick}
              >
                <div className="flex items-center gap-2 w-full ">
                  <section.icon />
                  <span>{section.title}</span>
                </div>
                <ChevronRight />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="w-full p-4 pb-6 flex  ">
        <Link to="/logout" className="text-red-500  flex items-center justify-between ">
          <LogOut className="mr-2  w-6 h-6" />
          <span>Log out</span>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
