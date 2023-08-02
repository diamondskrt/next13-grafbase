import { GraphQLClient } from 'graphql-request';
import { createUserMutation, getUserQuery } from './queries';

const apiUrl = process.env.NEXT_PUBLIC_GRAFBASE_API_URL ?? '';
const apiKey = process.env.NEXT_PUBLIC_GRAFBASE_API_KEY ?? '';

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (
  query: string,
  variables = {},
  headers?: any
) => {
  try {
    return await client.request(query, variables, headers);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = (email?: string | null) => {
  if (!email) return false;

  const variables = { email };

  return makeGraphQLRequest(getUserQuery, variables, { 'x-api-key': apiKey });
};

export const createUser = (
  name?: string | null,
  email?: string | null,
  image?: string | null
) => {
  const variables = {
    input: {
      name,
      email,
      avatarUrl: image
    }
  };

  return makeGraphQLRequest(createUserMutation, variables, {
    'x-api-key': apiKey
  });
};
