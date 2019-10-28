import { Theme } from "@material-ui/core";
import { SheetsRegistry, GenerateClassName } from "jss";

interface User {
  id: string;
  avatarUrl: string;
  url: string;
  login: string;
}

interface Actor {
  avatarUrl: string;
}

export interface Issue {
  id: string;
  title: string;
  url: string;
  author?: Actor;
  updatedAt: string;
}

export interface Repository {
  description: string;
  url: string;
  id: string;
  name: string;
  owner: User;
  issueCount: number;
  issues: Issue[];
  stargazerCount: number;
}

export interface GoodFirstIssuesResponse {
  pageInfo: {
    endCursor: string;
    startCursor: string;
    hasNextPage: boolean;
  };
  repositories: Repository[];
  repositoryCount: number;
}

export type MaterialUIContext = {
  theme: Theme;
  sheetsManager: Map<any, any>;
  sheetsRegistry: SheetsRegistry;
  generateClassName: GenerateClassName<any>;
};

export interface GoofiGlobal extends NodeJS.Global {
  __INIT_MATERIAL_UI__: MaterialUIContext;
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}
