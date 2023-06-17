import { CREATE_MEDICINE } from "@/app/graphql/mutations/medicine";
import { GET_MEDICINE } from "@/app/graphql/query/medicine";
import { useApolloClient, ApolloClient } from "@apollo/client";

export default interface IMedicine {
  name: string;
}

export default class MedicineService {
  private client: ApolloClient<object>;
  public constructor() {
    this.client = useApolloClient();
  }

  public async getMedicine(
    name: string | null | undefined,
    page: number | null | undefined,
    limit: number | null | undefined
  ): Promise<any> {
    return await this.client.query({
      query: GET_MEDICINE,
      variables: {
        name: name,
        page: page,
        limit: limit,
      },
    });
  }

  public async createMedicine(value: IMedicine): Promise<any> {
    return await this.client.mutate({
      mutation: CREATE_MEDICINE,
      variables: {
        ...value,
      },
    });
  }
}
