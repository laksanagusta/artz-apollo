"use client";

import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addCaseSchema } from "../validation/case/addCaseSchema";
import { CreateCase } from "@/app/service/case";
import { toast } from "react-hot-toast";
import { useApolloClient } from "@apollo/client";

interface CaseProps {
  nameProps: string;
  setModalIsOpen: (open: boolean) => boolean | void;
  edit: boolean;
}

const ModalCase: React.FC<CaseProps> = ({
  nameProps,
  setModalIsOpen,
  edit,
}) => {
  const [name, setName] = useState<string>(nameProps);

  const initialValues = {
    name: edit ? name : "",
  };

  async function OnSubmit(value: any, { setSubmitting }: any): Promise<void> {
    try {
      const client = useApolloClient();
      await CreateCase(value, client);
      setModalIsOpen(false);
      setSubmitting(false);
      toast.success("Success add case");
    } catch (error) {}
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addCaseSchema}
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
            {edit ? "Edit" : "Add new"} Case
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

export default ModalCase;
