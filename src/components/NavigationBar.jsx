import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { pages } from '../resources/constants';
import { Typography } from '@mui/material';
import { sendNetworkLog } from '../logging/logging.js';

const useStyles = makeStyles(theme => ({
    navigation: {
        minWidth: '5rem !important'
    }
}));

function NavigationBar() {
    const classes = useStyles();
    const location = useLocation();
    let navigate = useNavigate();
    const versionId = new URLSearchParams(location.search).get('version') || 1;

    const pathnameIds = {
        'facilities': 0,
        'programmes': 1,
        'home': 2,
        'buypass': 3,
        'gameon': 4,
        '': 2,
        undefined: 2
    };

    const currPage = location.pathname.split('/')[2];
    const [value, setValue] = useState(pathnameIds[currPage]);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={2}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    const { href } = pages[newValue];
                    sendNetworkLog(`Clicked on: Navigation Bar - ${href}`, `Navigation Bar - ${href}`, `Navigate from ${currPage} to ${href}`, versionId);
                    setValue(newValue);
                    navigate(`/activesg${href}?version=${versionId}`);
                }}
                sx={{paddingX: 2}}
            >
                {
                    pages.map(page => {
                        return (
                            <BottomNavigationAction
                                label={<Typography variant='caption' sx={{fontSize: 11}}>{page.label}</Typography>}
                                icon={page.icon}
                                className={classes.navigation}
                            />
                        );
                    })
                }
            </BottomNavigation>
        </Paper>
    );
}

export default NavigationBar;