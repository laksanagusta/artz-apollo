import { gql } from "@apollo/client";

export const GET_MEMBER = gql`
  query searchMember($page: Float!, $limit: Float!, $name: String!) {
    searchMember(page: $page, limit: $limit, name: $name) {
      count
      members {
        id
        firstName
        lastName
        age
        address
        phone_number
        createdAt
        updatedAt
      }
    }
  }
`;
