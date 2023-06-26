import { gql } from "@apollo/client";

export const CREATE_CASE = gql`
  mutation createSymptom($name: String!) {
    createSymptom(input: { name: $name }) {
      id
      name
    }
  }
`;

export const UPDATE_CASE = gql`
  mutation updateSymptom($name: String!, $id: Float!) {
    updateSymptom(input: { name: $name }, id: $id) {
      id
      name
    }
  }
`;
