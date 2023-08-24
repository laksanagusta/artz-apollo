import { CREATE_MEMBER, UPDATE_MEMBER } from "@/graphql/mutations/member";
import { GET_MEMBER } from "@/graphql/query/member";
import { ApolloClient, gql, useApolloClient } from "@apollo/client";

export default interface IMember {
  firstName: string;
  lastName: string;
  age: number;
  adress: string;
  id: number;
}

export const GetMember = async (name: string, client: ApolloClient<Object>) => {
  const SEARCH_MEMBERS = gql`
    query searchMember($name: String!) {
      searchMember(name: $name) {
        count
        members {
          id
          firstName
          lastName
          address
          age
          phone_number
        }
      }
    }
  `;

  const { data } = await client.query({
    query: SEARCH_MEMBERS,
    variables: { name: name },
  });

  return data.searchMember;
};

export const SearchMember = async (
  name: string | null | undefined,
  page: number | null | undefined,
  limit: number | null | undefined,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.query({
    query: GET_MEMBER,
    variables: {
      name: name,
      page: page,
      limit: limit,
    },
  });
};

export const CreateMember = async (
  value: IMember,
  client: ApolloClient<Object>
): Promise<any> => {
  return await client.mutate({
    mutation: CREATE_MEMBER,
    variables: {
      ...value,
    },
  });
};

export const UpdateMember = async (
  value: IMember,
  client: ApolloClient<Object>,
  id: number
): Promise<any> => {
  value.id = id;
  return await client.mutate({
    mutation: UPDATE_MEMBER,
    variables: {
      ...value,
    },
  });
};
