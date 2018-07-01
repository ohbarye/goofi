interface User {
  id: string;
  avatarUrl: string;
  url: string;
  login: string;
}

export interface Repository {
  description: string;
  url: string;
  id: string;
  name: string;
  owner: User;
  stargazers: {
    totalCount: number;
  };
}
