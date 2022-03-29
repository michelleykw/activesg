import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ScrollCalendarCardOld from '../components/CalendarCardOld';
import ScrollCalendarCardNew from '../components/CalendarCardNew';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import swimming from '../static/swimming.jpg';

function YouMayAlsoLike({data, currFacilityName, useOldResult, selectedDate, setSelectedDate, setSelectedTime, dates}) {

    const [randomFac, setRandomFac] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const versionId = new URLSearchParams(location.search).get('version') || 1;

    useEffect(() => {
        if (data.length > 0) {
            const removeCurr = data.filter(data => data.name != currFacilityName);
            const newRandFac = []
            const rand1 = removeCurr[Math.floor(Math.random() * removeCurr.length)];
            newRandFac.push(rand1);
            const rand2 = removeCurr[Math.floor(Math.random() * removeCurr.length)];
            newRandFac.push(rand2);
            setRandomFac(newRandFac);
        }
    }, [data])

    const goToFacilityViewPage = loc => {
        navigate(`/facilities/view?version=${versionId}&location=${loc}`);
    };

    const renderCard = data => {
        return (
            <Card sx={{ maxWidth: 192, m:1}}>
                <CardActionArea onClick={() => goToFacilityViewPage(data.name)}>
                    <CardMedia
                        component="img"
                        height="90"
                        src = {swimming}
                        alt={data.sport}
                    />
                    <CardContent>
                    <Typography variant="caption" color="text.secondary">
                        {data.sport}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        0.0km
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }

    return (
        <Grid container direction="column" sx={{ml: 2}}>
            <Box sx={{mt: 1}}>
                {!useOldResult && (
                    <Typography inline align="left" gutterBottom variant="h6" sx={{fontWeight: 600}}>
                        You may also like this
                    </Typography>
                )}
            </Box>

            <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start" maxHeight='90px'>
                {randomFac.length > 0 && (randomFac.map(item => renderCard(item)))}
            </Grid>
        </Grid>
    )
}

export default YouMayAlsoLike;