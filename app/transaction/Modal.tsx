interface ModalProps {
  modalIsOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalIsOpen, children }) => {
  return (
    <dialog
      id="my_modal_3"
      className={`modal ${modalIsOpen ? "modal-open" : ""}`}
    >
      {children}
    </dialog>
  );
};

export default Modal;
