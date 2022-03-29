import React, {useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import data from './data/data.json';
import Box from '@mui/material/Box';
import CategoryOptionsDialog from '../components/CategoryOptionsDialog';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import SearchBarOldVer from '../components/SearchBarOldVer.jsx';
import SearchBarNewVer from '../components/SearchBarNewVer.jsx';
import { allSearchOptions, sportsList } from '../resources/constants';
import ResultCardOld from '../components/ResultCardOld';
import ResultCardNew from '../components/ResultCardNew';

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

    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState('');

    const [openCategoryOptions, setOpenCategoryOptions] = useState(false);
    const [searchCategory, setSearchCategory] = useState();

    const [openSportDialog, setOpenSportDialog] = useState(false); // NEW VERSION
    const [openLocationDialog, setOpenLocationDialog] = useState(false); // NEW VERSION
    const [openFilterDialog, setOpenFilterDialog] = useState(false); // NEW VERSION

    const [openPage, setOpenPage] = useState(false);
    const [hasSearchValues, setHasSearchValues] = useState(false);
    const [options, setOptions] = useState(allSearchOptions);
    const [recentSearchList, setRecentSearchList] = useState(JSON.parse(window.localStorage.getItem('recentSearchList')));

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

    const getQuery = () => {
        const newQuery = new URLSearchParams(location.search).get('query');
        if (sportsList.includes(newQuery)) {
            setSearchCategory('Sport');
        } else {
            setSearchCategory('Venue');
        }
        setQuery(newQuery);
    }

    const filterData = (data) => {
        const tempData = data.filter(data => data.sport === query || data.name === query);
        setFilteredData(tempData);
    }

    useEffect(() => {
        getQuery();
        filterData(data);
    }, [])

    useEffect(() => {
        filterData(data);
    }, [query])

    const closeFilterDialog = type => {
        setOpenFilterDialog(false);
        navigate(-1);

    };

    const doOpenFilterDialog = type => {
        setOpenFilterDialog(true);
        setOpenPage(false);
    };

    return (
        <Box sx={{mt:1}}>
            <Grid container direction="column" justifyContent="centre" alignItems="flex-start" className={classes.fullScreenHeight} width='95%'>
                {/* SEARCH BAR */}
                <Box width="95%">
                    {useOldSearch && (<SearchBarOldVer startSearch={openCategoryOptionsDialog} hasSearchValues={query} doSearch={doSearch} />)}
                    {!useOldSearch && (<SearchBarNewVer startSearch={openCategoryOptionsDialog} closeFilterDialog={closeFilterDialog} openFilterDialog={doOpenFilterDialog} />)}
                </Box>

                {renderCategoryDialog()}


                {/* RESULTS PAGE */}
                <Box sx={{ml:1}}>
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