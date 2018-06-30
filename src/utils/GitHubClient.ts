import * as Octokit from '@octokit/rest';

export const octokit = new Octokit();

octokit.authenticate({
  token: '',
  type: 'token',
});
