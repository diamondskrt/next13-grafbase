import { User as UserFromAuth } from 'next-auth';

export interface FormInputs {
  image: string;
  title: string;
  description: string;
  siteUrl: string;
  githubUrl: string;
  linkedInUrl: string;
  category: string;
}

export interface CreatedBy {
  name: string;
  email: string;
  avatarUrl: string;
  id: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  siteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: CreatedBy;
}
export interface Edge {
  node: Project;
}

export interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface Projects {
  edges: Edge[];
  pageInfo: PageInfo;
}

export interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  siteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedInUrl: string | null;
  projects: Projects;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface AdapterUser extends UserFromAuth {
  id: string;
  email: string;
  emailVerified: Date | null;
}

export type SessionUser = User & UserFromAuth;
