import { GraphQLClient } from 'graphql-request';
import {
  createProjectMutation,
  createUserMutation,
  getUserQuery
} from './queries';
import { FormInputsDto } from '@/types/common';

const grafbaseApiUrl = process.env.NEXT_PUBLIC_GRAFBASE_API_URL ?? '';
const grafbaseApiKey = process.env.NEXT_PUBLIC_GRAFBASE_API_KEY ?? '';
const baseUrl = process.env.NEXTAUTH_URL ?? '';

const client = new GraphQLClient(grafbaseApiUrl);

export const fetchToken = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/token`);

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const uploadImage = async (base64Image: string | ArrayBuffer) => {
  try {
    const response = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({
        base64Image
      })
    });

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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

  return makeGraphQLRequest(getUserQuery, variables, {
    'x-api-key': grafbaseApiKey
  });
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
    'x-api-key': grafbaseApiKey
  });
};

export const createProject = async (
  formInputs: FormInputsDto,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(formInputs.image);

  if (!imageUrl.url) return;

  const variables = {
    input: {
      ...formInputs,
      image: imageUrl.url,
      createdBy: {
        link: creatorId
      }
    }
  };

  return makeGraphQLRequest(createProjectMutation, variables, {
    Authorization: `Bearer ${token}`
  });
};
