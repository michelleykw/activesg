import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme => ({
    fullScreenHeight: {
        minHeight: 'calc(100vh - 56px)'
    },
    alignCenter: {
        textAlign: 'center'
    }
}));

function Complete() {
    const classes = useStyles();

    return (
        <Grid container full alignItems="center" justifyContent="center" className={classes.fullScreenHeight}>
            <Typography className={classes.alignCenter}>
                Thanks for completing the task!
            </Typography>
        </Grid>
    );
}

export default Complete;