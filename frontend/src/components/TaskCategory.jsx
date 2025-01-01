import {
  BookOpenTextIcon,
  BriefcaseBusiness,
  Dumbbell,
  Film,
  Heart,
  Home,
  Music,
  PenTool,
  PlusCircle,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useState } from "react";
import ActionBar from "./ActionBar";

const TaskCategory = ({ handleCreateCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const category = [
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
  return (
    <div className="w-[80vw]">
      <h1 className="text-xl font-bold">Task Category</h1>
      <div className="flex flex-wrap gap-4 items-center justify-evenly pt-4">
        {category.map((item) => (
          <div
            key={item.name}
            className={` transition-all duration-100 rounded flex flex-col items-center justify-center ${
              selectedCategory === item.name ? "border-2 border-primary" : ""
            }`}
            onClick={() => setSelectedCategory(item.name)}
          >
            <div
              className="w-16 h-16 flex items-center justify-center rounded  text-black"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
        <div
          className={`rounded flex flex-col items-center justify-center `}
          onClick={() => handleCreateCategoryClick()}
        >
          <div className="border w-16 h-16 flex items-center justify-center rounded bg-[#80FFD1] text-black">
            <PlusCircle />
          </div>
          <p>Create New</p>
        </div>
      </div>
      <ActionBar/>

    </div>
  );
};

export default TaskCategory;
