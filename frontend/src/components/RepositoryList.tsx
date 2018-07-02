import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import * as React from 'react';
import { Repository } from "../interfaces";
import RepositoryCard from "./RepositoryCard";

const styles: StyleRulesCallback = theme => ({
  body: {
    paddingBottom: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '80px',
    textAlign: 'center',
  },
});

interface Props extends WithStyles<typeof styles> {
  loading: boolean;
  repos: Repository[];
}

const RepositoryList: React.SFC<Props> = ({ loading, repos, classes }: Props) => {
  return (
    <div className={classes.body}>
      {loading ? <CircularProgress /> :
        repos.map((repo: Repository) => <RepositoryCard key={repo.id} repo={repo} />)}
    </div>
  )
};

export default withStyles(styles)(RepositoryList);
