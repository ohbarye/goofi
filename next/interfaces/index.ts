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
