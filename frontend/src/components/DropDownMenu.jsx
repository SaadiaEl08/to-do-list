import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const DropDownMenu = ({ items = [] }) => {
  const [selected, setSelected] = useState(items[0]);
  return (
    <Dropdown>
      <MenuButton className="text-foreground bg-dropDown px-2 py-1 rounded-lg flex justify-between items-center gap-2">
        <span>{selected}</span> <ChevronDown />
      </MenuButton>
      {items.length > 0 && (
        <Menu className="text-foreground bg-dropDown px-2 py-1 rounded-lg ms-1 mt-1 min-w-[150px]">
          {items.map((item, index) => (
            <MenuItem
              key={index}
              className={`"hover:bg-primary rounded px-2 py-1" ${
                selected === item ? "bg-primary" : ""
              }`}
              onClick={() => setSelected(item)}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Dropdown>
  );
};

export default DropDownMenu;
