import { CREATE_CASE, UPDATE_CASE } from "@/graphql/mutations/case";
import { GET_CASE } from "@/graphql/query/case";
import { useApolloClient, ApolloClient } from "@apollo/client";

export default interface ICase {
  name: string;
  description: string;
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
    fetchPolicy: "no-cache",
  });
};

export const CreateCase = async (
  value: ICase,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.mutate({
    mutation: CREATE_CASE,
    variables: {
      name: value.name,
      description: value.description,
    },
  });
};

export const UpdateCase = async (
  value: ICase,
  client: ApolloClient<Object>,
  id: number
): Promise<any> => {
  return await client.mutate({
    mutation: UPDATE_CASE,
    variables: {
      name: value.name,
      description: value.description,
      id: id,
    },
  });
};
