import { ListFilter } from "lucide-react";

const TopSection = () => {
  return <div className="w-full text-foreground flex items-center justify-between px-6 py-4">
    <ListFilter />
    <p>Home</p>
    <img src="/logo.svg" alt="profile image" className="rounded-full w-11 h-11 border" />


  </div>;
};

export default TopSection;
