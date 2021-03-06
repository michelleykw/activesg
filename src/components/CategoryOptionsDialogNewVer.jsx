import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Dialog, Grid } from '@mui/material';
import { categoryOptionsMap } from '../resources/constants.jsx';
import DialogHeaderNew from '../components/DialogHeaderNew';
import SearchListNewVer from '../components/SearchListNewVer';
import SearchBarNewVer from './SearchBarNewVer.jsx';

const useStyles = makeStyles(theme => ({
    mt10: {
        marginTop: theme.spacing(10)
    }
}));

function CategoryOptionsDialogNewVer({ category, list, doSearch, open, handleClose, hasSearchValues, updateHasSearchValues, updateSearchOptions, resetSearchInput }) {
    const classes = useStyles();
    const searchInput = useRef(null);    

    useEffect(() => {
        
    }, [list]);


    const handleCloseDialog = () => {
        resetSearchInput();
        handleClose(category);
    };

    const doRecentSearch = item => {
        doSearch(item);
        searchInput.current.value = item;
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
        >
            <DialogHeaderNew header={category} handleClose={handleCloseDialog} />
            <Grid container className={classes.mt10}>
                <SearchBarNewVer 
                    type={category}
                    showFilter={false} 
                    doSearch={doSearch} 
                    searchInput={searchInput}
                    hasSearchValues={hasSearchValues}
                    updateHasSearchValues={updateHasSearchValues}
                    resetSearchInput={resetSearchInput}
                    updateSearchOptions={updateSearchOptions}
                />
                <SearchListNewVer list={list} search={doRecentSearch} hasSearchValues={hasSearchValues} fullScreen type={category} /> 
            </Grid>
      </Dialog>
    );
}

export default CategoryOptionsDialogNewVer;
