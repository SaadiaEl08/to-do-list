import PopOver from "./PopOver";

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  className,
}) => {
  return (
    <PopOver isOpen={open} toggle={onClose}>
      <div className="w-full  flex flex-col justify-start gap-4 ">
        <div className="dialog-title ">
          <h1 className="text-foreground">{title}</h1>
        </div>
        <div className=" description">
          <p className="text-foreground">{message}</p>
        </div>
        <div className="action w-full flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-muted-foreground  rounded px-2 py-1"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={
              "text-white  bg-green-700 rounded px-2 py-1 hover:scale-105 transition-all duration-150 sm:text-xl " +
              className
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </PopOver>
  );
};

export default ConfirmDialog;
