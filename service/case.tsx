import { CREATE_CASE } from "@/app/graphql/mutations/case";
import { GET_CASE } from "@/app/graphql/query/case";
import { useApolloClient, ApolloClient } from "@apollo/client";

export default interface ICase {
  name: string;
}

export default class CaseService {
  private client: ApolloClient<object>;
  public constructor() {
    this.client = useApolloClient();
  }

  public async getCase(
    name: string | null | undefined,
    page: number | null | undefined,
    limit: number | null | undefined
  ): Promise<any> {
    return await this.client.query({
      query: GET_CASE,
      variables: {
        name: name,
        page: page,
        limit: limit,
      },
    });
  }

  public async createCase(value: ICase): Promise<any> {
    return await this.client.mutate({
      mutation: CREATE_CASE,
      variables: {
        ...value,
      },
    });
  }
}
