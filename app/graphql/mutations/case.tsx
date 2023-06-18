import { gql } from "@apollo/client";

export const CREATE_CASE = gql`
  mutation createCase($name: String!) {
    createCase(input: { name: $name }) {
      id
      name
    }
  }
`;

export const UPDATE_CASE = gql`
  mutation updateCase($name: String!, $id: Float!) {
    updateCase(input: { name: $name }, id: $id) {
      id
      name
    }
  }
`;
