import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Theme
} from "@material-ui/core/styles";
import * as React from "react";
import { Issue } from "../interfaces";

const styles: StyleRulesCallback<Theme, Props> = theme => ({
  link: {
    textDecoration: "none"
  },
  listItem: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0px",
      paddingRight: "0px"
    }
  },
  listItemText: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0px",
      paddingRight: "0px"
    }
  },
  avatar: {
    height: "36px",
    width: "36px"
  }
});

interface Props extends WithStyles<typeof styles> {
  issue: Issue;
  ownerAvatarUrl: string;
}

const IssueItem: React.FC<Props> = ({
  issue,
  ownerAvatarUrl,
  classes
}: Props) => {
  const updatedAt = new Date(issue.updatedAt).toLocaleString();
  const avatarUrl = issue.author ? issue.author.avatarUrl : ownerAvatarUrl;
  return (
    <a href={issue.url} target={"_blank"} className={classes.link}>
      <ListItem button={true} className={classes.listItem}>
        <ListItemIcon>
          <Avatar alt="avatar" src={avatarUrl} className={classes.avatar} />
        </ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={issue.title}
          secondary={`Updated at ${updatedAt}`}
        />
      </ListItem>
      <Divider />
    </a>
  );
};

export default withStyles(styles)(IssueItem);
