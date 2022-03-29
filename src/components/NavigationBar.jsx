import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { pages } from '../resources/constants';
import { Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
    navigation: {
        minWidth: '5.5rem !important'
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
        '': 2
    };

    const currPage = location.pathname.split('/')[2];
    const [value, setValue] = useState(pathnameIds[currPage]);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={2}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    navigate(`/activesg${pages[newValue].href}?version=${versionId}`);
                }}
            >
                {
                    pages.map(page => {
                        return (
                            <BottomNavigationAction 
                                label={<Typography variant='caption'>{page.label}</Typography>} 
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