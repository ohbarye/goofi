const axios = require('axios');
const fetch = require('isomorphic-unfetch');
const { stringify } = require('querystring');
const LRUCache = require('lru-cache');
const { ApolloServer } = require('apollo-server-express');
const dev = process.env.NODE_ENV !== 'production';

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

const gitHubAuthToken = process.env.GITHUB_AUTH_TOKEN;
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
    console.log(`RENDER CACHE HIT: ${key}`);

    return cache.get(key);
  }

  const finder = new GoodFirstIssueFinder(client, language);
  const result = await finder.run(endCursor, perPage);

  cache.set(key, result);

  return result;
};
const resolvers = {
  Query: {
    async goodFirstIssues(root, args, context) {
      const { language = 'javascript', endCursor, perPage = 10 } = args;
      const result = await getResult({language, endCursor, perPage});

      return {
        pageInfo: result.data.search.pageInfo,
        repositoryCount: result.data.search.repositoryCount,
        repositories: result.data.search.nodes.map((repository) => {
          return {
            id: repository.id,
            description: repository.description,
            name: repository.name,
            url: repository.url,
            stargazerCount: repository.stargazers.totalCount,
            owner: {
              id: repository.owner.id,
              avatarUrl: repository.owner.avatarUrl,
              login: repository.owner.login,
              url: repository.owner.url,
            },
            issueCount: repository.issues.totalCount,
            issues: repository.issues.nodes.map((issue) => {
              return {
                id: issue.id,
                title: issue.title,
                url: issue.url,
                author:
                  issue.author ? {
                    avatarUrl: issue.author.avatarUrl
                  } : null,
                updatedAt: issue.updatedAt,
              }
            }),
          }
        }),
      }
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
module.exports = apolloServer;
