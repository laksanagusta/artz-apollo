import { gql } from "@apollo/client";

export const CREATE_SYMPTOM = gql`
  mutation createSymptom($name: String!, $description: String!) {
    createSymptom(input: { name: $name, description: $description }) {
      id
      name
    }
  }
`;

export const UPDATE_SYMPTOM = gql`
  mutation updateSymptom($name: String!, $description: String!, $id: Int!) {
    updateSymptom(input: { name: $name, description: $description }, id: $id) {
      id
      name
    }
  }
`;
