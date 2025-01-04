import dayjs from "dayjs";
import {
  BookOpenTextIcon,
  BriefcaseBusiness,
  Dumbbell,
  Film,
  Heart,
  Home,
  Music,
  PenTool,
  ShoppingCart,
  Users,
} from "lucide-react";
export const steps = {
  TASK_FORM: "taskForm",
  SCHEDULE: "schedule",
  TIMER: "timer",
  PRIORITY: "priority",
  CATEGORY: "category",
  CREATE_CATEGORY: "createCategory",
};
export const categories = [
  {
    name: "Grocery",
    color: "#CCFF80",
    icon: <ShoppingCart />,
  },
  {
    name: "Work",
    color: "#FF9680",
    icon: <BriefcaseBusiness />,
  },
  {
    name: "Sport",
    color: "#80FFFF",
    icon: <Dumbbell />,
  },
  {
    name: "Design",
    color: "#80FFD9",
    icon: <PenTool />,
  },
  {
    name: "University",
    color: "#809CFF",
    icon: <BookOpenTextIcon />,
  },
  {
    name: "Social",
    color: "#FF80EB",
    icon: <Users />,
  },
  {
    name: "Music",
    color: "#FC80FF",
    icon: <Music />,
  },
  {
    name: "Health",
    color: "#80FFA3",
    icon: <Heart />,
  },
  {
    name: "Movie",
    color: "#80D1FF",
    icon: <Film />,
  },
  {
    name: "Home",
    color: "#FFCC80",
    icon: <Home />,
  },
];
export let priorities = [
  {
    name: "High",
    color: "#f43f5e",
  },
  {
    name: "Medium",
    color: "#f59e0b",
  },
  {
    name: "Low",
    color: "#3b82f6",
  },
];

export const getDay = (date) => {
  if (date === dayjs()) return "Today";
  if (date === dayjs().add(1, "day")) return "Tomorrow";
  return date.format("dddd, MMM DD");
};
