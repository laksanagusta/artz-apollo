import { CREATE_CASE } from "@/app/graphql/mutations/case";
import { GET_CASE } from "@/app/graphql/query/case";
import { useApolloClient, ApolloClient } from "@apollo/client";

export default interface ICase {
  name: string;
}

export const GetCase = async (
  name: string | null | undefined,
  page: number | null | undefined,
  limit: number | null | undefined,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.query({
    query: GET_CASE,
    variables: {
      name: name,
      page: page,
      limit: limit,
    },
  });
};

export const CreateCase = async (
  value: ICase,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.mutate({
    mutation: CREATE_CASE,
    variables: {
      ...value,
    },
  });
};
