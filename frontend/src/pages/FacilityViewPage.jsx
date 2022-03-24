import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme => ({
    fullScreenHeight: {
        minHeight: 'calc(100vh - 56px)'
    }
}));

function FacilityViewPage() {
    const classes = useStyles();

    return (
        <Grid container alignItems="center" className={classes.fullScreenHeight}>
            <Typography>Facilities View: Oh no, the page can’t be found</Typography>
        </Grid>
    );
}

export default FacilityViewPage;