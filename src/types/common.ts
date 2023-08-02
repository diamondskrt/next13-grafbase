import { User as UserFromAuth, Session } from 'next-auth';

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
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: CreatedBy;
}

export interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface Edge {
  node: Project;
}

export interface Projects {
  edges: Edge[];
  pageInfo: PageInfo;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
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

export interface SessionInterface extends Session {
  user: UserFromAuth & User;
}
