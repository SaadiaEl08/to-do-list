import ListItem from "@/components/ListItem";
import { Brush, ChevronLeft, Import, Languages, Type } from "lucide-react";
import { useNavigate } from "react-router";

const Setting = () => {
  const nav = useNavigate();
  const listItems = [
    {
      title: "Setting",
      sections: [
        {
          icon: Brush,
          title: "Change app color",
          onClick: () => console.log("Change app color"),
        },
        {
          icon: Type,
          title: "Change app typography",
          onClick: () => console.log("Change app color"),
        },
        {
          icon: Languages,
          title: "Change app language",
          onClick: () => console.log("Change app color"),
        },
      ],
    },
    {
      title: "Import",
      sections: [
        {
          icon: Import,
          title: "Import from Google calendar",
          onClick: () => console.log("Change app color"),
        },
      ],
    },
  ];
  return (
    <main className="w-full min-h-screen h-screen bg-background p-2 text-foreground flex flex-col items-center ">
      <div className="w-full md:w-[86%]">
        <header className="flex items-center p-2">
          <ChevronLeft
            onClick={() => nav(-1)}
            className="cursor-pointer w-6 h-6   "
          />
          <h1 className="text-2xl  m-auto">Settings</h1>
        </header>
        <div className="w-full flex flex-col gap-6 mt-4 ">
          {listItems.map((item, index) => (
            <ListItem item={item} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Setting;
