import { gql } from "@apollo/client";

export const CREATE_MEDICINE = gql`
  mutation createMedicine($name: String!) {
    createMedicine(input: { name: $name }) {
      id
      name
    }
  }
`;

export const UPDATE_MEDICINE = gql`
  mutation updateMedicine($name: String!, $id: Float!) {
    updateMedicine(input: { name: $name }, id: $id) {
      id
      name
    }
  }
`;
