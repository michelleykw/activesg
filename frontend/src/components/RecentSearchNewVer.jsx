import React from 'react';
import { makeStyles } from '@mui/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid, IconButton, Typography } from '@mui/material';
import SearchItemNew from '../components/SearchItemNew.jsx';

const useStyles = makeStyles(theme => ({
    sectionTitle: {
        paddingTop:  theme.spacing(2),
        paddingBottom:  theme.spacing(1),
        fontWeight: '600 !important'
    },
    px2: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    icon: {
        color: theme.palette.background.darkGrey
    },
    my1: {
        marginTop: `${theme.spacing(0.5)} !important`,
        marginBottom: `${theme.spacing(0.5)} !important`
    },
}));

function RecentSearchNewVer({ recentSearchList, removeRecentSearch, doRecentSearch }) {
    const classes = useStyles();

    const renderRow = searchItem => {
        return (
            <Grid container justifyContent="space-between" alignItems="center" className={classes.my1}>
                <Grid item xs={10} onClick={() => doRecentSearch(searchItem)}>
                    <Typography className={classes.m1}>
                        {searchItem}
                    </Typography>
                </Grid>
                <IconButton className={classes.icon} onClick={() => removeRecentSearch(searchItem)}>
                    <CancelIcon />
                </IconButton>
            </Grid>
        );
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center" className={classes.px2}>
            <Grid item xs={12}>
                <Typography variant="h2" color="textSecondary" className={classes.sectionTitle}>
                    Recent Search
                </Typography>
            </Grid>
            {recentSearchList.map(item => renderRow(item))}
        </Grid>
    );
}

export default RecentSearchNewVer;
