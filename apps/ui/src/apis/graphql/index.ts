import axiosClient from '../client';

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  try {
    const response = await axiosClient.post<GraphQLResponse<T>>('/graphql', {
      query,
      variables,
    });

    // Check for GraphQL errors
    if (response.data.errors) {
      console.error('GraphQL Errors:', response.data.errors);
      throw new Error('GraphQL errors occurred');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error making GraphQL request:', error);
    throw error;  // Rethrow the error for handling at the component level
  }
}
