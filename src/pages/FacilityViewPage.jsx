import React, {useEffect, useState} from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import data from './data/data.json';
import { sendNetworkLog } from '../logging/logging.js';

import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import swimming from '../static/swimming.jpg';
import HeaderSectionOld from '../components/FacilitiesViewHeaderOld';
import HeaderSectionNew from '../components/FacilitiesViewHeaderNew';
import ScrollCalendar from '../components/ScrollCalendar';
import TimeSlotsOld from '../components/TimeSlotsListOld';
import TimeSlotsNew from '../components/TimeSlotsListNew';
import YouMayAlsoLike from '../components/YouMayAlsoLike';

const useStyles = makeStyles(theme => ({
    fullScreenHeight: {
        minHeight: 'calc(100vh - 56px)'
    }
}));

function FacilityViewPage() {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();

    const [facility, setFacility] = useState('');
    const [sport, setSport] = useState('');
    const [area, setArea] = useState('');
    const [availability, setAvailability] = useState([]);
    const [selectedDate, setSelectedDate] = useState('14 April');
    const [timeSlots, setTimeSlot] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [showDrawer, setShowDrawer] = useState(false);

    const versionId = new URLSearchParams(location.search).get('version') || 1;
    const useOldResult = (versionId == 2) || (versionId == 4);

    const getQuery = () => {
        const newQuery = new URLSearchParams(location.search).get('location');
        setFacility(newQuery);
        console.log(facility);
    }

    const getAvailability = (data) => {
        const currFacilityInfo = data.filter(data => data.name === facility);
        if (currFacilityInfo[0]) {
            setArea(currFacilityInfo[0]['area']);
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

    useEffect(() => {
        let t = availability.filter(avail => avail['date'] === selectedDate);
        if (t.length > 0) {
            t = t[0]['time'];
        }
        setTimeSlot(t);
    }, [selectedDate])

    useEffect(() => {
        setShowDrawer(selectedTime != '');
    }, [selectedTime])

    const DoneDrawer = () => {

        const handleClick = () => {
            sendNetworkLog('Clicked on: Done', 'Done Button',
            'Selected Date: ' + selectedDate + '; ' + 'Selected Time: ' + selectedTime, versionId);
            navigate(`/activesg/complete?version=${versionId}`);
            localStorage.removeItem('recentSearchList');
        }

        return (
            <>
                <Drawer elevation='10vh' variant='permanent' anchor='bottom'>
                    <Button variant="contained" onClick={() => handleClick()}>Done</Button>
                </Drawer>
            </>
        );
    };

    return (
        <>
            <Grid container justifyContent="flex-start" alignItems="flex-start" className={classes.fullScreenHeight} columnSpacing={0} sx={{mb:10}}>
                <Grid item xs={12}>
                    <Box
                        component="img"
                        sx={{width: 1, maxHeight: '150px'}}
                        src={swimming} />
                </Grid>

                <Grid item xs={12} sx={{my: 2}}>
                    {useOldResult && <HeaderSectionOld facility={facility} sport={sport}/>}
                    {!useOldResult && <HeaderSectionNew area={area} facility={facility} sport={sport} />}
                </Grid>

                <Grid item xs={12}>
                    <Divider variant="middle" sx={{width: 0.9}}/>
                </Grid>

                <Grid item xs={12} sx={{mb: 2}}>
                    <ScrollCalendar dates={availability} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime} />
                </Grid>

                {!useOldResult && (
                    <Grid item xs={12}>
                        <Divider variant="middle" sx={{width: 0.9}}/>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Box sx={{ flexGrow: 1 }}>
                        {useOldResult && <TimeSlotsOld timeSlots={timeSlots} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />}
                        {!useOldResult && <TimeSlotsNew timeSlots={timeSlots} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />}
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    {!useOldResult && (<YouMayAlsoLike data={data} currFacilityName={facility} useOldResult={useOldResult} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime} dates={availability} /> )}
                </Grid>
            </Grid>
            {showDrawer && <DoneDrawer/>}
        </>
    );
}

export default FacilityViewPage;