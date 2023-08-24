"use client";

import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addCaseSchema } from "../../validation/case/addCaseSchema";
import { CreateCase, UpdateCase } from "../../service/case";
import { toast } from "react-hot-toast";
import { useApolloClient } from "@apollo/client";

interface CaseProps {
  caseProps: any;
  setModalIsOpen: (open: boolean) => boolean | void;
  setIsRefresh: (open: string) => string | void;
  edit: boolean;
}

const ModalCase: React.FC<CaseProps> = ({
  caseProps,
  setModalIsOpen,
  setIsRefresh,
  edit,
}) => {
  const initialValues = {
    name: edit ? caseProps.name : "",
  };

  const client = useApolloClient();

  async function OnSubmit(value: any, { setSubmitting }: any): Promise<void> {
    try {
      if (!edit) {
        await CreateCase(value, client);
        afterSubmit({ setSubmitting });
        setIsRefresh(Date.now().toString());
      } else {
        await UpdateCase(value, client, caseProps.id);
        afterSubmit({ setSubmitting });
        console.log(Date.now().toString());
        setIsRefresh(Date.now().toString());
      }
    } catch (error) {}
  }

  function afterSubmit({ setSubmitting }: any) {
    setModalIsOpen(false);
    setSubmitting(false);
    toast.success("Success save case");
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
                className="input input-bordered w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="space-y-2">
              <Field
                type="text"
                name="description"
                placeholder="Description"
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

export default ModalCase;
