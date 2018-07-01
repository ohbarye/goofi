import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Star from '@material-ui/icons/Star';
import yellow from '@material-ui/core/colors/yellow';
import * as React from 'react';
import { Repository } from "../interfaces/Repository";

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
  }
});

interface Props extends WithStyles<typeof styles> {
  repo: Repository;
}

const RepositoryCard: React.SFC<Props> = (props: Props) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Grid container={true} spacing={8}>
        <Grid item={true} xs={4} sm={2} md={1}>
          <Avatar alt="avatar" src={props.repo.owner.avatarUrl} className={props.classes.avatar}/>
        </Grid>
        <Grid item={true} xs={8} sm={4} md={3}>
          <Typography color="default" className={props.classes.repositoryName} variant={'body2'}>
            <a href={props.repo.owner.url} target='_blank'>{props.repo.owner.login}</a>/
            <a href={props.repo.url} target='_blank'>{props.repo.name}</a>
          </Typography>
          <Typography className={props.classes.verticalCenter} color={'textSecondary'}>
            <Star className={props.classes.star}/>
            {props.repo.stargazers.totalCount}
          </Typography>
        </Grid>
        <Grid item={true} xs={12} sm={6} md={8} className={props.classes.verticalCenter}>
          <Typography color="default" className={props.classes.repositoryDescription}>
            {props.repo.description}
          </Typography>
        </Grid>
      </Grid>
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
