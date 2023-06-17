import { CREATE_MEMBER } from "@/app/graphql/mutations/member";
import { GET_MEMBER } from "@/app/graphql/query/member";
import { ApolloClient, gql, useApolloClient } from "@apollo/client";

export default interface IMember {
  name: string;
  age: number;
  adress: string;
}

export default class MemberService {
  private client: ApolloClient<object>;
  public constructor() {
    this.client = useApolloClient();
  }

  public async getMember(name: string) {
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

    const { data } = await this.client.query({
      query: SEARCH_MEMBERS,
      variables: { name: name },
    });

    return data.searchMember;
  }

  public async searchMember(
    name: string | null | undefined,
    page: number | null | undefined,
    limit: number | null | undefined
  ): Promise<any> {
    return await this.client.query({
      query: GET_MEMBER,
      variables: {
        name: name,
        page: page,
        limit: limit,
      },
    });
  }

  public async createMember(value: IMember): Promise<any> {
    return await this.client.mutate({
      mutation: CREATE_MEMBER,
      variables: {
        ...value,
      },
    });
  }
}
