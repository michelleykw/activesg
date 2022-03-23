import React, {useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import data from './data/data.json';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import swimming from '../static/swimming.jpg';
import CategoryOptionsDialog from '../components/CategoryOptionsDialog';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar.jsx';
import SearchPage from '../pages/SearchPage';
import { sportsList } from '../resources/constants';
import { allSearchOptions } from '../resources/constants.jsx';

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
    const isOldVersion = (versionId == 1) || (versionId == 2);

    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState('');

    const [openCategoryOptions, setOpenCategoryOptions] = useState(false);
    const [searchCategory, setSearchCategory] = useState();

    const [openPage, setOpenPage] = useState(false);
    const [hasSearchValues, setHasSearchValues] = useState(false);
    const [options, setOptions] = useState(allSearchOptions);
    const [recentSearchList, setRecentSearchList] = useState(JSON.parse(window.localStorage.getItem('recentSearchList')));

    const openCategoryOptionsDialog = category => {
        setOpenCategoryOptions(true);
    };

    const closeCategoryOptionsDialog = () => {
        console.log('close');
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

    const goToFacilityViewPage = loc => {
        navigate(`/facilities/view?version=${versionId}&location=${loc}`);
    };

    const renderCard = data => {
        return (
            <Card sx={{ maxWidth: 192, m:1}}>
                <CardActionArea onClick={() => goToFacilityViewPage(data.name)}>
                    <CardMedia
                        component="img"
                        height="90"
                        src = {swimming}
                        alt={data.sport}
                    />
                    <CardContent>
                    <Typography variant="caption" color="text.secondary">
                        {data.sport}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        0.0km
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }

    return (
        <Box sx={{mt:1}}>
            <Grid container direction="column" justifyContent="centre" alignItems="flex-start" className={classes.fullScreenHeight} width='95%'>
                <Box width="95%">
                    {isOldVersion && (
                        <SearchBar startSearch={openCategoryOptionsDialog} hasSearchValues={query} />
                    )}
                </Box>

                <Box sx={{ml:1}}>
                    <Grid container justifyContent="flex-start" alignItems="centre" className={classes.mt1mb8}>
                        {filteredData && filteredData.map(item => renderCard(item))}
                    </Grid>
                </Box>


                {(!filteredData || filteredData.length === 0) && <Typography>There are no results found.</Typography>}
                {renderCategoryDialog()}
            </Grid>
        </Box>
    );
}

export default ResultPage;