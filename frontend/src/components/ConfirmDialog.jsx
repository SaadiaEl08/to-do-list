import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  className,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      sx={{
        ".MuiDialog-paper": {
          backgroundColor: "var(--popover)",
          color: "var(--foreground)",
        },
      }}
    >
      <DialogTitle id="confirm-dialog-title" className="text-foreground">
        {title || "Confirm Action"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className="sm:text-2xl "
          id="confirm-dialog-description"
          sx={{
            color: "var(--foreground)",
          }}
        >
          {message || "Are you sure you want to proceed?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          onClick={onClose}
          className="text-muted-foreground  rounded px-2 py-1"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={
            "text-white  bg-green-700 rounded px-2 py-1 hover:scale-105 sm:text-xl " +
            className
          }
        >
          Confirm
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
