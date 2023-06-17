"use client";

import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addMemberSchema } from "../validation/member/addMemberSchema";
import MemberService from "@/service/member";
import { toast } from "react-hot-toast";

interface MemberProps {
  firstNameProps: string;
  lastNameProps: string;
  ageProps: number;
  addressProps: string;
  phoneNumberProps: string;
  setModalIsOpen: (open: boolean) => boolean | void;
  edit: boolean;
}

const ModalMember: React.FC<MemberProps> = ({
  firstNameProps,
  lastNameProps,
  ageProps,
  addressProps,
  phoneNumberProps,
  setModalIsOpen,
  edit,
}) => {
  const initialValues = {
    firstName: edit ? firstNameProps : "",
    lastName: edit ? lastNameProps : "",
    age: edit ? ageProps : "",
    address: edit ? addressProps : "",
    phone_number: edit ? phoneNumberProps : "",
  };

  const _memberServie = new MemberService();

  async function onSubmit(value: any, { setSubmitting }: any): Promise<void> {
    console.log(value);
    await _memberServie.createMember(value);
    setSubmitting(false);
    toast.success("Success add member");
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addMemberSchema}
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
            {edit ? "Edit" : "Add new"} Member
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered w-full w-full"
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
                className="input input-bordered w-full w-full"
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
                className="input input-bordered w-full w-full"
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
                className="input input-bordered w-full w-full"
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
                className="input input-bordered w-full w-full"
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
