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

function NotFound({ isNotMobile, isNotFacility }) {
    const classes = useStyles();

    return (
        <Grid container full alignItems="center" justifyContent="center" className={classes.fullScreenHeight}>
            <Typography className={classes.alignCenter}>
                {isNotFacility && 'Kindly click to the Facilities Page to start the task'}
                {isNotMobile && 'Kindly change the orientation of your mobile or use the APP on your mobile instead'}
            </Typography>
        </Grid>
    );
}

export default NotFound;