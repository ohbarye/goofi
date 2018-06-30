interface User {
  avatar_url: string;
  html_url: string;
  login: string;
}

export interface Repository {
  description: string;
  html_url: string;
  id: string;
  name: string;
  owner: User;
}
