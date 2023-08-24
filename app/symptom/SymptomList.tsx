import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import ModalSymptom from "./ModalSymptom";
import Modal from "./Modal";

interface SymptomListProps {
  symptomProps: any;
  setIsRefresh: (open: string) => string | void;
}

const SymptomList: React.FC<SymptomListProps> = ({
  symptomProps,
  setIsRefresh,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <tr
      key={symptomProps.key}
      className="hover:bg-gray-100 transition-colors group border-t"
    >
      <td className="py-2 pl-10">
        <div>{symptomProps.name}</div>
        <div className="text-xs">{symptomProps.description}</div>
      </td>
      <td className="text-sm px-4">{symptomProps.createdAt} </td>
      <td className="text-sm px-4">{symptomProps.updatedAt} </td>
      <td className="gap-2 px-4">
        <div className="flex gap-2 justify-end pr-6">
          <AiOutlineEdit
            size={18}
            className="text-blue-500"
            onClick={() => setModalIsOpen(true)}
          />
          <Modal modalIsOpen={modalIsOpen}>
            <ModalSymptom
              symptomProps={symptomProps}
              setModalIsOpen={setModalIsOpen}
              setIsRefresh={setIsRefresh}
              edit={true}
            />
          </Modal>
          <AiOutlineDelete size={18} className="text-red-500" />
        </div>
      </td>
    </tr>
  );
};

export default SymptomList;
