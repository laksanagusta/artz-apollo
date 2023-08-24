"use client";

import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addMedicineSchema } from "../../validation/medicine/addMedicineSchema";
import { CreateMedicine, UpdateMedicine } from "../../service/medicine";
import { useApolloClient } from "@apollo/client";
import { toast } from "react-hot-toast";

interface MedicineProps {
  medicineProps: any;
  setModalIsOpen: (open: boolean) => boolean | void;
  setIsRefresh: (open: string) => string | void;
  edit: boolean;
}

const ModalMedicine: React.FC<MedicineProps> = ({
  medicineProps,
  setModalIsOpen,
  setIsRefresh,
  edit,
}) => {
  const initialValues = {
    name: edit ? medicineProps.name : "",
    description: edit ? medicineProps.description : "",
  };

  const client = useApolloClient();

  async function OnSubmit(value: any, { setSubmitting }: any): Promise<void> {
    if (!edit) {
      await CreateMedicine(value, client);
      afterSubmit({ setSubmitting });
      setIsRefresh(Date.now().toString());
    } else {
      await UpdateMedicine(value, client, medicineProps.id);
      afterSubmit({ setSubmitting });
      console.log(Date.now().toString());
      setIsRefresh(Date.now().toString());
    }
  }

  function afterSubmit({ setSubmitting }: any) {
    setModalIsOpen(false);
    setSubmitting(false);
    toast.success("Success save medicine");
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addMedicineSchema}
      onSubmit={OnSubmit}
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
                className="input input-bordered w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="name" />
              </div>
              <Field
                type="text"
                name="description"
                placeholder="description"
                className="input input-bordered w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="description" />
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
