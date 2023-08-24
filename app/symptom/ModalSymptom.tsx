"use client";

import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { useApolloClient } from "@apollo/client";
import { addSymptomSchema } from "@/validation/symptom/addSymptomSchema";
import { CreateSymptom, UpdateSymptom } from "@/service/symptom";

interface SymptomProps {
  symptomProps: any;
  setModalIsOpen: (open: boolean) => boolean | void;
  setIsRefresh: (open: string) => string | void;
  edit: boolean;
}

const ModalSymptom: React.FC<SymptomProps> = ({
  symptomProps,
  setModalIsOpen,
  setIsRefresh,
  edit,
}) => {
  const initialValues = {
    name: edit ? symptomProps.name : "",
    description: edit ? symptomProps.description : "",
  };

  const client = useApolloClient();

  async function OnSubmit(value: any, { setSubmitting }: any): Promise<void> {
    if (!edit) {
      await CreateSymptom(value, client);
      afterSubmit({ setSubmitting });
      setIsRefresh(Date.now().toString());
    } else {
      await UpdateSymptom(value, client, symptomProps.id);

      afterSubmit({ setSubmitting });

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

export default ModalSymptom;
