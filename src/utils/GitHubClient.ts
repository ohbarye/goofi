import * as Octokit from '@octokit/rest';

export const octokit = new Octokit();

octokit.authenticate({
  type: 'token',
});
