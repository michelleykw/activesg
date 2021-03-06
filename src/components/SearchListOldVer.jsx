import React from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { sendNetworkLog } from '../logging/logging.js';


const useStyles = makeStyles(theme => ({
    pxHalf: {
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        paddingTop: theme.spacing(1)
    },
    px1: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    px2: {
        paddingLeft: theme.spacing(1.5),
        paddingRight:  theme.spacing(1.5)
    },
    row: {
        paddingBottom:  theme.spacing(1),
        paddingTop:  theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.background.midGrey}`
    },
    mt1mb8: {
        marginTop:  theme.spacing(0.5),
        paddingBottom: `${theme.spacing(7)} !important`
    }
}));

function SearchListOldVer({ list, search, fullScreen=false, handleClose }) {
    const classes = useStyles();

    // const searchAndClose = searchItem => {
    //     console.log('--> searchAndClose');
    //     search(searchItem);
    //     handleClose();
    // };

    const location = useLocation();

    const handleRowClick = (searchItem) => {
        search(searchItem);
        const versionId = new URLSearchParams(location.search).get('version');
        sendNetworkLog('Clicked on: Search List Item (General)', 'Search List Item (General)', `Item: ${searchItem}`, versionId);
        handleClose();
    }

    const renderRow = searchItem => {
        return (
            <Grid container onClick={() => {handleRowClick(searchItem)}} justifyContent="space-between" alignItems="center" className={`${classes.row}`}>
                <Grid item xs={10} className={fullScreen ? classes.px1 : classes.px2}>
                    <Typography color="textSecondary">
                        {searchItem}
                    </Typography>
                </Grid>
            </Grid>
        )
    };

    return (
        <Grid container justifyContent="flex-start" alignItems="center" className={fullScreen ? classes.pxHalf : classes.mt1mb8} sx={{mt: 5}}>
            {list && list.map(item => renderRow(item))}
        </Grid>
    );
}

export default SearchListOldVer;
