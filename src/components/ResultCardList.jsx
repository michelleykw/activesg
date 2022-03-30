import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ResultCardOld from '../components/ResultCardOld';
import ResultCardNew from '../components/ResultCardNew';

const useStyles = makeStyles(theme => ({
    fullScreenHeight: {
        minHeight: "100vh"
    }
}));

function ResultCardList({useOldResult, filteredData}) {
    const classes = useStyles();

    return (
        <>
            <Box sx={{ml:1, width: '90vw'}}>
                <Grid container justifyContent="flex-start" alignItems="centre" className={classes.mt1mb8}>
                    {useOldResult && filteredData && filteredData.map(item => <ResultCardOld data={item}/>)}
                    {!useOldResult && filteredData && filteredData.map(item => <ResultCardNew data={item}/>)}
                </Grid>
            </Box>
        </>
    );

}

export default ResultCardList;