import { GraphQLClient } from 'graphql-request';
import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
  updateProjectMutation
} from './queries';
import { FormInputs } from '@/types/common';

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
  formInputs: FormInputs,
  token: string,
  creatorId: string
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

export const updateProject = async (
  formInputs: FormInputs,
  token: string,
  projectId: string
) => {
  const isBase64File = (data: string) => {
    const base64Regex = /^data:[a-zA-Z0-9/+]+;base64,/;

    return base64Regex.test(data);
  };

  if (isBase64File(formInputs.image)) {
    const imageUrl = await uploadImage(formInputs.image);

    if (!imageUrl.url) return;

    formInputs.image = imageUrl.url;
  }

  const variables = {
    id: projectId,
    input: formInputs
  };

  return makeGraphQLRequest(updateProjectMutation, variables, {
    Authorization: `Bearer ${token}`
  });
};

export const fetchAllProjects = (category: string = '', endcursor?: string) => {
  const variables = { category: `.*${category}.*`, endcursor };

  return makeGraphQLRequest(projectsQuery, variables, {
    'x-api-key': grafbaseApiKey
  });
};

export const getProjectById = (id: string) => {
  const variables = { id };

  return makeGraphQLRequest(getProjectByIdQuery, variables, {
    'x-api-key': grafbaseApiKey
  });
};

export const deleteProject = (id: string, token: string) => {
  const variables = { id };

  return makeGraphQLRequest(deleteProjectMutation, variables, {
    Authorization: `Bearer ${token}`
  });
};

export const getUserProjects = (id: string, last?: number) => {
  const variables = { id, last };

  return makeGraphQLRequest(getProjectsOfUserQuery, variables, {
    'x-api-key': grafbaseApiKey
  });
};
