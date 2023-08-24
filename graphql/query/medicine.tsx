import { gql } from "@apollo/client";

export const GET_MEDICINE = gql`
  query searchMedicine($page: Float!, $limit: Float!, $name: String!) {
    searchMedicine(page: $page, limit: $limit, name: $name) {
      count
      medicines {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;
