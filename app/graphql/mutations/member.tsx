import { gql } from "@apollo/client";

export const CREATE_MEMBER = gql`
  mutation createMember(
    $firstName: String!
    $lastName: String!
    $age: Float!
    $phone_number: String!
    $address: String!
  ) {
    createMember(
      input: {
        firstName: $firstName
        lastName: $lastName
        phone_number: $phone_number
        address: $address
        age: $age
      }
    ) {
      id
      firstName
      age
      phone_number
      address
    }
  }
`;
