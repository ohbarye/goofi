import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import * as React from 'react';
import { Issue } from "../interfaces/Repository";

const styles: StyleRulesCallback = theme => ({
  link: {
    textDecoration: 'none',
  },
  listItem: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0px',
      paddingRight: '0px',
    }
  },
  listItemText: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0px',
      paddingRight: '0px',
    }
  },
  avatar: {
    height: '36px',
    width: '36px',
  },
});

interface Props extends WithStyles<typeof styles> {
  issue: Issue;
}

const IssueItem: React.SFC<Props> = (props: Props) => {
  const updatedAt = new Date(props.issue.updatedAt).toLocaleString();
  return (
    <a href={props.issue.url} target={'_blank'} className={props.classes.link}>
      <ListItem button={true} className={props.classes.listItem}>
        <ListItemIcon>
          <Avatar alt="avatar" src={props.issue.author.avatarUrl} className={props.classes.avatar}/>
        </ListItemIcon>
        <ListItemText
          className={props.classes.listItemText}
          primary={props.issue.title}
          secondary={`Updated at ${updatedAt}`}/>
      </ListItem>
      <Divider />
    </a>
  )
};

export default withStyles(styles)(IssueItem);
