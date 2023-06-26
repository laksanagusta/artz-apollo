"use client";

import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addSymptomSchema } from "@/app/validation/symptom/addSymptomSchema";
import { CreateSymptom } from "@/app/service/symptom";
import { toast } from "react-hot-toast";
import { useApolloClient } from "@apollo/client";

interface SymptomProps {
  nameProps: string;
  setModalIsOpen: (open: boolean) => boolean | void;
  edit: boolean;
}

const ModalSymptom: React.FC<SymptomProps> = ({
  nameProps,
  setModalIsOpen,
  edit,
}) => {
  const initialValues = {
    name: edit ? nameProps : "",
  };

  async function OnSubmit(value: any, { setSubmitting }: any): Promise<void> {
    try {
      const client = useApolloClient();
      await CreateSymptom(value, client);
      setModalIsOpen(false);
      setSubmitting(false);
      toast.success("Success add symptom");
    } catch (error) {}
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addSymptomSchema}
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
            {edit ? "Edit" : "Add new"} Symptom
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

export default ModalSymptom;
