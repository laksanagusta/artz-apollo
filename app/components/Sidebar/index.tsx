import Link from "next/link";
import React from "react";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";

import { HiChevronDown } from "react-icons/hi";
import {
  BsFillPersonVcardFill,
  BsCalendarEvent,
  BsClipboardPulse,
} from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";

const Sidebar: React.FC<any> = () => {
  return (
    <aside className="py-8 px-8 w-64 border-r border-gray-200">
      <p className="font-semibold text-2xl">ORION @.@</p>
      <ul className="flex flex-col pt-7 mb-auto">
        <div className="border-b mt-4 py-[6px] font-medium text-gray-400 mb-2 text-xs">
          MASTER
        </div>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-600 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <AiOutlineDashboard />
            <Link href="/member">Dashboard</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-600 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <BsFillPersonVcardFill />
            <Link href="/member">Member</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-600 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <GiMedicines />
            <Link href="/medicine">Medicine</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-600 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <GiMedicines />
            <Link href="/case">Case</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-600 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <GiMedicines />
            <Link href="/medicine">Symptom</Link>
          </div>
        </li>
        <div className="border-b mt-6 py-[6px] font-medium text-gray-400 mb-2 text-xs">
          TRANSACTION
        </div>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-600 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <BsCalendarEvent />
            <Link href="/medicine">Appointment</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-600 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <BsClipboardPulse />
            <Link href="/transaction">Transaction</Link>
          </div>
        </li>
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-600 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <AiOutlineUser />
            <Link href="/user">User</Link>
          </div>
        </li>
      </ul>

      <ul className="flex flex-col fixed bottom-36 mb-auto">
        <li>
          <div className="flex gap-x-4 font-medium items-center py-2 text-gray-600 hover:text-indigo-600 group">
            <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
            <AiOutlineDashboard />
            <Link href="/member">Logout</Link>
          </div>
        </li>
      </ul>

      <div className="border fixed bottom-8 p-4 rounded-lg flex items-center space-x-10">
        <div>
          <p>Dika Laksana</p>
          <p>@dika</p>
        </div>
        <div>
          <HiChevronDown />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
