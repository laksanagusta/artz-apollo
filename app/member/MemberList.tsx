import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import ModalMember from "./ModalMember";
import Modal from "./Modal";

interface MemberListProps {
  member: any;
  setIsRefresh: (open: string) => string | void;
}

const MemberList: React.FC<MemberListProps> = ({ member, setIsRefresh }) => {
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
      <td className="text-sm">{member.age}</td>
      <td className="text-sm">{member.address}</td>
      <td className="text-sm">{member.phone_number}</td>
      <td className="text-sm">{member.createdAt}</td>
      <td className="text-sm">{member.updatedAt}</td>
      <td className="pr-10">
        <div className="flex gap-2 justify-end">
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
              id={member.id}
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

export default MemberList;
