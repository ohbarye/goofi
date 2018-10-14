import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Star from '@material-ui/icons/Star';
import yellow from '@material-ui/core/colors/yellow';
import * as React from 'react';
import { Repository } from "../interfaces";
import IssueList from "./IssueList";

const styles: StyleRulesCallback = theme => ({
  avatar: {
    height: '48px',
    width: '48px',
  },
  repositoryDescription: {
    textAlign: 'left',
  },
  repositoryName: {
    textAlign: 'left',
  },
  verticalCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  star: {
    color: yellow[600],
    width: '14px',
    height: '14px',
    marginRight: '4px',
  },
  repositoryListItem: {
    padding: '0px',
  },
  repositoryListItemText: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0px',
      paddingRight: '0px',
    }
  },
  panelDetails: {
    padding: '16px 24px',
  },
});

interface Props extends WithStyles<typeof styles> {
  repo: Repository;
}

const RepositoryCard: React.SFC<Props> = ({ repo, classes }: Props) => (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container={true} spacing={8}>
          <Grid item={true} xs={12} sm={6} md={4}>
            <ListItem className={classes.repositoryListItem}>
              <ListItemIcon>
                <Avatar alt="avatar" src={repo.owner.avatarUrl} className={classes.avatar}/>
              </ListItemIcon>
              <ListItemText
                className={classes.repositoryListItemText}
                primary={
                  <span className={classes.repositoryName}>
                  <a href={repo.owner.url} target='_blank'>{repo.owner.login}</a> / <a href={repo.url} target='_blank'>{repo.name}</a>
                </span>
                }
                secondary={
                  <span className={classes.verticalCenter}>
                  <Star className={classes.star}/>
                    {repo.stargazerCount}
                </span>
                }
              />
            </ListItem>
          </Grid>
          <Grid item={true} xs={12} sm={6} md={8} className={classes.verticalCenter}>
            <Typography color="default" className={classes.repositoryDescription}>
              {repo.description}
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <Divider />
      <ExpansionPanelDetails className={classes.panelDetails}>
        {repo.issueCount === 0 ?
          <Typography color="default">
            Oops, this repository has no good first issues for now. Let's wait for their update.
          </Typography>
          : <IssueList issues={repo.issues} ownerAvatarUrl={repo.owner.avatarUrl}/>
        }
      </ExpansionPanelDetails>
    </ExpansionPanel>
);

export default withStyles(styles)(RepositoryCard);
