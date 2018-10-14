import Index from '../components/Index';

type Props = {
  children: React.Element<any>,
  language: string,
  time: number,
};

export default class IndexPage extends React.Component<Props> {
  static async getInitialProps(ctx: Object): Object {
    const { query } = ctx;
    const { language, endCursor, perPage } = query;
    return {
      language,
      endCursor,
      perPage,
    }
  }

  render() {
    return (
      <Query query={GET_REPOS} variables={{ language, time }}>
        {({ data: { repos } }) => <Index repos={repos} {...this.props} />}
      </Query>
    );
  }
}

// export default () => (
//   <Index />
// )
