import { Button, Modal } from "@mbicycle/foundation-ui-kit"

interface LeaveDialogProps {
  isOpen: boolean
  handleClose: VoidFunction
  handleLeave: VoidFunction
}

function LeaveDialog({ isOpen, handleClose, handleLeave }: LeaveDialogProps): JSX.Element {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title="Leave page?"
      classNameTitle="text-2xl"
      classNameContent="px-14 py-14"
    >
      <div className="my-10">
        <p className="text-lg text-gray-600">Changes that you made may not be saved.</p>
      </div>
      <div className="flex flex-row justify-end gap-8">
        <Button variant="empty" className="text-lg" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="transparent"
          className="border-red-600 text-lg text-red-600 hover:border-red-700 hover:bg-red-100"
          onClick={handleLeave}
          autoFocus
        >
          Leave
        </Button>
      </div>
    </Modal>
  )
}

export default LeaveDialog
