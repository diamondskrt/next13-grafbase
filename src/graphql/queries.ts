import { gql } from 'graphql-request';

export const getUserQuery = gql`
  query getUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      avatarUrl
      description
      githubUrl
      linkedInUrl
    }
  }
`;

export const createUserMutation = gql`
  mutation CreateUser($input: UserCreateInput!) {
    userCreate(input: $input) {
      user {
        id
        name
        email
        avatarUrl
        description
        githubUrl
        linkedInUrl
      }
    }
  }
`;

export const createProjectMutation = gql`
  mutation CreateProject($input: ProjectCreateInput!) {
    projectCreate(input: $input) {
      project {
        id
        title
        description
        createdBy {
          email
          name
        }
      }
    }
  }
`;

export const updateProjectMutation = gql`
  mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
    projectUpdate(by: { id: $id }, input: $input) {
      project {
        id
        title
        description
        createdBy {
          email
          name
        }
      }
    }
  }
`;

export const deleteProjectMutation = gql`
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const projectsQuery = gql`
  query getProjects($category: String, $endcursor: String) {
    projectSearch(first: 8, after: $endcursor, filter: { category: { regex: $category }}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          siteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getProjectByIdQuery = gql`
  query getProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      siteUrl
      githubUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getProjectsOfUserQuery = gql`
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedInUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;
