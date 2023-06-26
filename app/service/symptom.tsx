import { CREATE_CASE } from "@/app/graphql/mutations/symptom";
import { GET_CASE } from "@/app/graphql/query/symptom";
import { useApolloClient, ApolloClient } from "@apollo/client";

export default interface ISymptom {
  name: string;
}

export const GetSymptom = async (
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

export const CreateSymptom = async (
  value: ISymptom,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.mutate({
    mutation: CREATE_CASE,
    variables: {
      ...value,
    },
  });
};
