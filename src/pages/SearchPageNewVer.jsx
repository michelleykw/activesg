import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogHeaderNew from '../components/DialogHeaderNew';
import SearchBarNewVer from '../components/SearchBarNewVer';
import RecentSearchNewVer from '../components/RecentSearchNewVer';
import SearchListNewVer from '../components/SearchListNewVer';
import { sendNetworkLog } from '../logging/logging.js';

const useStyles = makeStyles(theme => ({
    mr1: {
        marginRight: `${theme.spacing(1)} !important`
    },
    mt1: {
        marginTop: `${theme.spacing(1)} !important`
    },
    mt10: {
        marginTop: `${theme.spacing(10)} !important`
    },
    mx2: {
        marginLeft: `${theme.spacing(2)} !important`,
        marginRight: `${theme.spacing(2)} !important`
    },
    px2: {
        paddingLeft: `${theme.spacing(2)} !important`,
        paddingRight: `${theme.spacing(2)} !important`
    },
    searchContainer: {
        maxHeight: 'calc(100vh - 9rem) !important',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

function SearchPageNewVer({ versionId, openPage, handleClosePage, recentSearchList, startSearch, resetSearchInput, doSearch, removeRecentSearch, hasSearchValues, updateHasSearchValues, searchOptions, updateSearchOptions }) {
    const classes = useStyles();
    const theme = useTheme();
    const searchInput = useRef(null);

    useEffect(() => {
    }, [recentSearchList, hasSearchValues, searchOptions]);

    const doRecentSearch = item => {
        doSearch(item);
        searchInput.current.value = item;
        sendNetworkLog('Clicked on: Recent Search Item', `Recent Search Item - ${item}`, `Search: ${item}`, versionId);
    };

    const renderSearchBar = () => {
        return (
            <SearchBarNewVer 
                showFilter={false}
                startSearch={startSearch} 
                resetSearchInput={resetSearchInput}
                doSearch={doSearch}
                searchInput={searchInput}
                hasSearchValues={hasSearchValues}
                updateHasSearchValues={updateHasSearchValues}
                updateSearchOptions={updateSearchOptions}
            />
        );
    };

    const renderRecentSearch = () => {
        return (
            <RecentSearchNewVer
                recentSearchList={recentSearchList}
                removeRecentSearch={removeRecentSearch}
                doRecentSearch={doRecentSearch}
            />
        );
    };

    const renderSearchList = () => {
        return (
            <Grid container item className={classes.searchContainer}>
                <SearchListNewVer list={searchOptions} search={doRecentSearch} /> 
            </Grid>
        );
    };

    return (
        <Dialog
            fullScreen
            open={openPage}
            onClose={handleClosePage}
        >
            <DialogHeaderNew header='Search' handleClose={handleClosePage} />
            <Grid container alignItems="flex-start" justifyContent="flex-start" className={classes.mt10}>
                {renderSearchBar()}
                {!hasSearchValues && recentSearchList && recentSearchList.length > 0 && renderRecentSearch()}
                {hasSearchValues && renderSearchList()}
            </Grid>
        </Dialog>
    );
}

export default SearchPageNewVer;