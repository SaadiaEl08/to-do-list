import { ChevronRight } from "lucide-react";

const ListItem = ({ item }) => {
  return (
    <div  className=" w-full flex flex-col gap-4 px-4  ">
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
  );
};

export default ListItem;
