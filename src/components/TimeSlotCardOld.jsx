import React, {useEffect, useState} from 'react';
import moment from 'moment';
import { sendNetworkLog } from '../logging/logging.js';
import { useNavigate, useLocation } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

function TimeSlotCards ({dataArr, selectedTime, setSelectedTime}) {
    const time = moment(Object.keys(dataArr), 'hh:mm a').format('hh:mm a');
    const availability = Object.values(dataArr);

    const location = useLocation();
    const versionId = new URLSearchParams(location.search).get('version') || 1;

    const handleTimeSlotClick = (selectedTimeSlot) => {
        sendNetworkLog('Clicked on: ' + selectedTimeSlot, selectedTimeSlot + ' card', '', versionId);
        if (selectedTime === '' || selectedTime != time) {
            setSelectedTime(selectedTimeSlot);
        } else {
            setSelectedTime('');
        }
    }

    return (
        <>
            <Card sx={{padding: '7px', justifyContent: 'center'}} style={{ boxShadow: "none" }}>
                <Box sx={{
                    borderColor: 'error.main',
                    borderRadius: 2,
                    padding: '8px',
                    width: '26vw',
                    backgroundColor: selectedTime === time ? 'error.main' : 'white',
                    color: selectedTime === time ? 'white' : 'black',}} border={1}>
                    <CardActionArea onClick={() => handleTimeSlotClick(time)}>
                        <CardContent sx={{padding: '0', justifyItems:'center'}}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Typography variant='caption'>{time}</Typography>
                                <Typography variant='caption'>{availability} left</Typography>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Box>
            </Card>
        </>
    )
}

export default TimeSlotCards;