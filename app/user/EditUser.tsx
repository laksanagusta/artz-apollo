"use client";
import { FormEventHandler, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";

interface EditUserProps {
  nameProps: string;
  phoneNumberProps: string;
  idProps: number;
  setOpenModalEdit: (open: boolean) => boolean | void;
}

const EditUser: React.FC<EditUserProps> = ({
  nameProps,
  phoneNumberProps,
  idProps,
  setOpenModalEdit,
}) => {
  const ID = idProps;

  const [name, setName] = useState<string>(nameProps);
  const [phoneNumber, setPhoneNumber] = useState<string>(phoneNumberProps);

  const client = useApolloClient();

  const EDIT_MEMBER = gql`
    mutation updateUser($name: String!, $phone_number: String!, $id: Int!) {
      updateUser(input: { name: $name, phone_number: $phone_number }, id: $id) {
        id
        name
        phone_number
      }
    }
  `;

  const _editUser: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const data = await client.mutate({
      mutation: EDIT_MEMBER,
      variables: {
        name: name,
        phone_number: phoneNumber,
        id: ID,
      },
    });

    setOpenModalEdit(false);
  };

  return (
    <div>
      <form method="dialog" className="modal-box" onSubmit={_editUser}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setOpenModalEdit(false)}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-6">Edit User</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Fistname"
            className="input input-bordered w-full w-full"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="input input-bordered w-full w-full"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
