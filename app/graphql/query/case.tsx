import { gql } from "@apollo/client";

export const GET_CASE = gql`
  query searchCase($page: Float!, $limit: Float!, $name: String!) {
    searchCase(page: $page, limit: $limit, name: $name) {
      count
      cases {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
