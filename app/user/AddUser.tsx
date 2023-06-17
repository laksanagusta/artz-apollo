"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

const AddUser = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const client = useApolloClient();
  const router = useRouter();

  const ADD_MEMBER = gql`
    mutation createUser($name: String!, $phone_number: String!) {
      createUser(input: { name: $name, phone_number: $phone_number }) {
        id
        name
        phone_number
      }
    }
  `;

  const addUser = async () => {
    const { data } = await client.mutate({
      mutation: ADD_MEMBER,
      variables: {
        name: name,
        phone_number: phoneNumber,
      },
    });

    setModalIsOpen(false);

    router.refresh();
  };

  return (
    <div>
      <button
        className="btn btn-primary w-full"
        onClick={() => setModalIsOpen(true)}
      >
        Add new user <AiOutlinePlus className="w-10" />
      </button>
      <Modal modalIsOpen={modalIsOpen}>
        <form method="dialog" className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setModalIsOpen(false)}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-6">Add new user</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Fistname"
              className="input input-bordered w-full w-full"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full w-full"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button className="btn btn-primary" onClick={addUser}>
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddUser;
