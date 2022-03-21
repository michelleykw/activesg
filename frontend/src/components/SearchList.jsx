import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
    pxHalf: {
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem'
    },
    px1: {
        paddingLeft: '1rem',
        paddingRight: '1rem'
    },
    px2: {
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
    },
    row: {
        paddingBottom: '1rem',
        paddingTop: '1rem',
        borderBottom: `1px solid ${theme.palette.background.midGrey}`
    },
    mt1mb8: {
        marginTop: '0.5rem',
        paddingBottom: `${theme.spacing(7)} !important`
    }
}));

function SearchList({ list, search, fullScreen=false }) {
    const classes = useStyles();

    const renderRow = searchItem => {
        return (
            <Grid container onClick={() => search(searchItem)} justifyContent="space-between" alignItems="center" className={`${classes.row}`}>
                <Grid item xs={10} className={fullScreen ? classes.px1 : classes.px2}>
                    <Typography color="textSecondary">
                        {searchItem}
                    </Typography>
                </Grid>
            </Grid>
        )
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center" className={fullScreen ? classes.pxHalf : classes.mt1mb8}>
            {list && list.map(item => renderRow(item))}
        </Grid>
    );
}

export default SearchList;
