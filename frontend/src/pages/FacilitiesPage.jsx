import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SearchPage from './SearchPage';
import SearchBar from '../components/SearchBar.jsx';
import { allSearchOptions } from '../resources/constants.jsx';


const useStyles = makeStyles(theme => ({
    container: {
        minHeight: 'calc(100vh - 56px)',
        paddingTop: theme.spacing(2)
    }
}));

function FacilitiesPage() {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const versionId = new URLSearchParams(location.search).get('version') || 1;

    const isOldVersion = (versionId == 1) || (versionId == 2);

    const [openPage, setOpenPage] = useState(false);
    const [hasSearchValues, setHasSearchValues] = useState(false);
    const [options, setOptions] = useState(allSearchOptions);
    const [recentSearchList, setRecentSearchList] = useState(JSON.parse(window.localStorage.getItem('recentSearchList')));

    useEffect(() => {
        if (window.localStorage.getItem('recentSearchList') === null) {
            window.localStorage.setItem('recentSearchList', JSON.stringify([]));
        }
    }, [recentSearchList, options]);

    const goToSearchResultPage = searchInput => {
        navigate(`/facilities/result?version=${versionId}&query=${searchInput}`);
    };

    const resetSearchInput = () => {
        setHasSearchValues(false);
        setOptions(allSearchOptions);
    };

    const updateRecentSearch = (newSearch) => {
        if (newSearch.length > 0) {
            updateHasSearchValues(newSearch);
            const recentSearchList = JSON.parse(window.localStorage.getItem('recentSearchList'));
            if (!recentSearchList.includes(newSearch)) {
                recentSearchList.unshift(newSearch);
            } else if (recentSearchList.includes(newSearch)) {
                const index = recentSearchList.indexOf(newSearch);
                recentSearchList.splice(index, 1);
                recentSearchList.unshift(newSearch);
            }
            window.localStorage.setItem('recentSearchList', JSON.stringify(recentSearchList));
            setRecentSearchList(JSON.parse(window.localStorage.getItem('recentSearchList')));
        }
    };

    const doSearch = input => {
        updateSearchOptions(input)
        updateRecentSearch(input);
        setRecentSearchList(JSON.parse(window.localStorage.getItem('recentSearchList')));
        goToSearchResultPage(input);
    };

    const removeRecentSearch = item => {
        const recentSearchList = JSON.parse(window.localStorage.getItem('recentSearchList'));
        const newRecentSearchList = recentSearchList.filter(e => e != item);
        window.localStorage.setItem('recentSearchList', JSON.stringify(newRecentSearchList));
        setRecentSearchList(JSON.parse(window.localStorage.getItem('recentSearchList')));
        updateHasSearchValues(false);
    }

    const updateHasSearchValues = input => {
        setHasSearchValues(input && input.length > 0);
    };

    const updateSearchOptions = searchInput => {
        setOptions(allSearchOptions.filter(item => item.toLowerCase().includes(searchInput.toLowerCase())));
    };

    
    const openSearchPage = () => {
        setOpenPage(true);
    };
    const closeSearchPage = () => {
        resetSearchInput();
        setOpenPage(false);
    };

    return (
        <Grid container alignItems="flex-start" justifyContent="center" className={classes.container}>
            {isOldVersion && (
                <SearchBar startSearch={openSearchPage} />
            )}
            <SearchPage 
                openPage={openPage}
                cancelSearch={closeSearchPage}
                isOldVersion={isOldVersion} 
                recentSearchList={recentSearchList}
                resetSearchInput={resetSearchInput}
                doSearch={doSearch}
                removeRecentSearch={removeRecentSearch}
                hasSearchValues={hasSearchValues}
                updateHasSearchValues={updateHasSearchValues}
                searchOptions={options}
                updateSearchOptions={updateSearchOptions}
            />
            <Typography>Welcome to Facilities Page. Start searching now!</Typography>
        </Grid>
    );
}

export default FacilitiesPage;