import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import ModalCase from "./ModalCase";
import Modal from "./Modal";

interface CaseListProps {
  caseProps: any;
  setIsRefresh: (open: string) => string | void;
}

const CaseList: React.FC<CaseListProps> = ({ caseProps, setIsRefresh }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <tr
      key={caseProps.key}
      className="hover:bg-gray-100 transition-colors group border-t"
    >
      <td className="py-2 pl-10">
        <div>{caseProps.name}</div>
        <div className="text-xs">{caseProps.description}</div>
      </td>
      <td className="text-sm px-4">{caseProps.createdAt} </td>
      <td className="text-sm px-4">{caseProps.updatedAt} </td>
      <td className="gap-2 px-4">
        <div className="flex gap-2 justify-end pr-6">
          <AiOutlineEdit
            size={18}
            className="text-blue-500"
            onClick={() => setModalIsOpen(true)}
          />
          <Modal modalIsOpen={modalIsOpen}>
            <ModalCase
              caseProps={caseProps}
              setModalIsOpen={setModalIsOpen}
              edit={true}
              setIsRefresh={setIsRefresh}
            />
          </Modal>
          <AiOutlineDelete size={18} className="text-red-500" />
        </div>
      </td>
    </tr>
  );
};

export default CaseList;
