import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import AppButton from '../components/AppButton';
import CategoryOptionsDialog from '../components/CategoryOptionsDialog';
import RecentSearch from '../components/RecentSearch';
import SearchBar from '../components/SearchBar';
import SearchList from '../components/SearchList';
import sportsList from '../resources/constants';
import venueList from '../resources/constants';

const useStyles = makeStyles(theme => ({
    mr1: {
        marginRight: `${theme.spacing(1)} !important`
    },
    mt1: {
        marginTop: `${theme.spacing(1)} !important`
    },
    mt2: {
        marginTop: `${theme.spacing(2)} !important`
    },
    mx2: {
        marginLeft: `${theme.spacing(2)} !important`,
        marginRight: `${theme.spacing(2)} !important`
    },
    px2: {
        paddingLeft: '2rem !important',
        paddingRight: '2rem !important'
    },
    searchContainer: {
        maxHeight: 'calc(100vh - 9rem) !important'
    }
}));

// Perhaps can change this to a dialog (fullscreen) instead

function SearchPage({ openPage, handleClosePage, isOldVersion, recentSearchList, startSearch, resetSearchInput, cancelSearch, doSearch, removeRecentSearch, hasSearchValues, updateHasSearchValues, searchOptions, updateSearchOptions }) {
    const classes = useStyles();
    const searchInput = useRef(null);

    const [openCategoryOptions, setOpenCategoryOptions] = useState(false);
    const [searchCategory, setSearchCategory] = useState();

    useEffect(() => {
    }, [recentSearchList, hasSearchValues, searchOptions, openCategoryOptions, searchCategory]);

    const doRecentSearch = item => {
        doSearch(item);
        searchInput.current.value = item;
    };

    const openCategoryOptionsDialog = category => {
        setOpenCategoryOptions(true);
        setSearchCategory(category);
    };

    const closeCategoryOptionsDialog = () => {
        setOpenCategoryOptions(false);
        setSearchCategory(null);
    };

    const renderSearchBar = () => {
        return (
            <SearchBar
                isSearching
                startSearch={startSearch}
                resetSearchInput={resetSearchInput}
                cancelSearch={cancelSearch}
                doSearch={doSearch}
                searchInput={searchInput}
                hasSearchValues={hasSearchValues}
                updateHasSearchValues={updateHasSearchValues}
                updateSearchOptions={updateSearchOptions}
            />
        );
    };

    const renderCategoryButtons = () => {
        return (
            <Grid container item className={`${classes.mt1} ${classes.mx2}`}>
                <AppButton
                    content="Sports"
                    className={`${classes.px2} ${classes.mr1}`}
                    onClick={() => openCategoryOptionsDialog('Sport')}
                />
                <AppButton
                    content="Venue"
                    onClick={() => openCategoryOptionsDialog('Venue')}
                    className={`${classes.px2} ${classes.mr1}`}
                />
            </Grid>
        );
    };

    const renderRecentSearch = () => {
        return (
            <Grid container item className={classes.mt1}>
                <RecentSearch
                    recentSearchList={recentSearchList}
                    removeRecentSearch={removeRecentSearch}
                    doRecentSearch={doRecentSearch}
                />
            </Grid>
        );
    };

    const renderSearchList = () => {
        return (
            <Grid container item className={classes.searchContainer}>
                <SearchList list={searchOptions} search={doRecentSearch} />
            </Grid>
        );
    };

    const renderCategoryDialog = () => {
        return (
            <CategoryOptionsDialog
                doSearch={doRecentSearch}
                category={searchCategory}
                open={openCategoryOptions}
                fullScreen
                handleClose={closeCategoryOptionsDialog}
            />
        );
    };

    return (
        <Dialog
            fullScreen
            open={openPage}
            onClose={handleClosePage}
        >
            <Grid container alignItems="flex-start" justifyContent="flex-start" className={classes.mt2}>
                {isOldVersion && renderSearchBar()}
                {!hasSearchValues && isOldVersion && renderCategoryButtons()}
                {!hasSearchValues && recentSearchList && recentSearchList.length > 0 && renderRecentSearch()}
                {hasSearchValues && renderSearchList()}
                {renderCategoryDialog()}
            </Grid>
        </Dialog>
    );
}

export default SearchPage;