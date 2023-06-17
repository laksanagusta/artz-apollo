import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation createTransaction(
    $complaint: String!
    $symptom: String!
    $diagnosis: String!
    $actions: String!
    $medicines: [MedicineTransactionInput!]!
    $member: MemberTransactionInput!
  ) {
    createTransaction(
      input: {
        complaint: $complaint
        symptom: $symptom
        diagnosis: $diagnosis
        actions: $actions
        medicines: $medicines
        member: $member
      }
    ) {
      id
      complaint
      symptom
      diagnosis
      actions
      medicines {
        id
      }
      member {
        id
      }
      createdAt
      updatedAt
    }
  }
`;
