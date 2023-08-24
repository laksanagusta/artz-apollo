import { CREATE_SYMPTOM, UPDATE_SYMPTOM } from "@/graphql/mutations/symptom";
import { GET_SYMPTOM } from "@/graphql/query/symptom";
import { useApolloClient, ApolloClient } from "@apollo/client";

export default interface ISymptom {
  name: string;
  description: string;
}

export const GetSymptom = async (
  name: string | null | undefined,
  page: number | null | undefined,
  limit: number | null | undefined,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.query({
    query: GET_SYMPTOM,
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
    mutation: CREATE_SYMPTOM,
    variables: {
      ...value,
    },
  });
};

export const UpdateSymptom = async (
  value: ISymptom,
  client: ApolloClient<Object>,
  id: number
): Promise<any> => {
  return await client.mutate({
    mutation: UPDATE_SYMPTOM,
    variables: {
      name: value.name,
      description: value.description,
      id: id,
    },
  });
};
