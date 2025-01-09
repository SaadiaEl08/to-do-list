const PopOver = ({ isOpen, toggle, children }) => {
  return (
    <div
      className={`fixed text-foreground top-0 left-0 w-full min-h-full bg-black bg-opacity-50 z-30  ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={toggle} 
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-popover rounded-xl  p-4 z-20 max-h-[90vh]  overflow-y-auto  border  hide-scrollbar"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>
  );
};

export default PopOver;
