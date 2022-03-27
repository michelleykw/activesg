import React, {useEffect, useState} from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import data from './data/data.json';
import moment from 'moment';

import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import swimming from '../static/swimming.jpg';

const useStyles = makeStyles(theme => ({
    fullScreenHeight: {
        minHeight: 'calc(100vh - 56px)'
    }
}));

function FacilityViewPage() {
    const classes = useStyles();
    const location = useLocation();

    const [facility, setFacility] = useState('');
    const [sport, setSport] = useState('');
    const [availability, setAvailability] = useState([]);
    const [selectedDate, setSelectedDate] = useState('14 April');
    const [timeSlots, setTimeSlot] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [showDrawer, setShowDrawer] = useState(false);

    const getQuery = () => {
        const newQuery = new URLSearchParams(location.search).get('location');
        setFacility(newQuery);
        console.log(facility);
    }

    const getAvailability = (data) => {
        const currFacilityInfo = data.filter(data => data.name === facility);
        if (currFacilityInfo[0]) {
            setSport(currFacilityInfo[0]['sport']);
            setAvailability(currFacilityInfo[0]['availability']);
        }
    }

    useEffect(() => {
        getQuery();
    }, []);

    useEffect(() => {
        getAvailability(data);
    }, [facility]);

    const handleCalendarCardClick = (currDate) => {
        console.log('Click on Calendar Card: ' + currDate);
        setSelectedDate(currDate);
        setSelectedTime('');
    }

    const handleTimeSlotClick = (selectedTimeSlot) => {
        if (selectedTime === '') {
            setSelectedTime(selectedTimeSlot);
        } else {
            setSelectedTime('');
        }

    }

    useEffect(() => {
        let t = availability.filter(avail => avail['date'] === selectedDate);
        if (t.length > 0) {
            t = t[0]['time'];
        }
        setTimeSlot(t);
    }, [selectedDate])

    useEffect(() => {
        console.log(selectedTime != '');
        setShowDrawer(selectedTime != '');
    }, [selectedTime])

    const HeaderSection = () => {
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

    const ScrollCalendarCard = ({date}) => {

        const currDate = date;
        const day = new Date(date + ' 2022').toLocaleString('en-us', {weekday:'short'})

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

    const ScrollCalendar = ({dates}) => {
        return (
            <>
                <Grid container direction="column" sx={{ml: 2}}>
                    <Box>
                        <Typography variant="h6">April 2022</Typography>
                    </Box>
                    <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start">
                        <ScrollCalendarCard date={'14 April'} />
                        {dates.map(item => <ScrollCalendarCard date={item.date} />)}
                    </Grid>
                </Grid>
            </>
        )
    }

    const TimeSlotCards = ({dataArr}) => {
        const time = moment(Object.keys(dataArr), 'hh:mm a').format('hh:mm a');
        const availability = Object.values(dataArr);
        return (
            <>
                <Card sx={{padding: '12px', justifyContent: 'center'}} style={{ boxShadow: "none" }}>
                    <Box sx={{
                        borderColor: 'error.main',
                        borderRadius: 2, m: '5px',
                        padding: '8px',
                        backgroundColor: selectedTime === time ? 'error.main' : 'white',
                        color: selectedTime === time ? 'white' : 'black',}} border={1}>
                        <CardActionArea onClick={() => handleTimeSlotClick(time)}>
                            <CardContent sx={{padding: '0', justifyItems:'center'}}>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Typography>{time}</Typography>
                                    <Typography variant='caption'>{availability} left</Typography>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Box>
                </Card>
            </>
        )
    }

    const TimeSlots = ({timeSlots}) => {
        return (
            <>
                <Grid container direction="column" sx={{ml: 2}} minHeight='50vh'>
                    <Box>
                        <Typography>Slot</Typography>
                    </Box>
                    <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start">
                        {timeSlots.length > 0 &&
                            timeSlots.filter(item => Object.values(item) > 0).map(item => <TimeSlotCards dataArr={item}/>)}
                        {timeSlots.length === 0 && <Typography>There are no slots available.</Typography>}
                    </Grid>
                </Grid>
            </>
        );
    }

    const DoneDrawer = ({shouldOpen}) => {
        console.log(shouldOpen);
        return (
            <>
                <Drawer elevation='10vh' variant='permanent' anchor='bottom'>
                    <Button variant="contained">Done</Button>
                </Drawer>
            </>
        );
    }

    return (
        <>
            <Grid container justifyContent="flex-start" alignItems="flex-start" className={classes.fullScreenHeight} columnSpacing={0}>
                <Grid item xs={12}>
                    <Box
                        component="img"
                        sx={{width: 1, maxHeight: '150px'}}
                        src={swimming} />
                </Grid>
                <Grid item xs={12}>
                    <HeaderSection />
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" sx={{width: 0.9}}/>
                </Grid>

                <Grid item xs={12}>
                    <ScrollCalendar dates={availability} />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ flexGrow: 1 }}>
                        <TimeSlots timeSlots={timeSlots} />
                    </Box>
                </Grid>
            </Grid>
            {showDrawer && <DoneDrawer/>}
        </>
    );
}

export default FacilityViewPage;