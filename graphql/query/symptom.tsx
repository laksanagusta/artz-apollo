import { gql } from "@apollo/client";

export const GET_SYMPTOM = gql`
  query searchSymptom($page: Float!, $limit: Float!, $name: String!) {
    searchSymptom(page: $page, limit: $limit, name: $name) {
      count
      symptoms {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;
