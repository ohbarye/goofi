(async () => {
  const fs = require('fs');
  const axios = require('axios');
  const csv = require('fast-csv');

  const language = process.env.LANGUAGE;
  const gitHubAuthToken = process.env.GITHUB_AUTH_TOKEN;

  const client = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${gitHubAuthToken}`,
    },
  });

  function buildQuery(language, endCursor) {
    const after = endCursor ? `after:"${endCursor}",` : '';
    return `
      query {
        search(first: 100, ${after} query: "language:${language} good-first-issues:>1 stars:>500", type: REPOSITORY) {
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

  function writeIssues(repository) {
    const owner = repository.owner.login;
    const name = repository.name;
    const stars = repository.stargazers.totalCount;

    repository.issues.nodes.forEach((issue) => {
      const title = issue.title;
      const url = issue.url;
      csvStream.write({owner, name, stars, title, url});
    });
  }

  const csvStream = csv.createWriteStream({delimiter: "\t"});
  const writableStream = fs.createWriteStream(`${language}_good_first_issues.csv`);

  writableStream.on("finish", function(){
    console.log("DONE!");
  });
  csvStream.pipe(writableStream);

  const PAGE_LIMIT = 100;

  let page = 0;
  let endCursor = undefined;
  let hasNextPage = true;
  while (hasNextPage && page < PAGE_LIMIT) {
    page++;
    console.log(`Fetching page ${page}...`);
    const query = buildQuery(language, endCursor);
    const response = await client.post('graphql', { query });

    endCursor = response.data.data.search.pageInfo.endCursor;
    hasNextPage = response.data.data.search.pageInfo.hasNextPage;

    const nodes = response.data.data.search.nodes;
    nodes.forEach(writeIssues);
  }

  csvStream.end();
})();
