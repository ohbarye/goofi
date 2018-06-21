const fs = require('fs');
const axios = require('axios');
const csv = require('fast-csv');

const languages = process.env.LANGUAGE.split(',');
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

class CsvWriter {
  constructor(filename) {
    this.filename = filename;
    this.csvStream = csv.createWriteStream({delimiter: "\t", headers: true});
  }

  start() {
    const writableStream = fs.createWriteStream(this.filename);
    this.csvStream.pipe(writableStream);
  }

  write(row) {
    this.csvStream.write(row);
  }

  end() {
    this.csvStream.end();
  }
}

class GoodFirstIssueFinder {
  constructor(client, writer, language) {
    this.client = client;
    this.writer = writer;
    this.language = language;
    this.PAGE_LIMIT = 100;

    this.run = this.run.bind(this);
    this.buildQuery = this.buildQuery.bind(this);
    this.writeIssues = this.writeIssues.bind(this);
  }

  async run() {
    let page = 0;
    let endCursor = undefined;
    let hasNextPage = true;
    while (hasNextPage && page < this.PAGE_LIMIT) {
      page++;
      console.log(`[${this.language}] Fetching page ${page}...`);
      const query = this.buildQuery(endCursor);
      const response = await this.client.post('graphql', {query});

      endCursor = response.data.data.search.pageInfo.endCursor;
      hasNextPage = response.data.data.search.pageInfo.hasNextPage;

      const nodes = response.data.data.search.nodes;
      nodes.forEach(this.writeIssues);
    }
  }

  buildQuery(endCursor) {
    const after = endCursor ? `after:"${endCursor}",` : '';
    return `
      query {
        search(first: 100, ${after} query: "language:${this.language} good-first-issues:>1 stars:>500", type: REPOSITORY) {
          repositoryCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          nodes {
            ... on Repository {
              owner {
                login
              }
              name
              url
              issues(first: 100, labels: ["good first issue"], states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}) {
                totalCount
                nodes {
                  title
                  url
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

  writeIssues(repository) {
    const owner = repository.owner.login;
    const name = repository.name;
    const stars = repository.stargazers.totalCount;

    repository.issues.nodes.forEach((issue) => {
      const title = issue.title;
      const url = issue.url;
      this.writer.write({owner, name, stars, title, url});
    });
  }
}

(async () => {
  languages.forEach(async (language) => {
    const writer = new CsvWriter(`csv/${language}.csv`);
    writer.start();

    const finder = new GoodFirstIssueFinder(client, writer, language);
    await finder.run();

    writer.end();
  });
})();
