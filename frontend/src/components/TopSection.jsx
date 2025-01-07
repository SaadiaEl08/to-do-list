import { ListFilter } from "lucide-react";
import { useLocation } from "react-router";

const TopSection = () => {
  const pathname = useLocation().pathname;
  const title=pathname.split("/")[1];
  return <div className="w-full text-foreground flex items-center justify-between px-6 py-4">
    <ListFilter />
    <p className="capitalize">{title}</p>
    <img src="/logo.svg" alt="profile image" className="rounded-full w-11 h-11 border" />


  </div>;
};

export default TopSection;
