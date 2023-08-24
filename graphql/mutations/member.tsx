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

export const UPDATE_MEMBER = gql`
  mutation updateMember(
    $firstName: String!
    $lastName: String!
    $age: Float!
    $phone_number: String!
    $address: String!
    $id: Int!
  ) {
    updateMember(
      input: {
        firstName: $firstName
        lastName: $lastName
        phone_number: $phone_number
        address: $address
        age: $age
      }
      id: $id
    ) {
      id
      firstName
      lastName
      age
      phone_number
      address
      createdAt
      updatedAt
    }
  }
`;
