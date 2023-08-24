"use client";

import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { convertDate } from "../../utils/convertDate";

interface TransactionListProps {
  transaction: any;
}

const TransactionList: React.FC<TransactionListProps> = ({ transaction }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  return (
    <tr
      key={transaction.key}
      className="hover:bg-gray-100 transition-colors group border-t"
    >
      <td className="py-2 pl-10">{transaction.member.firstName}</td>
      <td className="text-sm px-4">{transaction.complaint}</td>
      <td className="text-sm px-4">{transaction.diagnosis}</td>
      <td className="text-sm px-4">{convertDate(transaction.createdAt)}</td>
      <td className="text-sm px-4">{convertDate(transaction.updatedAt)}</td>
      <td>
        <AiOutlineDelete size={18} className="text-red-500" />
      </td>
    </tr>
  );
};

export default TransactionList;
