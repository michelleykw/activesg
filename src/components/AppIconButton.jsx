import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, IconButton, Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
    textAlignCenter: {
        textAlign: 'center'
    },
    categoryIcon: {
        color: `${theme.palette.background.darkGrey} !important`,
        backgroundColor: `${theme.palette.background.lightGrey} !important`
    },
    pt1: {
        paddingTop: theme.spacing(1)
    }
}));

function AppButton({ name, icon, onClick }) {
    const classes = useStyles();

    return (
        <Grid
            container item xs={12}
            direction='column' alignItems='center' justifyContent='space-evenly'
            onClick={onClick}
        >
            <IconButton aria-label={name} className={classes.categoryIcon}>
                {icon}
            </IconButton>
            <Typography color="textSecondary" variant="body2" className={`${classes.textAlignCenter} ${classes.pt1}`}>{name}</Typography>
        </Grid>
    );
}

export default AppButton;