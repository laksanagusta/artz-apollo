"use client";

import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addMedicineSchema } from "../validation/medicine/addMedicineSchema";
import MedicineService from "@/service/medicine";

interface MedicineProps {
  nameProps: string;
  setModalIsOpen: (open: boolean) => boolean | void;
  edit: boolean;
}

const ModalMedicine: React.FC<MedicineProps> = ({
  nameProps,
  setModalIsOpen,
  edit,
}) => {
  const [name, setName] = useState<string>(nameProps);

  const initialValues = {
    name: edit ? name : "",
  };

  const _medicineServie = new MedicineService();

  async function onSubmit(value: any, { setSubmitting }: any): Promise<void> {
    await _medicineServie.createMedicine(value);
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addMedicineSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form method="dialog" className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setModalIsOpen(false)}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-6">
            {edit ? "Edit" : "Add new"} Medicine
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
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

export default ModalMedicine;
