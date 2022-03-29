import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function HeaderSectionOld ({facility, sport}) {
    return (
        <>
            <Grid container alignItems="flex-start">
                <Box sx={{ml:1, mb: 2, width: 1}}>
                    <Typography variant="h3">{facility} </Typography>
                </Box>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box sx={{ml:2}} >
                        <Typography variant="caption">{sport} </Typography>
                    </Box>
                    <Box>
                        <LocationOnIcon />
                    </Box>
                    <Box sx={{mr: 2, alignContent: 'stretch' }} >
                        <Typography variant="caption" sx={{mb:1}}>More </Typography>
                        <KeyboardArrowDownIcon />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default HeaderSectionOld;