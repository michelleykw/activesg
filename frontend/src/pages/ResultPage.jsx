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
import FilterDialogNewVer from '../components/FilterDialogNewVer.jsx';

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

    const filterOldQuery = (data) => {
        const tempData = data.filter(data => data.sport === query || data.name === query);
        setFilteredData(tempData);
    }

    const filterNewQuery = (data) => {
        let tempData = data;
        const isAccepted = (item) => {
            let isLocationOK = facilityLocations.length > 0 ? facilityLocations.find(ele => ele === item.area) : true;
            if (isLocationOK === undefined) {
                isLocationOK = false;
            }
            const isSportOK = sports.length > 0 ? sports.includes(item.sport) : true;

            const isAvailable = available;

            return isLocationOK && isSportOK && isAvailable;
        }
        tempData = data.filter(data => isAccepted(data));
        setFilteredData(tempData);
    }

    const filterData = (data) => {
        if (query !== '') {
            filterOldQuery(data);
        } else {
            filterNewQuery(data);
        }
    }

    useEffect(() => {
        getQuery();
        filterData(data);
    }, [])

    useEffect(() => {
        filterData(data);
    }, [query, available, facilityLocations, sports, dateRange])


    // ------------------ SEARCH BAR STUFF ------------------ //
    const openCategoryOptionsDialog = category => {
        setOpenCategoryOptions(true);
    };

    const closeCategoryOptionsDialog = () => {
        setOpenCategoryOptions(false);
        navigate(-1);
    };

    const updateSearchOptions = searchInput => {
        setOptions(allSearchOptions.filter(item => item.toLowerCase().includes(searchInput.toLowerCase())));
    };

    const goToSearchResultPage = searchInput => {
        navigate(`/facilities/result?version=${versionId}&query=${searchInput}`);
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
        updateSearchOptions(input)
        updateRecentSearch(input);
        setRecentSearchList(JSON.parse(window.localStorage.getItem('recentSearchList')));
        goToSearchResultPage(input);
        setQuery(input);
        closeCategoryOptionsDialog();
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

    const closeFilterDialog = type => {
        setOpenFilterDialog(false);
        navigate(-1);

    };

    const doOpenFilterDialog = type => {
        setOpenFilterDialog(true);
        setOpenPage(false);
    };

    const searchInputNew = useRef(null);

    const isOldVersion = (versionId == 1) || (versionId == 2);
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
        resetSearchInput();
        setOpenPage(false);
    };

    /* OLD VERSION OF FACILITIES PAGE (1 & 2) */
    const renderSearchOld = () => {
        return (
            <Grid container alignItems="flex-start" justifyContent="center" className={classes.container}>
                <SearchBarOldVer startSearch={openCategoryOptionsDialog} />
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
            </Grid>
        );
    };

    const renderCategoryButton = (name, icon) => {
        return <AppIconButton onClick={() => {doOpenCategoryDialog(name)}} name={name} icon={icon} />;
    };

    return (
        <Box sx={{mt:1}}>
            <Grid container direction="column" justifyContent="centre" alignItems="flex-start" className={classes.fullScreenHeight} width='100%'>
                {/* SEARCH BAR */}
                <Box width="95%">
                    {useOldSearch && renderSearchOld()}
                    {!useOldSearch && renderSearchNew()}
                </Box>

                {renderCategoryDialog()}
                {renderCategoryDialog(LOCATION_TITLE)}
                {renderCategoryDialog(SPORT_TITLE)}
                {<FilterDialogNewVer open={openFilterDialog} handleClose={closeFilterDialog} versionId={versionId} />}


                {/* RESULTS PAGE */}
                <Box sx={{ml:1, width: '90vw'}}>
                    <Grid container justifyContent="flex-start" alignItems="centre" className={classes.mt1mb8}>
                        {useOldResult && filteredData && filteredData.map(item => <ResultCardOld data={item}/>)}
                        {!useOldResult && filteredData && filteredData.map(item => <ResultCardNew data={item}/>)}
                    </Grid>
                </Box>


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