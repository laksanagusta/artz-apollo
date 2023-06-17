import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import ModalMember from "./ModalMember";
import Modal from "./Modal";

interface MemberListProps {
  member: any;
}

const MemberList: React.FC<MemberListProps> = ({ member }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <tr
      key={member.id}
      className="hover:bg-gray-100 transition-colors group border-t"
    >
      <td className="py-2 pl-10">
        <div>{member.firstName}</div>
        <div>{member.lastName}</div>
      </td>
      <td className="text-sm px-4">{member.age} </td>
      <td className="text-sm px-4">{member.address} </td>
      <td className="text-sm px-4">{member.phone_number} </td>
      <td className="text-sm px-4">{member.createdAt} </td>
      <td className="text-sm px-4">{member.updatedAt} </td>
      <td className="gap-2 px-4">
        <div className="flex gap-2 justify-end pr-6">
          <AiOutlineEdit
            size={18}
            className="text-blue-500"
            onClick={() => setModalIsOpen(true)}
          />
          <Modal modalIsOpen={modalIsOpen}>
            <ModalMember
              firstNameProps={member.firstName}
              lastNameProps={member.lastName}
              ageProps={member.age}
              addressProps={member.address}
              phoneNumberProps={member.phone_number}
              setModalIsOpen={setModalIsOpen}
              edit={true}
            />
          </Modal>
          <AiOutlineDelete size={18} className="text-red-500" />
        </div>
      </td>
    </tr>
  );
};

export default MemberList;
