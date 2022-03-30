import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TimeSlotCards from './TimeSlotCard';

function TimeSlotsOld ({timeSlots, selectedTime, setSelectedTime}){
    return (
        <>
            <Grid container direction="column" sx={{ml: 2}} minHeight='50vh'>
                <Box sx={{mt: 1}}>
                    <Typography inline align="left" gutterBottom variant="h6" sx={{fontWeight: 600}}>
                        Select a time
                    </Typography>
                </Box>
                <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start">
                    {timeSlots.length > 0 &&
                        timeSlots.filter(item => Object.values(item) > 0).map(item => <TimeSlotCards dataArr={item} selectedTime={selectedTime} setSelectedTime={setSelectedTime}/>)}
                    {timeSlots.length === 0 && <Typography>There are no slots available.</Typography>}
                </Grid>
            </Grid>
        </>
    );
}

export default TimeSlotsOld;