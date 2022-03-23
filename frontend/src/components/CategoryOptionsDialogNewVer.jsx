import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const searchInput = useRef(null);    

    const handleCloseDialog = () => {
        resetSearchInput();
        handleClose();
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
                    showFilter={false} 
                    doSearch={doSearch} 
                    searchInput={searchInput}
                    hasSearchValues={hasSearchValues}
                    updateHasSearchValues={updateHasSearchValues}
                    resetSearchInput={resetSearchInput}
                    updateSearchOptions={updateSearchOptions}
                />
                <SearchListNewVer list={list} search={doSearch} type={category} /> 
            </Grid>
      </Dialog>
    );
}

export default CategoryOptionsDialogNewVer;
