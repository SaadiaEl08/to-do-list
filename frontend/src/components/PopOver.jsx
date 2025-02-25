import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
const PopOver = ({ isOpen, toggle, children }) => {
  const isHistoryModified = useRef(false); // Track if we modified the history state

  useEffect(() => {
    if (isOpen) {
      // Push a new history state only if the popup opens
      window.history.pushState({ popupOpen: true }, "");
      isHistoryModified.current = true;
    }
  
    const handlePopState = () => {
      // Check if the history state was modified by the popup
      if (isHistoryModified.current && isOpen) {
        toggle(); // Close the popup
      }
    };
  
    window.addEventListener("popstate", handlePopState);
  
    return () => {
      window.removeEventListener("popstate", handlePopState);
  
      // Clean up the modified history state only if the popup was open
      if (isHistoryModified.current) {
        isHistoryModified.current = false;
      }
    };
  }, [isOpen, toggle]);
  

  return (
    <div
      className={`fixed text-foreground top-0 left-0 w-full min-h-full bg-black bg-opacity-50 z-30  ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={toggle}
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-popover rounded-xl  p-4 z-20 max-h-[90vh]  overflow-y-auto  border  hide-scrollbar sm:w-fit`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default PopOver;
