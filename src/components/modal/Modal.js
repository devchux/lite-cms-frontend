import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const PromptModal = ({ body, isOpen, toggle, onCancel, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
        <p style={{ fontSize: "1.2rem" }}>{body}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onCancel}>
          Cancel
        </Button>{" "}
        <Button outline onClick={onSubmit}>
          Yes, continue
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PromptModal;
