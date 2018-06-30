import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Repository } from "../interfaces/Repository";

interface Props {
  repo: Repository;
}

class RepositoryCard extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <Card>
        <CardContent>
          <Avatar alt="Remy Sharp" src={this.props.repo.owner.avatar_url} />
          <Typography color="textSecondary">
            {this.props.repo.name}
          </Typography>
          <Typography color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>

      </Card>
    );
  }
}

export default RepositoryCard;
