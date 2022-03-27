import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';


function ScrollCalendarCardOld ({date, selectedDate, setSelectedDate, setSelectedTime}) {

    const currDate = date;
    const day = new Date(date + ' 2022').toLocaleString('en-us', {weekday:'short'})

    const handleCalendarCardClick = (currDate) => {
        console.log('Click on Calendar Card: ' + currDate);
        setSelectedDate(currDate);
        setSelectedTime('');
    }

    return (
        <>
            <Card sx={{padding: '12px', justifyContent: 'center'}} style={{ border: "none", boxShadow: "none" }}>
                <CardActionArea onClick={() => handleCalendarCardClick(currDate)}>
                    <CardContent sx={{padding: '0'}}>
                        <Typography>{day}</Typography>
                        <Typography>{currDate.split(' ')[0]}</Typography>
                        {(currDate === selectedDate) ?
                            <Divider style={{ background: 'black' }} sx={{ borderBottomWidth: '5px', width: '100%'}}/>
                        : <Box sx={{ height: '5px', width: '100%'}}/>}
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}

export default ScrollCalendarCardOld;