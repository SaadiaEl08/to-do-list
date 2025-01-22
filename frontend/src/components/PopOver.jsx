import useKeyboardDetection from "@/hooks/useKeyboardDetection";
import { useEffect } from "react";

const PopOver = ({ isOpen, toggle, children }) => {
  const isKeyboardOpen = useKeyboardDetection();
  useEffect(()=>{
    if(isKeyboardOpen){
      window.scrollBy(0,-100)
    }
  },[isKeyboardOpen])

  return (
    <div
      className={`fixed text-foreground top-0 left-0 w-full min-h-full bg-black bg-opacity-50 z-30  ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={toggle}
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-popover rounded-xl  p-4 z-20 max-h-[90vh]  overflow-y-auto  border  hide-scrollbar sm:w-fit  ${
          isKeyboardOpen ? "translate-y-[-200px]" : ""
        } transition-transform duration-300`}
        onClick={(e) => e.stopPropagation()}
      >        
        {children}
      </div>
    </div>
  );
};

export default PopOver;
