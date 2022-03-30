import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ScrollCalendarCardOld from '../components/CalendarCardOld';
import ScrollCalendarCardNew from '../components/CalendarCardNew';

function ScrollCalendar({dates, selectedDate, setSelectedDate, setSelectedTime}){

    const location = useLocation();
    const versionId = new URLSearchParams(location.search).get('version') || 1;
    const useOldResult = (versionId == 2) || (versionId == 4);

    return (
        <>
            <Grid container direction="column" sx={{ml: 2}}>
                <Box sx={{mt: 1}}>
                    {useOldResult && <Typography variant="h6">April 2022</Typography>}
                    {!useOldResult && (
                        <Grid container sx={{mb: 0, mt: 1, justifyContent: 'space-between'}} >
                            <Typography inline align="left" gutterBottom variant="h6" sx={{fontWeight: 600}}>
                                Select a date
                            </Typography>
                            <Typography inline gutterBottom variant="caption" align="right" sx={{mr: 5}}>
                                April 2022
                            </Typography>
                        </Grid>
                    )}
                </Box>

                <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start" maxHeight='90px'>
                    {useOldResult &&  (
                        <>
                        <ScrollCalendarCardOld date={'14 April'} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime}/>
                        {dates.map(item => <ScrollCalendarCardOld date={item.date} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime} />)}
                        </>
                    )}

                    {!useOldResult &&  (
                        <>
                        <ScrollCalendarCardNew date={'14 April'} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime}/>
                        {dates.map(item => <ScrollCalendarCardNew date={item.date} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime} />)}
                        </>
                    )}

                </Grid>
            </Grid>
        </>
    )
}

export default ScrollCalendar;