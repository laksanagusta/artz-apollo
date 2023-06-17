import { CREATE_TRANSACTION } from "@/app/graphql/mutations/transaction";
import { SEARCH_TRANSACTION } from "@/app/graphql/query/transaction";
import { useApolloClient, ApolloClient } from "@apollo/client";

interface ITransaction {
  name: string;
}

export default class TransactionService {
  private client: ApolloClient<object>;
  public constructor() {
    this.client = useApolloClient();
  }

  public async searchTransaction(
    searchParam: string | null | undefined,
    page: number | null | undefined,
    limit: number | null | undefined
  ): Promise<any> {
    return await this.client.query({
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
  }

  public async createTransaction(value: any): Promise<any> {
    return await this.client.mutate({
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
  }
}
