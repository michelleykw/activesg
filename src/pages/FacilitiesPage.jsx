import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SearchPageOldVer from './SearchPageOldVer';
import SearchPageNewVer from './SearchPageNewVer';
import AppIconButton from '../components/AppIconButton.jsx';
import SearchBarOldVer from '../components/SearchBarOldVer.jsx';
import SearchBarNewVer from '../components/SearchBarNewVer.jsx';
import FilterDialogOldVer from '../components/FilterDialogOldVer.jsx';
import FilterDialogNewVer from '../components/FilterDialogNewVer.jsx';
import CategoryOptionsDialogNewVer from '../components/CategoryOptionsDialogNewVer';
import { allSearchOptions, categoryOptionsMap } from '../resources/constants.jsx';
import { sendNetworkLog } from '../logging/logging.js';

const useStyles = makeStyles(theme => ({
    container: {
        // minHeight: 'calc(100vh - 56px)',
        paddingTop: theme.spacing(2)
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    mHalf: {
        margin: theme.spacing(0.5)
    },
    py4: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    p4: {
        padding: theme.spacing(4)
    },
    pt1: {
        paddingTop: theme.spacing(1)
    }
}));

function FacilitiesPage() {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    const versionId = new URLSearchParams(location.search).get('version') || 1;

    const searchInputNew = useRef(null);

    const isOldVersion = (versionId == 1) || (versionId == 2);
    const LOCATION_TITLE = 'Location';
    const SPORT_TITLE = 'Sport';

    const [openSportDialog, setOpenSportDialog] = useState(false); // NEW VERSION
    const [openLocationDialog, setOpenLocationDialog] = useState(false); // NEW VERSION
    const [openFilterDialog, setOpenFilterDialog] = useState(false); // NEW VERSION

    let listOptions = allSearchOptions; // categoryOptionsMap['Venue'] -- use the venue list instead as the name of the facilities
    if (openSportDialog) {
        listOptions = (categoryOptionsMap[SPORT_TITLE]);
    } else if (openLocationDialog) {
        listOptions = (categoryOptionsMap[LOCATION_TITLE]);
    }

    const [openPage, setOpenPage] = useState(false);
    const [hasSearchValues, setHasSearchValues] = useState(false);
    const [options, setOptions] = useState(listOptions);
    const [recentSearchList, setRecentSearchList] = useState(JSON.parse(window.localStorage.getItem('recentSearchList')));

    useEffect(() => {
        if (window.localStorage.getItem('recentSearchList') === null) {
            window.localStorage.setItem('recentSearchList', JSON.stringify([]));
        }
        if (openFilterDialog && openPage) {
            setOpenPage(false);
        }
    }, [recentSearchList, options, openFilterDialog, openPage]);

    const goToSearchResultPage = searchInput => {
        navigate(`/activesg/facilities/result?version=${versionId}&query=${searchInput}`);
    };

    const resetSearchInput = () => {
        setHasSearchValues(false);
        setOptions(listOptions);
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
        sendNetworkLog('Clicked on: Clear Icon (Recent Search)', 'Clear Icon (Recent Search)', `Clear Recent Search for: ${item}`, versionId);
    };

    const updateHasSearchValues = input => {
        setHasSearchValues(input && input.length > 0);
    };

    const updateSearchOptions = searchInput => {
        if (listOptions && listOptions[0] && typeof listOptions[0] === 'string') {
            setOptions(listOptions.filter(item => item.toLowerCase().includes(searchInput.toLowerCase())));
        } else {
            const newListOptions = [];
            listOptions.map(item => {
                const result = item?.facilities?.filter(f => f.toLowerCase().includes(searchInput.toLowerCase()));
                if (result.length > 0) {
                    newListOptions.push({
                        area: item.area,
                        facilities: result
                    });
                }
            });
            setOptions(newListOptions);
        }
    };

    const openSearchPage = () => {
        setOpenPage(true);
        sendNetworkLog('Clicked on: Search Bar', 'Search Bar', 'Opening Search Page from Facilities Page', versionId);
    };

    const closeSearchPage = () => {
        resetSearchInput();
        setOpenPage(false);
        sendNetworkLog('Clicked on: Close Icon (Search Page)', 'Close Icon (Search Page)', 'Closing Search Page back to Facilities Page', versionId);
    };

    /* OLD VERSION OF FACILITIES PAGE (1 & 2) */
    if (isOldVersion) {
        return (
            <Grid container alignItems="flex-start" justifyContent="center" className={classes.container}>
                <SearchBarOldVer startSearch={openSearchPage} doSearch={doSearch}/>
                <SearchPageOldVer
                    versionId={versionId}
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
            </Grid>
        );
    };

    

    /* NEW VERSION OF FACILITIES PAGE (3 & 4) */
    const doOpenCategoryDialog = type => {
        sendNetworkLog(`Clicked on: Category Icon Button - ${type}`, `Category Icon Button - ${type}`, `Opening ${type} Dialog`, versionId);
        if (type == SPORT_TITLE) {
            setOpenSportDialog(true);
            setOptions(categoryOptionsMap[SPORT_TITLE]);
        } else if (type == LOCATION_TITLE) {
            setOpenLocationDialog(true);
            setOptions(categoryOptionsMap[LOCATION_TITLE]);
        }
    };

    const closeCategoryDialog = type => {
        sendNetworkLog(`Clicked on: Back Icon (${type} Dialog)`, `Back Icon (${type} Dialog)`, `Closing ${type} Dialog`, versionId);
        setOptions(allSearchOptions);
        if (openSportDialog) {
            setOpenSportDialog(false);
        } else if (openLocationDialog) {
            setOpenLocationDialog(false);
        }
    };

    const doOpenFilterDialog = type => {
        sendNetworkLog('Clicked on: Filter Icon on Search Bar', 'Filter Icon', 'Opening Filter Dialog', versionId);
        setOpenFilterDialog(true);
        setOpenPage(false);
    };

    const closeFilterDialog = type => {
        sendNetworkLog('Clicked on: Back Icon (Filter Dialog)', 'Back Icon (Filter Dialog)', 'Closing Filter Dialog', versionId);
        setOpenFilterDialog(false);
    };

    const renderHeaderNew = () => {
        return (
            <Grid item xs={12} className={`${classes.textAlignCenter} ${classes.py4}`}>
                <Typography variant="h1" color="textSecondary">Hi, User.</Typography>
                <Typography color="textSecondary" className={classes.pt1}>
                    What would you like to do today?
                </Typography>
            </Grid>
        );
    };

    const renderSearchNew = () => {
        return (
            <Grid item xs={12} className={`${classes.textAlignCenter}`}>
                <SearchBarNewVer startSearch={openSearchPage} closeFilterDialog={closeFilterDialog} openFilterDialog={doOpenFilterDialog} />
                <SearchPageNewVer
                    versionId={versionId}
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
        return <AppIconButton onClick={() => {
            doOpenCategoryDialog(name);
            sendNetworkLog('Clicked on: Category Icon Button', `Category Button (${name})`, '', versionId);
        }} name={name} icon={icon} />;
    };

    const renderCategoryButtons = () => {
        return (
            <Grid container item justifyContent='space-evenly' xs={12} className={`${classes.p4}`}>
                <Grid item>
                    {renderCategoryButton(LOCATION_TITLE, <LocationOnIcon fontSize='large' className={classes.mHalf} />)}
                </Grid>
                <Grid item>
                    {renderCategoryButton(SPORT_TITLE, <SportsSoccerIcon fontSize='large' className={classes.mHalf} />)}
                </Grid>
            </Grid>
        );
    };

    const renderCategoryDialog = type => {
        return (
            <CategoryOptionsDialogNewVer
                doSearch={doSearch}
                category={type}
                list={options}
                open={(type == SPORT_TITLE && openSportDialog) || (type == LOCATION_TITLE && openLocationDialog)}
                handleClose={closeCategoryDialog}
                hasSearchValues={hasSearchValues}
                updateHasSearchValues={updateHasSearchValues}
                updateSearchOptions={updateSearchOptions}
                resetSearchInput={resetSearchInput}
            />
        );
    };

    return (
        <Grid container className={classes.container}>
            {renderHeaderNew()}
            {renderSearchNew()}
            {renderCategoryButtons()}
            {renderCategoryDialog(LOCATION_TITLE)}
            {renderCategoryDialog(SPORT_TITLE)}
            {<FilterDialogNewVer open={openFilterDialog} handleClose={closeFilterDialog} versionId={versionId} />}
        </Grid>
    );
}

export default FacilitiesPage;