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
import { toast } from "react-toastify";
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
  if (dayjs(date) === dayjs()) return "Today";
  if (dayjs(date) === dayjs().add(1, "day")) return "Tomorrow";
  return dayjs(date).format("dddd, MMM DD");
};
export const myToast = (message, type ) => {
  const theme = localStorage.getItem("theme") || "dark";
  toast.dismiss();
  toast[type](message, {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: theme,
  });
};
export const fakeTasks = [
  {
    id: 1,
    title: "Complete project report",
    description:
      "Finish the final draft of the project report for client review.",
    date: dayjs("2024-12-31"),
    time: dayjs().add(2, "hour").format("HH:mm:ss"),
    priority: "High",
    category: {name:"Work"},
    isCompleted: true,
    order: 1,
  },
  {
    id: 2,
    title: "Clean the house",
    description: "Vacuum the floors and clean the kitchen and bathroom.",
    date: dayjs("2025-01-15"),
    time: dayjs().add(3, "hours").format("HH:mm:ss"),
    priority: "Medium",
    category: {name:"Home"},
    isCompleted: false,
    order: 2,
  },
  {
    id: 3,
    title: "Buy groceries",
    description: "Pick up vegetables, fruits, and household essentials.",
    date: dayjs(),
    time: dayjs().add(1, "hour"),
    priority: "Low",
    category: {name:"Grocery"},
    isCompleted: true,
    order: 3,
  },
  {
    id: 4,
    title: "Schedule doctor appointment",
    description:
      "Call the clinic to schedule an appointment for a check-up.",
    date: dayjs().add(1, "day"),
    time: dayjs().add(2, "hour"),
    priority: "Medium",
    category: {name:"Health"},
    isCompleted: false,
    order: 4,
  },
  {
    id: 5,
    title: "Submit budget proposal",
    description:
      "Submit the finalized budget proposal to the finance department.",
    date: dayjs().add(2, "day"),
    time: dayjs().add(1, "hour"),
    priority: "High",
    category: {name:"Work"},
    isCompleted: true,
    order: 5,
  },
  {
    id: 6,
    title: "Pick up laundry",
    description: "Pick up cleaned laundry from the dry cleaners.",
    date: dayjs().add(3, "day"),
    time: dayjs().add(1, "hour"),
    priority: "Low",
    category: {name:"Errands"},
    isCompleted: false,
    order: 6,
  },
  {
    id: 7,
    title: "Prepare for meeting",
    description: "Prepare materials and agenda for Monday's team meeting.",
    date: dayjs().add(1, "week"),
    time: dayjs().add(4, "hour"),
    priority: "High",
    category: {name:"Work"},
    isCompleted: true,
    order: 7,
  },
  {
    id: 8,
    title: "Plan weekend trip",
    description:
      "Research hotels and activities for a weekend getaway to the mountains.",
    date: dayjs("2025-02-05"),
    time: dayjs().add(5, "hours"),
    priority: "Medium",
    category: {name:"Personal"},
    isCompleted: false,
    order: 8,
  },
];