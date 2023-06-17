"use client";

import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditUser from "./EditUser";
import Modal from "./Modal";

interface UserListProps {
  user: any;
}

const UserList: React.FC<UserListProps> = ({ user }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  return (
    <tr key={user.key} className="hover:bg-gray-100 transition-colors group">
      <td className="flex gap-x-4 items-center py-2 pl-10 border">
        {user.name}
      </td>
      <td className="text-sm px-4 text-center border">{user.email}</td>
      <td className="text-sm px-4 text-center border">{user.phone_number} </td>
      <td className="flex gap-2 border">
        <AiOutlineEdit
          size={18}
          className="text-blue-500"
          onClick={() => setOpenModalEdit(true)}
        />
        <Modal modalIsOpen={openModalEdit}>
          <EditUser
            nameProps={user.name}
            phoneNumberProps={user.phone_number}
            idProps={user.id}
            setOpenModalEdit={setOpenModalEdit}
          />
        </Modal>
        <AiOutlineDelete size={18} className="text-red-500" />
      </td>
    </tr>
  );
};

export default UserList;
