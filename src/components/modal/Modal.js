import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const PromptModal = ({
  body,
  isOpen,
  toggle,
  onCancel,
  onSubmit,
  noSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody style={{ fontSize: "1.2rem" }}>{body}</ModalBody>
      <ModalFooter>
        {!noSubmit && (
          <>
            <Button color="primary" onClick={onCancel}>
              Cancel
            </Button>{" "}
            <Button outline onClick={onSubmit}>
              Yes, continue
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default PromptModal;
