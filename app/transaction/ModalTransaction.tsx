"use client";

import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { addTransactionSchema } from "../../validation/transaction/addTransactionSchema";
import { GetMedicine } from "../../service/medicine";
import useDebounce from "../../utils/useDebounce";
import { GetMember } from "../../service/member";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { CreateTransaction } from "../../service/transaction";
import { GetCase } from "../../service/case";
import { GetSymptom } from "../../service/symptom";

interface TransactionProps {
  setModalIsOpen: (open: boolean) => boolean | void;
  edit: boolean;
}

const ModalTransaction: React.FC<TransactionProps> = ({
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
  const [dataMemberSelected, setDataMemberSelected] = useState<any>({});
  const [dataMember, setDataMember] = useState<any[]>([]);
  const debouncedFilterMember = useDebounce(filterMemberKeyword, 400);

  const [symptomListOpen, setSymptomListOpen] = useState<boolean>(false);
  const [filterSymptomKeyword, setFilterSymptomKeyword] = useState<string>("");
  const [dataSymptomSelected, setDataSymptomSelected] = useState<any[]>([]);
  const [dataSymptom, setDataSymptom] = useState<any[]>([]);
  const debouncedFilterSymptom = useDebounce(filterSymptomKeyword, 500);

  const [caseListOpen, setCaseListOpen] = useState<boolean>(false);
  const [filterCaseKeyword, setFilterCaseKeyword] = useState<string>("");
  const [dataCaseSelected, setDataCaseSelected] = useState<any[]>([]);
  const [dataCase, setDataCase] = useState<any[]>([]);
  const debouncedFilterCase = useDebounce(filterCaseKeyword, 500);

  const [currentSearchEntity, setCurrentSearchEntity] = useState<string>("");

  const client = useApolloClient();

  useEffect(() => {
    const SetFilterMedicine = async (value: string): Promise<void> => {
      if (currentSearchEntity == "medicine") {
        setFilterMedicineKeyword(debouncedFilterMedicine);

        const { data } = await GetMedicine(value, 0, 50, client);
        if (data.searchMedicine) {
          setDataMedicine(data.searchMedicine.medicines);

          if (debouncedFilterMedicine) setMedicineListOpen(true);
          if (!debouncedFilterMedicine) setMedicineListOpen(false);
        }
      }
    };

    if (debouncedFilterMedicine) SetFilterMedicine(debouncedFilterMedicine);

    const SetFilterCase = async (value: string): Promise<void> => {
      if (currentSearchEntity == "case") {
        setFilterCaseKeyword(debouncedFilterCase);

        const { data } = await GetCase(value, 0, 50, client);
        if (data.searchCase) {
          setDataCase(data.searchCase.cases);

          if (debouncedFilterCase) setCaseListOpen(true);
          if (!debouncedFilterCase) setCaseListOpen(false);
        }
      }
    };

    if (debouncedFilterCase) SetFilterCase(debouncedFilterCase);

    const SetFilterSymptom = async (value: string): Promise<void> => {
      if (currentSearchEntity == "symptom") {
        setFilterSymptomKeyword(debouncedFilterSymptom);

        const { data } = await GetSymptom(value, 0, 50, client);
        if (data.searchSymptom.medicines) {
          setDataSymptom(data.searchSymptom.medicines);

          if (debouncedFilterSymptom) setSymptomListOpen(true);
          if (!debouncedFilterSymptom) setSymptomListOpen(false);
        }
      }
    };

    if (debouncedFilterSymptom) SetFilterSymptom(debouncedFilterSymptom);

    const SetFilterMember = async (value: string): Promise<void> => {
      const data = await GetMember(value, client);

      if (data.members) {
        setDataMember(data.members);

        if (debouncedFilterMember) setMemberListOpen(true);
        if (!debouncedFilterMember) setMemberListOpen(false);
      }
    };

    if (debouncedFilterMember) SetFilterMember(debouncedFilterMember);
  }, [debouncedFilterMedicine, debouncedFilterMember, debouncedFilterCase]);

  const selectMember = (member: any): void => {
    setDataMemberSelected(member);
    setMemberListOpen(false);
    setFilterMemberKeyword(member.firstName + " " + member.lastName);
  };

  const selectMedicine = (medicine: any): void => {
    const filteredMedicine = dataMedicineSelected.filter(
      (item) => item.id == medicine.id
    );

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

  const selectSymptom = (symptom: any): void => {
    const filteredSymptom = dataSymptomSelected.filter(
      (item) => item.id == symptom.id
    );

    if (!filteredSymptom.length) {
      dataSymptomSelected.push(symptom);
    }

    setSymptomListOpen(false);
    setFilterSymptomKeyword("");
  };

  const deleteSymptomItem = (value: number): void => {
    const filteredSymptom = dataSymptomSelected.filter(
      (item) => item.id !== value
    );

    setDataSymptomSelected(filteredSymptom);
  };

  const selectCase = (caseData: any): void => {
    const filteredCase = dataCaseSelected.filter(
      (item) => item.id == caseData.id
    );

    if (!filteredCase.length) {
      dataCaseSelected.push(caseData);
    }

    setCaseListOpen(false);
    setFilterCaseKeyword("");
  };

  const deleteCaseItem = (value: number): void => {
    const filteredCase = dataCaseSelected.filter((item) => item.id !== value);

    setDataCaseSelected(filteredCase);
  };

  async function OnSubmit(value: any, { setSubmitting }: any): Promise<void> {
    try {
      value.medicines = dataMedicineSelected.map((value) => {
        return { id: value.id };
      });
      value.member = dataMemberSelected.id;

      await CreateTransaction(value, client);

      setSubmitting(false);
      setModalIsOpen(false);

      toast.success("Success add transaction");
    } catch (e) {
      toast.error(e + "");
    }
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
      {({ values, handleChange, handleBlur, isSubmitting }) => (
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
                <ul className="border rounded-md mt-1 cursor-pointer">
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
                className="input input-bordered w-full"
                id="complaint"
                name="complaint"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="complaint" />
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Case"
                className="input input-bordered w-full"
                value={filterCaseKeyword}
                onChange={(e) => {
                  setFilterCaseKeyword(e.target.value);
                  setCurrentSearchEntity("case");
                }}
              />
              {caseListOpen && (
                <ul className="border rounded-b cursor-pointer">
                  {dataCase.length > 0 ? (
                    dataCase.map((item) => {
                      return (
                        <li
                          className="hover:bg-indigo-500 border px-[10px] py-[4px] hover:text-white hover:px-2 hover:rounded"
                          key={item.id}
                          onClick={() => selectCase(item)}
                        >
                          {item.name}
                        </li>
                      );
                    })
                  ) : (
                    <li className="border px-[10px] py-[4px] hover:text-white hover:px-2 hover:rounded">
                      Not Found
                    </li>
                  )}
                </ul>
              )}
              <div className="mt-2 grid gap-2 grid-cols-6">
                {dataCaseSelected &&
                  dataCaseSelected.map((item) => {
                    return (
                      <div
                        className="px-2 flex border justify-between rounded-full items-center"
                        key={item.name}
                      >
                        {item.name}
                        <span
                          className="ml-2 cursor-pointer "
                          onClick={() => deleteCaseItem(item.id)}
                        >
                          <IoMdClose />
                        </span>
                      </div>
                    );
                  })}
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
            <div>
              <input
                type="text"
                placeholder="Symptom"
                className="input input-bordered w-full"
                value={filterSymptomKeyword}
                onChange={(e) => {
                  setFilterSymptomKeyword(e.target.value);
                  setCurrentSearchEntity("symptom");
                }}
              />
              {symptomListOpen && (
                <ul className="border rounded-b cursor-pointer">
                  {dataSymptom.length > 0 ? (
                    dataSymptom.map((item) => {
                      return (
                        <li
                          className="hover:bg-indigo-500 border px-[10px] py-[4px] hover:text-white hover:px-2 hover:rounded"
                          key={item.id}
                          onClick={() => selectSymptom(item)}
                        >
                          {item.name}
                        </li>
                      );
                    })
                  ) : (
                    <li className="border px-[10px] py-[4px] hover:text-white hover:px-2 hover:rounded">
                      Not Found
                    </li>
                  )}
                </ul>
              )}
              <div className="mt-2 grid gap-2 grid-cols-3">
                {dataSymptomSelected &&
                  dataSymptomSelected.map((item) => {
                    return (
                      <div
                        className="px-2 flex border justify-between rounded-full items-center"
                        key={item.name}
                      >
                        {item.name}
                        <span
                          className="ml-2 cursor-pointer "
                          onClick={() => deleteSymptomItem(item.id)}
                        >
                          <IoMdClose />
                        </span>
                      </div>
                    );
                  })}
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
                placeholder="Medicine"
                className="input input-bordered w-full"
                value={filterMedicineKeyword}
                onChange={(e) => {
                  setFilterMedicineKeyword(e.target.value);
                  setCurrentSearchEntity("medicine");
                }}
              />
              {medicineListOpen && (
                <ul className="border rounded-b cursor-pointer">
                  {dataMedicine.length > 0 ? (
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
                    })
                  ) : (
                    <li className="border px-[10px] py-[4px] hover:text-white hover:px-2 hover:rounded">
                      Not Found
                    </li>
                  )}
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
