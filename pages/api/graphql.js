import axios from 'axios';
import LRUCache from 'lru-cache';
import { ApolloServer } from 'apollo-server-micro'

const cache = new LRUCache({
  max: 150,
  maxAge: 1000 * 60 * 60 * 6, // 6 hour cache
});

const graphql = query => query.join('');

const typeDefs = graphql`
  type Query {
    goodFirstIssues(language: String!, endCursor: String, perPage: Int): GoodFirstIssues!
  }

  type GoodFirstIssues {
    pageInfo: PageInfo!
    repositoryCount: Int!
    repositories: [Repository]!
  }
  
  type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean!
  }

  type Repository {
    id: ID!
    owner: RepositoryOwner!
    description: String
    name: String!
    url: String!
    stargazerCount: Int!
    issueCount: Int!
    issues: [Issue]!
  }
  
  type RepositoryOwner {
    id: ID!
    avatarUrl: String!
    login: String!
    url: String!
  }
  
  type Actor {
    avatarUrl: String!
  }
  
  type Issue {
    title: String!
    url: String!
    author: Actor
    updatedAt: String!
  }
`;

class GoodFirstIssueFinder {
  constructor(client, language) {
    this.client = client;
    this.language = language;

    this.run = this.run.bind(this);
    this.buildQuery = this.buildQuery.bind(this);
  }

  async run(endCursor = undefined, perPage = 10) {
    const query = this.buildQuery(endCursor, perPage);
    const response = await this.client.post('graphql', {query});
    return response.data;
  }

  buildQuery(endCursor, perPage) {
    const after = endCursor ? `after:"${endCursor}",` : '';
    return `
      query {
        search(first: ${perPage}, ${after} query: "language:${this.language} good-first-issues:>1 stars:>500", type: REPOSITORY) {
          repositoryCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          nodes {
            ... on Repository {
              owner {
                id
                avatarUrl
                login
                url
              }
              id
              description
              name
              url
              issues(first: 100, labels: ["good first issue"], states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}) {
                totalCount
                nodes {
                  id
                  title
                  url
                  author {
                    avatarUrl
                  }
                  updatedAt
                }
              }
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    `
  }
}

const gitHubAuthToken = process.env.GITHUB_ACCESS_TOKEN;
const client = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${gitHubAuthToken}`,
  },
});

const getResult = async ({ language, endCursor, perPage }) => {
  const key = `language=${language}&endCursor=${endCursor}&perPage=${perPage}`;

  if (cache.has(key)) {
    console.log(`cache hit: ${key}`);

    return cache.get(key);
  }

  const finder = new GoodFirstIssueFinder(client, language);
  const result = await finder.run(endCursor, perPage);

  cache.set(key, result);

  console.log(`cache miss: ${key}`);

  return result;
};

const getGoodFirstIssues = async ({language, endCursor, perPage}) => {
  const queryResponse = await getResult({language, endCursor, perPage});

  const formattedResponse = {
    ...queryResponse.data.search,
    repositories: queryResponse.data.search.nodes.map((repository) => {
      return {
        ...repository,
        stargazerCount: repository.stargazers.totalCount,
        issueCount: repository.issues.totalCount,
        issues: repository.issues.nodes.map((issue) => {
          return {
            ...issue,
            author: issue.author ? {
              avatarUrl: issue.author.avatarUrl
            } : null,
          }
        }),
      }
    }),
  };

  delete formattedResponse.nodes; // Reduce payload
  return formattedResponse;
};

const resolvers = {
  Query: {
    async goodFirstIssues(root, args, context) {
      const { language = 'javascript', endCursor, perPage = 10 } = args;
      return await getGoodFirstIssues({language, endCursor, perPage});
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
