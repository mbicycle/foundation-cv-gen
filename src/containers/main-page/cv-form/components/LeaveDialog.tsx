import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface LeaveDialogProps {
  isOpen: boolean,
  handleClose: VoidFunction,
  handleLeave: VoidFunction,
}

function LeaveDialog({ isOpen, handleClose, handleLeave }: LeaveDialogProps): JSX.Element {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle fontSize="3rem">
        Leave page?
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontSize="2rem">
          Changes that you made may not be saved.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleLeave} autoFocus>
          Leave
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LeaveDialog;
