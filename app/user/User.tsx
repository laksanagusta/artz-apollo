"use client";

import React, { useEffect, useState } from "react";
import { AiFillAccountBook, AiFillAlert, AiFillFilter } from "react-icons/ai";
import UserList from "./UserList";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { SEARCH_USER } from "../graphql/query/user";
import { useApolloClient } from "@apollo/client";
import AddUser from "./AddUser";
import ReactPaginate from "react-paginate";

const User = () => {
  const PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(0);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const client = useApolloClient();

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const getUsers = async () => {
    const offset = currentPage * PER_PAGE;
    const { data } = await client.query({
      query: SEARCH_USER,
      context: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      variables: {
        name: name,
        limit: PER_PAGE,
        page: offset,
      },
    });
    setUsersData(data.searchUser.users);

    setPageCount(Math.ceil(data.searchUser.count / PER_PAGE));
  };

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  return (
    <main className="flex-1 pb-8">
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
            User
          </h1>
          <p className="text-sm font-medium text-gray-500">User data</p>
        </div>
        <AddUser />
      </div>

      <ul className="flex gap-x-24 items-center px-4 border-y border-gray-200">
        <li>
          <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
            <span> Active </span>
            <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
          </button>
        </li>
        <li>
          <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
            <span> Inactive </span>
            <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
          </button>
        </li>
      </ul>

      <table className="w-full border-b border-gray-200">
        <thead>
          <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
            <td className="pl-10">
              <div className="flex items-center gap-x-4">
                <span>Name</span>
              </div>
            </td>
            <td className="py-4 px-4 text-center">Email</td>
            <td className="py-4 px-4 text-center">Phone Number</td>
            <td className="py-4 px-4 text-center">Actions</td>
          </tr>
        </thead>
        <tbody>
          {usersData?.map((user) => {
            return <UserList user={user} />;
          })}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        previousLabel={
          <BsArrowLeftCircle className="w-6 h-6 to-gray-800 stroke-current hover:text-indigo-600" />
        }
        nextLabel={
          <BsArrowRightCircle className="w-6 h-6 to-gray-800 stroke-current hover:text-indigo-600" />
        }
        pageRangeDisplayed={4}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        previousLinkClassName={
          "mr-4 w-8 h-8 flex items-center justify-center rounded-md mr-4"
        }
        nextLinkClassName={
          "w-8 h-8 flex items-center justify-center rounded-md"
        }
        disabledClassName={""}
        containerClassName="flex items-center justify-center mt-10 mb-4"
        pageClassName="block hover:bg-blue-500 w-8 h-8 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-blue-500 text-white"
      />
    </main>
  );
};

export default User;
