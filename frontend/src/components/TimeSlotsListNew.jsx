import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TimeSlotCards from './TimeSlotCard';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

function TimeSlotsNew ({timeSlots, selectedTime, setSelectedTime}){

    const timePeriods = ['Morning', 'Afternoon', 'Evening'];
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('Morning');

    const clickTimePeriod = (timePeriod) => {
        setSelectedTimePeriod(timePeriod);
        console.log(selectedTimePeriod);
    }

    return (
        <>
            <Grid container direction="column" sx={{ml: 2}} minHeight='50vh'>
                <Box sx={{mt: 1}}>
                    <Typography inline align="left" gutterBottom variant="h6" sx={{fontWeight: 600}}>
                        Select a time
                    </Typography>
                </Box>

                <Grid container direction="row">
                    {timePeriods.map(item => (
                        <Grid item xs={2.5} sx={{
                            borderRadius: 3,
                            padding: '4px',
                            mr: 1,
                            backgroundColor: item === selectedTimePeriod ? 'error.main' : '#ECECEC',
                            color: item === selectedTimePeriod ? 'white' : 'black',}} border={0}>
                            <CardActionArea onClick={() => clickTimePeriod(item)}>
                                <CardContent sx={{padding: '0', justifyItems:'center'}}>
                                    <Grid container direction="column" justify="center" alignItems="center">
                                        <Typography variant="caption">{item}</Typography>
                                    </Grid>
                                </CardContent>
                            </CardActionArea>
                        </Grid>
                    ))}
                </Grid>

                <Grid container direction="row"  justifyContent="space-between" alignItems="center" sx={{maxWidth: '90%'}}>
                    {timeSlots.length > 0 &&
                        timeSlots.filter(item => Object.values(item) > 0).map(item => <TimeSlotCards dataArr={item} selectedTime={selectedTime} setSelectedTime={setSelectedTime}/>)}
                    {timeSlots.length === 0 && <Typography>There are no slots available.</Typography>}
                </Grid>
            </Grid>
        </>
    );
}

export default TimeSlotsNew;