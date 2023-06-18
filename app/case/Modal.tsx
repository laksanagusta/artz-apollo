interface ModalProps {
  modalIsOpen: boolean;
  //   setModalIsOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalIsOpen, children }) => {
  return (
    <dialog
      id="my_modal_4"
      className={`modal ${modalIsOpen ? "modal-open" : ""}`}
    >
      {children}
    </dialog>
  );
};

export default Modal;
