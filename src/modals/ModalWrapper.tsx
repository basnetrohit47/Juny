import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ReactElement } from "react";
import { useModalStore } from "../store/modal.store";

interface Props {
  handleSubmit?: () => void;
  handleCancel?: () => void;
  children: ReactElement;
  title?: string;
  text?: string;
}
export const ModalWrapper = ({
  handleSubmit,
  handleCancel,
  children,
  title = "Title",
  text = "Submit",
}: Props) => {
  const closeModal = useModalStore((state) => state.closeModal);

  const handleClose = () => {
    if (handleCancel) {
      handleCancel();
    } else {
      closeModal();
    }
  };

  return (
    <Dialog
      fullWidth={true}
      open={true}
      onClose={closeModal}
      PaperProps={{
        component: "form",
        sx: { borderRadius: "12px" },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>
          {text}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
