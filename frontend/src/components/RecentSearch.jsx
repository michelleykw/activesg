import React from 'react';
import { makeStyles } from '@mui/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid, IconButton, Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.background.darkGrey
    },
    recentSearchHeader: {
        backgroundColor: theme.palette.background.lightGrey,
        marginBottom: theme.spacing(1)
    },
    m2: {
        margin: `${theme.spacing(1.5)} !important`
    },
    mx2my1: {
        marginLeft: `${theme.spacing(2)} !important`,
        marginRight: `${theme.spacing(2)} !important`,
        marginTop: `${theme.spacing(0.5)} !important`,
        marginBottom: `${theme.spacing(0.5)} !important`
    },
}));

function RecentSearch({ recentSearchList, removeRecentSearch, doRecentSearch }) {
    const classes = useStyles();

    const renderRow = searchItem => {
        return (
            <Grid container justifyContent="space-between" alignItems="center" className={classes.mx2my1}>
                <Grid item xs={10} onClick={() => doRecentSearch(searchItem)}>
                    <Typography className={classes.m1}>
                        {searchItem}
                    </Typography>
                </Grid>
                <IconButton className={classes.icon} onClick={() => removeRecentSearch(searchItem)}>
                    <CancelIcon />
                </IconButton>
            </Grid>
        )
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center">
            <Grid container className={classes.recentSearchHeader}>
                <Typography className={classes.m2}>Recent Search</Typography>
            </Grid>
            {recentSearchList.map(item => renderRow(item))}
        </Grid>
    );
}

export default RecentSearch;
