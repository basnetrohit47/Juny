import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useToastStore } from "../../store/toast.store";

export const ToastManager = () => {
  const { isOpen, message, hideToast, toastAction } = useToastStore();
  const handleUndo = () => {
    if (toastAction) {
      toastAction();
    }
    hideToast();
  };
  const action = (
    <>
      {toastAction && (
        <Button size="small" onClick={handleUndo}>
          UNDO
        </Button>
      )}

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={hideToast}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        message={message}
        onClose={hideToast}
        action={action}
      />
    </>
  );
};
