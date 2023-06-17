"use client";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import MemberList from "./MemberList";
import ModalMember from "./ModalMember";
import { AiOutlinePlus } from "react-icons/ai";
import { LuImport, LuRefreshCw } from "react-icons/lu";
import Modal from "./Modal";
import { Field, Form, Formik } from "formik";
import MemberService from "@/service/member";
import FlatList from "../components/FlatList";
import DashboardCardCount from "../components/DashboardCardCount";
import { Toaster } from "react-hot-toast";

const Member = () => {
  const [membersData, setMembersData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [totalResult, setTotalResult] = useState<number>(0);

  const [searchParams, setSearchParams] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);

  const _memberService = new MemberService();

  const initialValues = {
    searchParams: "",
    limit: 10,
  };

  useEffect(() => {
    onLoadMember();
  }, []);

  const getMember = async (
    searchParams: string,
    limit: number,
    page: number
  ) => {
    const { data } = await _memberService.searchMember(
      searchParams,
      page,
      limit
    );

    setMembersData(data.searchMember.members);
    setTotalResult(data.searchMember.count);

    setPageCount(Math.ceil(data.searchMember.count / limit));
  };

  const onLoadMember = async (): Promise<void> => {
    await getMember(initialValues.searchParams, initialValues.limit, 0);
  };

  const handlePageClick = async ({ selected }: any) => {
    await getMember(searchParams, limit, selected);
  };

  async function onSubmit(value: any, { setSubmitting }: any): Promise<void> {
    await getMember(value.searchParams, parseInt(value.limit), 0);
    setSearchParams(value.searchParams);
    setLimit(value.limit);
    setSubmitting(false);
  }

  return (
    <main className="flex-1 pb-8 px-8">
      <div className="flex items-center justify-between py-7">
        <div>
          <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
            Members
          </h1>
        </div>
        <Modal modalIsOpen={modalIsOpen}>
          <ModalMember
            firstNameProps=""
            lastNameProps=""
            ageProps={0}
            addressProps=""
            phoneNumberProps=""
            setModalIsOpen={setModalIsOpen}
            edit={false}
          />
        </Modal>
        <div className="flex space-x-4">
          <button
            className="btn btn-outline btn-primary"
            onClick={() => setModalIsOpen(true)}
          >
            <LuImport className="font-semibold" size={20} />
            Import
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setModalIsOpen(true)}
          >
            <AiOutlinePlus className="font-semibold" size={20} />
            Add member
          </button>
        </div>
      </div>

      <ul className="flex gap-x-6 text-sm items-center border-gray-200 mb-6 border-b">
        <FlatList title="Active" />
        <FlatList title="Inactive" />
      </ul>

      <div className="flex space-x-4 mb-6">
        <DashboardCardCount title="Total Members" count={20000} />
        <DashboardCardCount title="Total Members Found" count={totalResult} />
        <DashboardCardCount title="Total Members Found" count={totalResult} />
      </div>

      <div className="flex w-full mb-6">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="flex w-full justify-between">
              <Field
                name="limit"
                component="select"
                className="input input-bordered"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={100}>100</option>
              </Field>
              <div className="flex space-x-4">
                <Field
                  type="text"
                  name="searchParams"
                  placeholder="Search"
                  className="input input-bordered text-sm w-80"
                />
                <button type="submit" disabled={isSubmitting}>
                  <LuRefreshCw size={20} />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg border">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-100">
            <tr className="text-sm font-medium text-gray-700 border-gray-200">
              <td className="py-2 pl-10 text-sm">Name</td>
              <td className="py-2 pl-10 text-sm">Age</td>
              <td className="py-2 pl-10 text-sm">Address</td>
              <td className="py-2 pl-10 text-sm">Phone Number</td>
              <td className="text-sm px-4 text-left">Created at</td>
              <td className="text-sm px-4 text-left">Updated at</td>
              <td className="px-4 text-left pr-10"></td>
            </tr>
          </thead>
          <tbody>
            {membersData?.map((member) => {
              return <MemberList key={member.id} member={member} />;
            })}
            <tr>
              <td colSpan={6} className="border-t">
                <ReactPaginate
                  breakLabel={<span className="mr-4">...</span>}
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageRangeDisplayed={4}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  previousLinkClassName={
                    "h-8 flex items-center justify-center border p-2 rounded-md mr-4"
                  }
                  nextLinkClassName={
                    "h-8 flex items-center justify-center border p-2 rounded-md ml-4"
                  }
                  disabledClassName={""}
                  containerClassName="flex items-center justify-center py-2 space-x-2 pl-[39px] pr-10 text-sm"
                  pageClassName="block hover:bg-blue-500 hover:text-white w-8 h-8 flex items-center justify-center rounded"
                  activeClassName="text-blue-500 font-semibold"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Toaster />
    </main>
  );
};

export default Member;
