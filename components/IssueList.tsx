import List from "@material-ui/core/List";
import {
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Theme
} from "@material-ui/core/styles";
import * as React from "react";
import { Issue } from "../interfaces";
import IssueItem from "./IssueItem";

const styles: StyleRulesCallback<Theme, Props> = _ => ({
  issueList: {
    width: "100%",
    paddingTop: "0px",
    paddingBottom: "0px"
  }
});

interface Props extends WithStyles<typeof styles> {
  issues: Issue[];
  ownerAvatarUrl: string;
}

const IssueList: React.FC<Props> = ({
  issues,
  ownerAvatarUrl,
  classes
}: Props) => {
  return (
    <List component="nav" className={classes.issueList}>
      {issues.map((issue: Issue, i) => (
        <IssueItem key={i} issue={issue} ownerAvatarUrl={ownerAvatarUrl} />
      ))}
    </List>
  );
};

export default withStyles(styles)(IssueList);
