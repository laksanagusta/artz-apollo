import { CREATE_MEDICINE, UPDATE_MEDICINE } from "@/graphql/mutations/medicine";
import { GET_MEDICINE } from "@/graphql/query/medicine";
import { useApolloClient, ApolloClient } from "@apollo/client";

export default interface IMedicine {
  name: string;
  description: string;
}

export const GetMedicine = async (
  name: string | null | undefined,
  page: number | null | undefined,
  limit: number | null | undefined,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.query({
    query: GET_MEDICINE,
    variables: {
      name: name,
      page: page,
      limit: limit,
    },
  });
};

export const CreateMedicine = async (
  value: IMedicine,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.mutate({
    mutation: CREATE_MEDICINE,
    variables: {
      ...value,
    },
  });
};

export const UpdateMedicine = async (
  value: IMedicine,
  client: ApolloClient<Object>,
  id: number
): Promise<any> => {
  return await client.mutate({
    mutation: UPDATE_MEDICINE,
    variables: {
      name: value.name,
      description: value.description,
      id: id,
    },
  });
};
