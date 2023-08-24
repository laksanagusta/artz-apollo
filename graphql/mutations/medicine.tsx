import { gql } from "@apollo/client";

export const CREATE_MEDICINE = gql`
  mutation createMedicine($name: String!, $description: String!) {
    createMedicine(input: { name: $name, description: $description }) {
      id
      name
    }
  }
`;

export const UPDATE_MEDICINE = gql`
  mutation updateMedicine($name: String!, $description: String!, $id: Int!) {
    updateMedicine(input: { name: $name, description: $description }, id: $id) {
      id
      name
    }
  }
`;
