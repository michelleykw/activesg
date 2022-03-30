import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import data from './data/data.json';
import Box from '@mui/material/Box';
import CategoryOptionsDialog from '../components/CategoryOptionsDialog';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { allSearchOptions, sportsList, categoryOptionsMap } from '../resources/constants';
import ResultCardOld from '../components/ResultCardOld';
import ResultCardNew from '../components/ResultCardNew';

import AppIconButton from '../components/AppIconButton.jsx';
import SearchBarOldVer from '../components/SearchBarOldVer.jsx';
import SearchBarNewVer from '../components/SearchBarNewVer.jsx';
import SearchPageOldVer from './SearchPageOldVer';
import SearchPageNewVer from './SearchPageNewVer';
import FilterDialogNewVer from '../components/FilterDialogNewVer.jsx';
import ResultCardList from '../components/ResultCardList';

const useStyles = makeStyles(theme => ({
    fullScreenHeight: {
        minHeight: "100vh"
    }
}));

function ResultPage() {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();

    const versionId = new URLSearchParams(location.search).get('version') || 1;
    const useOldSearch = (versionId == 1) || (versionId == 2);
    const useOldResult = (versionId == 2) || (versionId == 4);

    const [query, setQuery] = useState('');
    const [available, setAvailable] = useState(true);
    const [facilityLocations, setFacilityLocations] = useState([]);
    const [sports, setSports] = useState([]);
    const [venue, setVenue] = useState([]);
    const [dateRange, setDateRange] = useState({});
    const [filteredData, setFilteredData] = useState([]);

    const [openCategoryOptions, setOpenCategoryOptions] = useState(false);
    const [searchCategory, setSearchCategory] = useState();

    const [openSportDialog, setOpenSportDialog] = useState(false); // NEW VERSION
    const [openLocationDialog, setOpenLocationDialog] = useState(false); // NEW VERSION
    const [openFilterDialog, setOpenFilterDialog] = useState(false); // NEW VERSION

    const [openPage, setOpenPage] = useState(false);
    const [hasSearchValues, setHasSearchValues] = useState(false);
    const [options, setOptions] = useState(allSearchOptions);
    const [recentSearchList, setRecentSearchList] = useState(JSON.parse(window.localStorage.getItem('recentSearchList')));

    // RESULTS PAGE FILTER METHODS
    const resetNewQueries = () => {
        setAvailable(true);
        setFacilityLocations([]);
        setSports([]);
        setVenue([]);
        setDateRange({});
    }

    const resetOldQueries = () => {
        setQuery('');
    }

    const handleStringQuery = (newQuery) => {
        resetNewQueries();
        if (sportsList.includes(newQuery)) {
            setSearchCategory('Sport');
        } else {
            setSearchCategory('Venue');
        }
        setQuery(newQuery);
    }

    const handleObjectQuery = (newQuery) => {
        resetOldQueries();
        setAvailable(newQuery.Availability);
        setFacilityLocations(newQuery.Location);
        setSports(newQuery.Sports);
        setVenue(newQuery.Venue);
        setDateRange(newQuery.dateRange[0]);
    }

    const getQuery = () => {
        let newQuery = new URLSearchParams(location.search).get('query');
        try{
            newQuery = JSON.parse(newQuery);
            handleObjectQuery(newQuery);
        } catch (error) {
            handleStringQuery(newQuery);
        }
    }

    const filterOldQuery = () => {
        let tempData = [...data];
        tempData = tempData.filter(item => item.sport === query || item.name === query);
        setFilteredData(tempData);
        console.log(filteredData);
    }

    const filterNewQuery = () => {
        let tempData = [...data];
        const isAccepted = (item) => {
            let isLocationOK = facilityLocations.length > 0 ? facilityLocations.find(ele => ele === item.area) : true;
            if (isLocationOK === undefined) {
                isLocationOK = false;
            }
            const isSportOK = sports.length > 0 ? sports.includes(item.sport) : true;
            // const isVenueOK = venue.length > 0 ? venue.includes(item.name) : true;

            const isAvailable = available;

            return isLocationOK && isSportOK && isAvailable;
        }
        tempData = tempData.filter(data => isAccepted(data));
        setFilteredData(tempData);
        // console.log(filteredData);
    }

    const filterData = () => {
        if (query !== '') {
            // console.log('hi am here');
            filterOldQuery();
        } else {
            filterNewQuery();
        }
    }

    useEffect(() => {
        getQuery();
        filterData();
    }, [])

    useEffect(() => {
        getQuery();
        filterData();
    }, [location])

    useEffect(() => {
        // console.log('queryChanged');
        // console.log(query);
        filterData();
    }, [query])

    useEffect(() => {
        filterData();
    }, [available, facilityLocations, sports, venue, dateRange])


    // ------------------ SEARCH BAR STUFF ------------------ //
    const openCategoryOptionsDialog = category => {
        setOpenCategoryOptions(true);
    };

    const closeCategoryOptionsDialog = () => {
        // console.log('closeCategoryOptions');
        setOpenCategoryOptions(false);
        // navigate(-1);
    };

    const updateSearchOptions = searchInput => {
        setOptions(allSearchOptions.filter(item => item.toLowerCase().includes(searchInput.toLowerCase())));
    };

    const goToSearchResultPage = searchInput => {
        navigate(`/activesg/facilities/result?version=${versionId}&query=${searchInput}`);
    };

    const updateHasSearchValues = input => {
        setHasSearchValues(input && input.length > 0);
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
        console.log('doSearch', input);
        updateSearchOptions(input)
        updateRecentSearch(input);
        setRecentSearchList(JSON.parse(window.localStorage.getItem('recentSearchList')));
        goToSearchResultPage(input);
        setQuery(input);
        closeCategoryOptionsDialog();
        // closeCategoryDialog();
        // closeFilterDialog();
        closeSearchPage();
    };

    const renderCategoryDialog = () => {
        return (
            <CategoryOptionsDialog
                doSearch={doSearch}
                category={searchCategory}
                open={openCategoryOptions}
                fullScreen
                handleClose={closeCategoryOptionsDialog}
            />
        );
    };

    const closeFilterDialog = searchInput => {
        setOpenFilterDialog(false);
        resetOldQueries();
    };

    const doOpenFilterDialog = type => {
        setOpenFilterDialog(true);
        setOpenPage(false);
    };

    const searchInputNew = useRef(null);

    const LOCATION_TITLE = 'Location';
    const SPORT_TITLE = 'Sport';

    let listOptions = allSearchOptions; // categoryOptionsMap['Venue'] -- use the venue list instead as the name of the facilities
    if (openSportDialog) {
        listOptions = (categoryOptionsMap[SPORT_TITLE]);
    } else if (openLocationDialog) {
        listOptions = (categoryOptionsMap[LOCATION_TITLE]);
    }

    useEffect(() => {
        if (window.localStorage.getItem('recentSearchList') === null) {
            window.localStorage.setItem('recentSearchList', JSON.stringify([]));
        }
        if (openFilterDialog && openPage) {
            setOpenPage(false);
        }
    }, [recentSearchList, options, openFilterDialog, openPage]);

    const resetSearchInput = () => {
        setHasSearchValues(false);
        setOptions(listOptions);
    };

    const removeRecentSearch = item => {
        const recentSearchList = JSON.parse(window.localStorage.getItem('recentSearchList'));
        const newRecentSearchList = recentSearchList.filter(e => e != item);
        window.localStorage.setItem('recentSearchList', JSON.stringify(newRecentSearchList));
        setRecentSearchList(JSON.parse(window.localStorage.getItem('recentSearchList')));
        updateHasSearchValues(false);
    };

    const openSearchPage = () => {
        setOpenPage(true);
    };

    const closeSearchPage = () => {
        // console.log('closing...');
        resetSearchInput();
        setOpenPage(false);
    };

    /* OLD VERSION OF FACILITIES PAGE (1 & 2) */
    const renderSearchOld = () => {
        console.log("--> renderSearchOld");
        return (
            <Grid container alignItems="flex-start" justifyContent="center" className={classes.container}>
                <SearchBarOldVer startSearch={openCategoryOptionsDialog} isResultPage={true} doSearch={doSearch}/>
                <SearchPageOldVer
                    openPage={openPage}
                    cancelSearch={closeSearchPage}
                    isOldVersion={useOldSearch}
                    recentSearchList={recentSearchList}
                    resetSearchInput={resetSearchInput}
                    doSearch={doSearch}
                    removeRecentSearch={removeRecentSearch}
                    hasSearchValues={hasSearchValues}
                    updateHasSearchValues={updateHasSearchValues}
                    searchOptions={options}
                    updateSearchOptions={updateSearchOptions}
                />
            </Grid>
        );
    }

    /* NEW VERSION OF FACILITIES PAGE (3 & 4) */
    const doOpenCategoryDialog = type => {
        if (type == SPORT_TITLE) {
            setOpenSportDialog(true);
            setOptions(categoryOptionsMap[SPORT_TITLE]);
        } else if (type == LOCATION_TITLE) {
            setOpenLocationDialog(true);
            setOptions(categoryOptionsMap[LOCATION_TITLE]);
        }
    };

    const closeCategoryDialog = type => {
        setOptions(allSearchOptions);
        if (openSportDialog) {
            setOpenSportDialog(false);
        } else if (openLocationDialog) {
            setOpenLocationDialog(false);
        }
    };

    const renderSearchNew = () => {
        return (
            <Grid item xs={12} className={`${classes.textAlignCenter}`}>
                <SearchBarNewVer startSearch={openSearchPage} closeFilterDialog={closeFilterDialog} openFilterDialog={doOpenFilterDialog} />
                <SearchPageNewVer
                    openPage={openPage}
                    handleClosePage={closeSearchPage}
                    recentSearchList={recentSearchList}
                    resetSearchInput={resetSearchInput}
                    doSearch={doSearch}
                    removeRecentSearch={removeRecentSearch}
                    hasSearchValues={hasSearchValues}
                    updateHasSearchValues={updateHasSearchValues}
                    searchOptions={options}
                    updateSearchOptions={updateSearchOptions}
                />
            </Grid>
        );
    };

    const renderCategoryButton = (name, icon) => {
        return <AppIconButton onClick={() => {doOpenCategoryDialog(name)}} name={name} icon={icon} />;
    };

    return (
        <Box sx={{mt:1, mb:6}}>
            <Grid container direction="column" justifyContent="centre" alignItems="flex-start" className={classes.fullScreenHeight} width='100%'>
                {/* SEARCH BAR */}
                <Box width="95%">
                    {/* {useOldSearch && (<SearchBarOldVer startSearch={openCategoryOptionsDialog} hasSearchValues={query} doSearch={doSearch} />)}
                    {!useOldSearch && (<SearchBarNewVer startSearch={openCategoryOptionsDialog} closeFilterDialog={closeFilterDialog} openFilterDialog={doOpenFilterDialog} />)} */}

                    {useOldSearch && renderSearchOld()}
                    {!useOldSearch && renderSearchNew()}
                </Box>

                {/* {renderCategoryDialog()} */}
                {renderCategoryDialog(LOCATION_TITLE)}
                {renderCategoryDialog(SPORT_TITLE)}
                {<FilterDialogNewVer open={openFilterDialog} handleClose={closeFilterDialog} versionId={versionId} />}


                {/* RESULTS PAGE */}
                <ResultCardList useOldResult={useOldResult} filteredData={filteredData} />


                {(!filteredData || filteredData.length === 0) &&
                    <Grid container alignItems='center' justifyContent='center' sx={{width: 1}} minHeight='150px'>
                        <Typography>There are no results found.</Typography>
                    </Grid>
                }

            </Grid>
        </Box>
    );
}

export default ResultPage;