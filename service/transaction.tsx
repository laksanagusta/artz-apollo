import { CREATE_TRANSACTION } from "@/graphql/mutations/transaction";
import { SEARCH_TRANSACTION } from "@/graphql/query/transaction";
import { useApolloClient, ApolloClient } from "@apollo/client";

interface ITransaction {
  name: string;
}

export const SearchTransaction = async (
  searchParam: string | null | undefined,
  page: number | null | undefined,
  limit: number | null | undefined,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.query({
    query: SEARCH_TRANSACTION,
    context: {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    },
    variables: {
      searchParam: searchParam,
      page: page,
      limit: limit,
    },
  });
};

export const CreateTransaction = async (
  value: any,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.mutate({
    mutation: CREATE_TRANSACTION,
    context: {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    },
    variables: {
      diagnosis: value.diagnosis,
      complaint: value.complaint,
      symptom: value.symptom,
      actions: value.actions,
      medicines: value.medicines,
      member: {
        id: value.member,
      },
    },
  });
};
