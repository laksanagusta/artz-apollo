import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillPersonVcardFill, BsArchive } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";

const Sidebar: React.FC<any> = () => {
  return (
    <aside className="py-8 px-8 w-64 border-r border-gray-200">
      <p className="font-semibold text-2xl">ORION @.@</p>
      <ul className="flex flex-col pt-8">
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-500 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <BsFillPersonVcardFill />
            <Link href="/member">Member</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-500 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <GiMedicines />
            <Link href="/medicine">Medicine</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-500 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <BsArchive />
            <Link href="/transaction">Transaksi</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-500 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <AiOutlineUser />
            <Link href="/user">User</Link>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
