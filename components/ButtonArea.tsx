import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import * as React from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles: StyleRulesCallback = theme => ({
  buttonArea: {
    textAlign: 'center',
    paddingBottom: '24px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  button: {
    width: '100%',
  }
});

interface Props extends WithStyles<typeof styles> {
  handleClick: () => void;
  loading: boolean;
  hasNextPage: boolean;
}

const ButtonArea: React.SFC<Props> = ({ classes, handleClick, loading, hasNextPage }: Props) => {
  const buttonLabel = loading ? '' :
                      hasNextPage ? 'Load more' : 'No more repos';
  return (
    <div className={classes.buttonArea}>
      <Grid container={true} justify={'center'}>
        <Grid item={true} xs={12} sm={4}>
          <Button
            size="large"
            variant='raised'
            color='primary'
            className={classes.button}
            disabled={loading || !hasNextPage}
            onClick={handleClick}
          >
            {loading && <CircularProgress size={24}/>}
            {buttonLabel}
          </Button>
        </Grid>
      </Grid>
    </div>
  )
};

export default withStyles(styles)(ButtonArea);
