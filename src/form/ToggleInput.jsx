import React, {useState} from 'react';
import { makeStyles } from '@mui/styles';
import {FormControlLabel, Grid, Typography, Switch } from '@mui/material';

const useStyles = makeStyles(theme => ({
    headings: {
        fontWeight: `600 !important`,
        paddingBottom: theme.spacing(0.5)
    },
    pb3: {
        paddingBottom: theme.spacing(3)
    },
    fullWidth: {
        width: '100%'
    },
    switch: {
        top: `-${theme.spacing(1)}`,
        left: theme.spacing(1)
    }
}));

function ToggleInput(props) {
    const { header, subheader, toggle, handleToggle, ...rest } = props;
    const classes = useStyles();

    return (
        <Grid container item className={`${classes.pb3}`}>
            <label className={classes.fullWidth}>
                <Grid container item justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant='h2' className={classes.headings}>{header}</Typography>
                        <Typography color="textSecondary" variant='body1'>{subheader}</Typography>
                    </Grid>
                    <Grid item>
                        <Switch
                            name={header}
                            checked={toggle}
                            color='primary'
                            onChange={handleToggle}
                            className={classes.switch}
                        />
                    </Grid>
                </Grid>
            </label>
        </Grid>
    );
}

export default ToggleInput;