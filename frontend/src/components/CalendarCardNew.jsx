import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';


function ScrollCalendarCardNew ({date, selectedDate, setSelectedDate, setSelectedTime}) {

    const currDate = date;
    const day = new Date(date + ' 2022').toLocaleString('en-us', {weekday:'short'})

    const handleCalendarCardClick = (currDate) => {
        console.log('Click on Calendar Card: ' + currDate);
        if (selectedDate === currDate) {
            setSelectedDate('');
        } else {
            setSelectedDate(currDate);
        }
        setSelectedTime('');
    }

    return (
        <>
            <Card
                sx={{justifyContent: 'center', minWidth: '60px', m: '5px'}}
                style={{ border: "none", boxShadow: "none", backgroundColor: (currDate === selectedDate) ? '#CA1E1E': '#FFFFFF'}}>
                <CardActionArea onClick={() => handleCalendarCardClick(currDate)}>
                    <CardContent sx={{padding: '0'}}>
                        <Grid direction="column" container justify="center" alignItems="center" sx={{color: (currDate === selectedDate) ? '#FFFFFF': 'text.primary', flexShrink: 1}}>
                            <Typography variant="h6" gutterBottom> {currDate.split(' ')[0]}</Typography>
                            <Typography gutterBottom>{day}</Typography>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}

export default ScrollCalendarCardNew;