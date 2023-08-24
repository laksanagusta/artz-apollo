import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($name: String!, $phone_number: String!, $id: Float!) {
    updateUser(input: { name: "string", phone_number: "string" }, id: $id) {
      id
      name
      email
      phone_number
      password
      token
    }
  }
`;
