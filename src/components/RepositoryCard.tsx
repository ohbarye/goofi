import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
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
import { Repository, Issue } from "../interfaces/Repository";
import IssueItem from "./IssueItem";

const styles: StyleRulesCallback = theme => ({
  avatar: {
    height: '48px',
    width: '48px',
  },
  repositoryDescription: {
    textAlign: 'left',
    wordBreak: 'break-all',
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
  issueList: {
    width: '100%',
  },
});

interface Props extends WithStyles<typeof styles> {
  repo: Repository;
}

const RepositoryCard: React.SFC<Props> = (props: Props) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Grid container={true} spacing={8}>
        <Grid item={true} xs={12} sm={6} md={4}>
          <ListItem className={props.classes.repositoryListItem}>
            <ListItemIcon>
              <Avatar alt="avatar" src={props.repo.owner.avatarUrl} className={props.classes.avatar}/>
            </ListItemIcon>
            <ListItemText
              className={props.classes.repositoryListItemText}
              primary={
                <span className={props.classes.repositoryName}>
                  <a href={props.repo.owner.url} target='_blank'>{props.repo.owner.login}</a>/
                  <a href={props.repo.url} target='_blank'>{props.repo.name}</a>
                </span>
              }
              secondary={
                <span className={props.classes.verticalCenter}>
                  <Star className={props.classes.star}/>
                  {props.repo.stargazers.totalCount}
                </span>
              }
            />
          </ListItem>
        </Grid>
        <Grid item={true} xs={12} sm={6} md={8} className={props.classes.verticalCenter}>
          <Typography color="default" className={props.classes.repositoryDescription}>
            {props.repo.description}
          </Typography>
        </Grid>
      </Grid>
    </ExpansionPanelSummary>
    <Divider />
    <ExpansionPanelDetails>
      <List component="nav" className={props.classes.issueList}>
        {props.repo.issues.nodes.map((issue: Issue, i) => (
          <IssueItem
            key={i}
            issue={issue}
            ownerAvatarUrl={props.repo.owner.avatarUrl}/>
        ))}
      </List>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default withStyles(styles)(RepositoryCard);
