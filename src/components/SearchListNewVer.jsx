import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AppIconButton from '../components/AppIconButton.jsx';
import SearchItemNew from '../components/SearchItemNew.jsx';
import BadmintonIcon from '../resources/BadmintonIcon.jsx';
import { sendNetworkLog } from '../logging/logging.js';

const useStyles = makeStyles(theme => ({
    px2: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    sectionTitle: {
        paddingTop:  theme.spacing(2),
        paddingBottom:  theme.spacing(1),
        fontWeight: '600 !important'
    },
    px1: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    row: {
        paddingBottom:  theme.spacing(1.5),
        paddingTop:  theme.spacing(1.5),
        borderBottom: `1px solid ${theme.palette.background.midGrey}`
    },
    mt1mb8: {
        marginTop:  theme.spacing(0.5),
        paddingBottom: `${theme.spacing(7)} !important`
    },
    mHalf: {
        margin: theme.spacing(0.5)
    },
    py2: {
        paddingTop: theme.spacing(1.25),
        paddingBottom: theme.spacing(2.75)
    }
}));

function SearchListNewVer({ type, list, search, fullScreen=false, hasSearchValues }) {
    const classes = useStyles();
    const location = useLocation();
    const versionId = new URLSearchParams(location.search).get('version');

    const renderRow = searchItem => {
        return (
            <Grid container onClick={() => {
                search(searchItem);
                sendNetworkLog(`Clicked on: Search List Item (${type})`, `Search List Item (${type})`, `Item: ${searchItem}`, versionId);
            }} justifyContent="space-between" alignItems="center" className={`${classes.row}`}>
                <Grid item xs={10} className={!type && (fullScreen ? classes.px1 : classes.px2)}>
                    <Typography color="textSecondary" variant={'body1'}>
                        {searchItem}
                    </Typography>
                </Grid>
            </Grid>
        )
    };

    const renderSectionTitle = title => {
        return (
            <Grid item xs={12}>
                <Typography variant="h2" color="textSecondary" className={classes.sectionTitle}>{title}</Typography>
            </Grid>
        );
    };

    /* SPORTS */
    if (type == 'Sport') {
        const popularSportList = [
            {name: 'Badminton', icon: <BadmintonIcon fontSize='large' className={classes.mHalf} />},
            {name: 'Gym', icon: <FitnessCenterIcon fontSize='large' className={classes.mHalf} />},
            {name: 'Floorball', icon: <SportsHockeyIcon fontSize='large' className={classes.mHalf} />},
            {name: 'Rugby', icon: <SportsRugbyIcon fontSize='large' className={classes.mHalf} />},
            {name: 'Soccer', icon: <SportsSoccerIcon fontSize='large' className={classes.mHalf} />},
            {name: 'Swim', icon: <PoolIcon fontSize='large' className={classes.mHalf} />},
            {name: 'Tennis', icon: <SportsTennisIcon fontSize='large' className={classes.mHalf} />},
            {name: 'Volleyball', icon: <SportsVolleyballIcon fontSize='large' className={classes.mHalf} /> },
        ];

        const renderSportButton = item => {
            const { name, icon } = item;
            return (
                <Grid item xs={3} className={classes.py2}>
                    <AppIconButton name={name} icon={icon} onClick={() => {
                        search(name);
                        sendNetworkLog(`Clicked on: Search List Sport IconButton (${type})`, `Search List Sport IconButton (${type})`, `Item: ${name}`, versionId);
                    }} />
                </Grid>
            );
        };

        return (
            <Grid container justifyContent="flex-start" alignItems="center" className={fullScreen ? classes.px2 : classes.mt1mb8}>
                {!hasSearchValues && renderSectionTitle('Popular Sports')}
                {!hasSearchValues && popularSportList.map(renderSportButton)}
                {renderSectionTitle('All Sports')}
                {list && list.map(item => renderRow(item))}
            </Grid>
        );
    }

    /* LOCATION */
    if (type == 'Location') {
        const renderRowWithGrouping = item => {
            const { area, facilities } = item;
            return (
                <Grid item xs={12} className={classes.py2}>
                    {renderSectionTitle(area)}
                    {facilities && facilities.map(faci => renderRow(faci))}
                </Grid>
            );
        };

        return (
            <Grid container justifyContent="flex-start" alignItems="center" className={fullScreen ? classes.px2 : classes.mt1mb8}>
                {list && list.map(item => renderRowWithGrouping(item))}
            </Grid>
        );
    }

    /* GENERAL */
    return (
        <Grid container justifyContent="flex-start" alignItems="center" className={fullScreen ? classes.px2 : classes.mt1mb8}>
            {list && list.map(
                (item) => <SearchItemNew name={item} onClick={() => {
                    search(item);
                    sendNetworkLog('Clicked on: Search List Item (General)', 'Search List Item (General)', `Item: ${item}`, versionId);
                }}/>
            )}
        </Grid>
    );
}

export default SearchListNewVer;
