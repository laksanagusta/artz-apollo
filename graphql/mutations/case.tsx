import { gql } from "@apollo/client";

export const CREATE_CASE = gql`
  mutation createCase($name: String!, $description: String!) {
    createCase(input: { name: $name, description: $description }) {
      id
      name
    }
  }
`;

export const UPDATE_CASE = gql`
  mutation updateCase($name: String!, $description: String!, $id: Int!) {
    updateCase(input: { name: $name, description: $description }, id: $id) {
      id
      name
    }
  }
`;
