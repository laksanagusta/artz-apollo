import { gql } from "@apollo/client";

export const GET_CASE = gql`
  query searchSymptom($page: Float!, $limit: Float!, $name: String!) {
    searchSymptom(page: $page, limit: $limit, name: $name) {
      count
      symptoms {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
