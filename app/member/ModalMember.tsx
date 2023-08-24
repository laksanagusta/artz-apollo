"use client";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addMemberSchema } from "../../validation/member/addMemberSchema";
import { CreateMember, UpdateMember } from "@/service/member";
import { toast } from "react-hot-toast";
import { useApolloClient } from "@apollo/client";

interface MemberProps {
  firstNameProps: string;
  lastNameProps: string;
  ageProps: number;
  addressProps: string;
  phoneNumberProps: string;
  id: number;
  setModalIsOpen: (open: boolean) => boolean | void;
  setIsRefresh: (open: string) => string | void;
  edit: boolean;
}

const ModalMember: React.FC<MemberProps> = ({
  firstNameProps,
  lastNameProps,
  ageProps,
  addressProps,
  phoneNumberProps,
  id,
  setModalIsOpen,
  setIsRefresh,
  edit,
}) => {
  const client = useApolloClient();

  function afterSubmit({ setSubmitting }: any) {
    setModalIsOpen(false);
    setSubmitting(false);
    toast.success("Success save medicine");
  }

  return (
    <Formik
      initialValues={{
        firstName: edit ? firstNameProps : "",
        lastName: edit ? lastNameProps : "",
        age: edit ? ageProps : "",
        address: edit ? addressProps : "",
        phone_number: edit ? phoneNumberProps : "",
      }}
      validationSchema={addMemberSchema}
      onSubmit={async (values: any, { setSubmitting }) => {
        if (!edit) {
          await CreateMember(values, client);
          afterSubmit({ setSubmitting });
          setIsRefresh(Date.now().toString());
        } else {
          await UpdateMember(values, client, id);
          afterSubmit({ setSubmitting });
          setIsRefresh(Date.now().toString());
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form method="dialog" className="modal-box">
          <a
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setModalIsOpen(false)}
          >
            ✕
          </a>
          <h3 className="font-bold text-lg mb-6">
            {edit ? "Edit" : "Add new"} Member
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="firstName" />
              </div>
            </div>
            <div className="space-y-2">
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="lastName" />
              </div>
            </div>
            <div className="space-y-2">
              <Field
                type="number"
                name="age"
                placeholder="age"
                className="input input-bordered w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="age" />
              </div>
            </div>
            <div className="space-y-2">
              <Field
                type="text"
                name="address"
                placeholder="Address"
                className="input input-bordered w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="address" />
              </div>
            </div>
            <div className="space-y-2">
              <Field
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
              <div className="label-text-alt text-red-500">
                <ErrorMessage name="phone_number" />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ModalMember;
