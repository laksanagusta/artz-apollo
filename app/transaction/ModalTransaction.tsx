"use client";

import { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { addTransactionSchema } from "../validation/transaction/addTransactionSchema";
import { GetMedicine } from "@/app/service/medicine";
import useDebounce from "@/app/utils/useDebounce";
import { GetMember } from "@/app/service/member";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { CreateTransaction } from "../service/transaction";

interface TransactionProps {
  nameProps: string;
  setModalIsOpen: (open: boolean) => boolean | void;
  edit: boolean;
}

const ModalTransaction: React.FC<TransactionProps> = ({
  nameProps,
  setModalIsOpen,
  edit,
}) => {
  const [medicineListOpen, setMedicineListOpen] = useState<boolean>(false);
  const [filterMedicineKeyword, setFilterMedicineKeyword] =
    useState<string>("");
  const [dataMedicineSelected, setDataMedicineSelected] = useState<any[]>([]);
  const [dataMedicine, setDataMedicine] = useState<any[]>([]);
  const debouncedFilterMedicine = useDebounce(filterMedicineKeyword, 500);

  const [memberListOpen, setMemberListOpen] = useState<boolean>(false);
  const [filterMemberKeyword, setFilterMemberKeyword] = useState<string>("");
  const [filterMemberKeywordValue, setFilterMemberKeywordValue] =
    useState<string>("");
  const [dataMemberSelected, setDataMemberSelected] = useState<any>({});
  const [dataMember, setDataMember] = useState<any[]>([]);
  const debouncedFilterMember = useDebounce(filterMemberKeyword, 400);

  const router = useRouter();

  useEffect(() => {
    const SetFilterMedicine = async (value: string): Promise<void> => {
      setFilterMedicineKeyword(debouncedFilterMedicine);
      const { data } = await GetMedicine(
        debouncedFilterMedicine,
        0,
        50,
        useApolloClient()
      );
      setDataMedicine(data.searchMedicine.medicines);
      if (debouncedFilterMedicine) setMedicineListOpen(true);
      if (!debouncedFilterMedicine) setMedicineListOpen(false);
    };

    const SetFilterMember = async (value: string): Promise<void> => {
      const client = useApolloClient();
      if (filterMemberKeyword !== filterMemberKeywordValue) {
        const data = await GetMember(debouncedFilterMember, client);
        setDataMember(data.members);
        if (debouncedFilterMember) setMemberListOpen(true);
        if (!debouncedFilterMember) setMemberListOpen(false);
      }
    };

    if (debouncedFilterMedicine) SetFilterMedicine(debouncedFilterMedicine);
    if (debouncedFilterMember) SetFilterMember(debouncedFilterMember);
  }, [debouncedFilterMedicine, debouncedFilterMember]);

  const ADD_MEMBER = gql`
    mutation createTransaction($name: String!, $phone_number: String!) {
      createTransaction(input: { name: $name, phone_number: $phone_number }) {
        id
        name
        phone_number
      }
    }
  `;

  const addTransaction = async () => {
    setModalIsOpen(false);

    router.refresh();
  };

  const selectMember = (member: any): void => {
    setDataMemberSelected(member);
    setMemberListOpen(false);
    setFilterMemberKeyword(member.firstName + " " + member.lastName);
    setFilterMemberKeywordValue(member.firstName + " " + member.lastName);
  };

  const selectMedicine = (medicine: any): void => {
    const filteredMedicine = dataMedicineSelected.filter(
      (item) => item.id == medicine.id
    );

    console.log(filteredMedicine);

    if (!filteredMedicine.length) {
      dataMedicineSelected.push(medicine);
    }

    setMedicineListOpen(false);
    setFilterMedicineKeyword("");
  };

  const deleteMedicineItem = (value: number): void => {
    const filteredMedicine = dataMedicineSelected.filter(
      (item) => item.id !== value
    );
    setDataMedicineSelected(filteredMedicine);
  };

  async function OnSubmit(value: any, { setSubmitting }: any): Promise<void> {
    value.medicines = dataMedicineSelected.map((value) => {
      return { id: value.id };
    });
    value.member = dataMemberSelected.id;
    await CreateTransaction(value, useApolloClient());
    setSubmitting(false);
    setModalIsOpen(false);
    toast.success("Success add transaction");
  }

  return (
    <Formik
      initialValues={{
        diagnosis: "",
        complaint: "",
        actions: "",
        symptom: "",
      }}
      validationSchema={addTransactionSchema}
      onSubmit={OnSubmit}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form className="modal-box w-11/12 max-w-5xl">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setModalIsOpen(false)}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-6">Add new transaction</h3>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Filter Member"
                className="input input-bordered w-full"
                value={filterMemberKeyword}
                onChange={(e) => setFilterMemberKeyword(e.target.value)}
              />
              {memberListOpen && (
                <ul className="border rounded-b cursor-pointer">
                  {dataMember &&
                    dataMember.map((item) => {
                      return (
                        <li
                          className="hover:bg-indigo-500 border px-[10px] py-[4px] hover:text-white hover:px-2 hover:rounded"
                          key={item.id}
                          onClick={() => selectMember(item)}
                        >
                          {item.firstName + " " + item.lastName}
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
            <div className="form-control w-full space-y-2">
              <Field
                type="text"
                placeholder="Complaint"
                className="input input-bordered w-full w-full"
                id="complaint"
                name="complaint"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="complaint" />
              </div>
            </div>
            <div className="form-control w-full space-y-2">
              <Field
                type="text"
                placeholder="Diagnosis"
                className="input input-bordered w-full w-full"
                id="diagnosis"
                name="diagnosis"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="diagnosis" />
              </div>
            </div>
            <div className="form-control w-full space-y-2">
              <textarea
                name="symptom"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.symptom}
                placeholder="Symptom"
                className="textarea textarea-bordered textarea-md w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="symptom" />
              </div>
            </div>
            <div className="form-control w-full space-y-2">
              <textarea
                name="actions"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.actions}
                placeholder="Actions"
                className="textarea textarea-bordered textarea-md w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="actions" />
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Filter Medicine"
                className="input input-bordered w-full"
                value={filterMedicineKeyword}
                onChange={(e) => setFilterMedicineKeyword(e.target.value)}
              />
              {medicineListOpen && (
                <ul className="border rounded-b cursor-pointer">
                  {dataMedicine &&
                    dataMedicine.map((item) => {
                      return (
                        <li
                          className="hover:bg-indigo-500 border px-[10px] py-[4px] hover:text-white hover:px-2 hover:rounded"
                          key={item.id}
                          onClick={() => selectMedicine(item)}
                        >
                          {item.name}
                        </li>
                      );
                    })}
                </ul>
              )}
              <div className="mt-2 grid gap-2 grid-cols-3">
                {dataMedicineSelected &&
                  dataMedicineSelected.map((item) => {
                    return (
                      <div
                        className="px-2 flex border justify-between rounded-full items-center"
                        key={item.name}
                      >
                        {item.name}
                        <span
                          className="ml-2 cursor-pointer "
                          onClick={() => deleteMedicineItem(item.id)}
                        >
                          <IoMdClose />
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ModalTransaction;
