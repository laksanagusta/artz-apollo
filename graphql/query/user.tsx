import { gql } from "@apollo/client";

export const SEARCH_USER = gql`
  query searchUser($page: Float!, $limit: Float!, $name: String) {
    searchUser(page: $page, limit: $limit, name: $name) {
      count
      users {
        id
        name
        email
        phone_number
        password
        token
      }
    }
  }
`;
