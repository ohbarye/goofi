import { Component } from 'react';
import Index from '../components/Index';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

type Props = {
  language: string,
  time: number,
  endCursor?: string,
  perPage: number,
};

const getParams = (query) => {
  if (query) {
    const { language = 'javascript', endCursor, perPage } = query;
    return {
      language,
      endCursor,
      perPage,
    };
  } else {
    return {
      language: 'javascript',
      endCursor: undefined,
      perPage: 20,
    };
  }
};

export default class IndexPage extends Component<Props> {
  static async getInitialProps({ query }): Promise<Object> {
    return getParams(query);
  }

  render() {
    const { language, endCursor, perPage } = this.props;

    return (
      <Query query={GET_REPOS} variables={{ language, endCursor, perPage }}>
        {({ data: { goodFirstIssues } }) => <Index goodFirstIssues={goodFirstIssues} language={language} {...this.props} />}
      </Query>
    );
  }
}

const GET_REPOS = gql`
  query goodFirstIssues($language: String!, $endCursor: String, $perPage: Int) {
    goodFirstIssues(language: $language, perPage: $perPage, endCursor:$endCursor) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      repositories {
        id
        owner {
          id
          avatarUrl
          login
          url
        }
        description
        name
        url
        stargazerCount
        issueCount
        issues {
          title
          url
          updatedAt
          author {
            avatarUrl
          }
        }
      }
    }
  }
`;
