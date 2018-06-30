import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { Repository } from "../interfaces/Repository";

const styles: StyleRulesCallback = theme => ({
  avatar: {
    height: '24px',
    width: '24px',
  },
  repositoryDescription: {
    textAlign: 'left',
    width: '100%',
    wordBreak: 'break-all',
  },
  repositoryName: {
    margin: '0px 8px',
    textAlign: 'left',
    width: '250px',
  },
});

interface Props extends WithStyles<typeof styles> {
  repo: Repository;
}

const RepositoryCard: React.SFC<Props> = (props: Props) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Avatar alt="avatar" src={props.repo.owner.avatar_url} className={props.classes.avatar}/>
      <Typography color="default" className={props.classes.repositoryName}>
        <a href={props.repo.owner.html_url} target='_blank'>{props.repo.owner.login}</a>/
        <a href={props.repo.html_url} target='_blank'>{props.repo.name}</a>
      </Typography>
      <Typography color="default" className={props.classes.repositoryDescription}>
        {props.repo.description}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        sit amet blandit leo lobortis eget.
      </Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default withStyles(styles)(RepositoryCard);
