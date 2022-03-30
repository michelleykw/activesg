import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function HeaderSectionNew ({area, facility, sport}) {
    return (
        <>
            <Grid container alignItems="flex-start">
                <Box sx={{ml:2, mb: 2, width: 1}}>
                    <Typography variant="h3">{area} • {facility} </Typography>
                </Box>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box sx={{ml:2}} >
                        <Typography variant="caption" color="white" sx={{padding: '4px', bgcolor: 'text.disabled', borderRadius: 2}}>
                            {sport}
                        </Typography>
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

export default HeaderSectionNew;