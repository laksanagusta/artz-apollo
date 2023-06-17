import { gql } from "@apollo/client";

export const SEARCH_TRANSACTION = gql`
  query searchTransaction(
    $page: Float!
    $limit: Float!
    $searchParam: String!
  ) {
    searchTransaction(page: $page, limit: $limit, searchParam: $searchParam) {
      count
      transactions {
        id
        complaint
        symptom
        diagnosis
        actions
        member {
          firstName
        }
        createdAt
        updatedAt
      }
    }
  }
`;
